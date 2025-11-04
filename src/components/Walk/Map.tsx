import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Geolocation from "@react-native-community/geolocation";
import { WebView, WebViewMessageEvent } from "react-native-webview";

interface MapProps {
  onMenuPress?: () => void;
  isWalkRecordVisible?: boolean;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface AlertMarker {
  id: string;
  latitude: number;
  longitude: number;
  type: "warning" | "danger" | "info";
  title?: string;
}

export const Map: React.FC<MapProps> = ({
  onMenuPress,
  isWalkRecordVisible = false,
}) => {
  const webViewRef = useRef<WebView>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [showRoute, setShowRoute] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const watchIdRef = useRef<number | null>(null);

  const alertMarkers: AlertMarker[] = [
    {
      id: "1",
      latitude: 37.5675,
      longitude: 126.975,
      type: "warning",
      title: "주의 필요",
    },
    {
      id: "2",
      latitude: 37.5685,
      longitude: 126.98,
      type: "warning",
      title: "주의 필요",
    },
    {
      id: "4",
      latitude: 37.5645,
      longitude: 126.982,
      type: "danger",
      title: "위험 지역",
    },
    {
      id: "5",
      latitude: 37.5635,
      longitude: 126.985,
      type: "info",
      title: "안전 지역",
    },
  ];

  useEffect(() => {
    requestLocationPermission();

    return () => {
      if (watchIdRef.current !== null) {
        Geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "위치 권한 요청",
            message: "지도 사용을 위해 위치 권한이 필요합니다.",
            buttonNeutral: "나중에",
            buttonNegative: "거부",
            buttonPositive: "허용",
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          startLocationTracking();
        } else {
          Alert.alert("권한 필요", "위치 권한이 필요합니다.");
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      startLocationTracking();
    }
  };

  const startLocationTracking = () => {
    getCurrentLocation();

    watchIdRef.current = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        if (isMapLoaded) {
          updateMapCenter(latitude, longitude);
        }
      },
      (error) => {
        console.log("Location watch error:", error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 5000,
        fastestInterval: 2000,
      },
    );
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        if (isMapLoaded) {
          initializeMap(latitude, longitude);
        }
      },
      (error) => {
        console.log("Location error:", error);
        Alert.alert("위치 오류", "현재 위치를 가져올 수 없습니다.");
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };

  const initializeMap = (lat: number, lng: number) => {
    const script = `
      if(window.map && !window.mapInitialized){
        var initialPos = new kakao.maps.LatLng(${lat}, ${lng});
        window.map.setCenter(initialPos);
        
        var markerImage = new kakao.maps.MarkerImage(
          'https://cdn-icons-png.flaticon.com/512/684/684908.png',
          new kakao.maps.Size(40, 40),
          { offset: new kakao.maps.Point(20, 20) }
        );
        
        window.currentMarker = new kakao.maps.Marker({
          position: initialPos,
          image: markerImage,
          zIndex: 100
        });
        window.currentMarker.setMap(window.map);
        window.mapInitialized = true;
      }
      true;
    `;
    webViewRef.current?.injectJavaScript(script);
  };

  const updateMapCenter = (lat: number, lng: number) => {
    const script = `
      if(window.map && window.currentMarker){
        var moveLatLon = new kakao.maps.LatLng(${lat}, ${lng});
        window.map.setCenter(moveLatLon);
        window.currentMarker.setPosition(moveLatLon);
      }
      true;
    `;
    webViewRef.current?.injectJavaScript(script);
  };

  const handleMenuPress = () => onMenuPress?.();

  const handleLocationPress = () => {
    if (currentLocation) {
      updateMapCenter(currentLocation.latitude, currentLocation.longitude);
    } else {
      getCurrentLocation();
    }
  };

  const handleMarkerPress = (markerId: string) => {
    const marker = alertMarkers.find((m) => m.id === markerId);
    if (!marker || !currentLocation) return;

    if (selectedMarker === markerId) {
      setShowRoute(false);
      setSelectedMarker(null);

      webViewRef.current?.injectJavaScript(`
        if(window.polyline){ window.polyline.setMap(null); }
        true;
      `);
    } else {
      setSelectedMarker(markerId);
      setShowRoute(true);

      webViewRef.current?.injectJavaScript(`
        if(window.polyline){ window.polyline.setMap(null); }

        var linePath = [
          new kakao.maps.LatLng(${currentLocation.latitude}, ${currentLocation.longitude}),
          new kakao.maps.LatLng(${marker.latitude}, ${marker.longitude})
        ];
        window.polyline = new kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 4,
          strokeColor: '#4285F4',
          strokeOpacity: 0.8,
          strokeStyle: 'solid'
        });
        window.polyline.setMap(window.map);
        true;
      `);
    }
  };

  const kakaoMapHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        html, body, #map { height: 100%; margin: 0; padding: 0; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=6a08ee0d9b74e458e946245d621198d4"></script>
      <script>
        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(37.5665, 126.978),
          level: 3
        };
        window.map = new kakao.maps.Map(container, options);
        window.mapInitialized = false;

        ${alertMarkers
          .map(
            (m) => `
            var marker${m.id} = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(${m.latitude}, ${m.longitude})
            });
            marker${m.id}.setMap(window.map);

            kakao.maps.event.addListener(marker${m.id}, "click", function(){
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: "markerClick",
                markerId: "${m.id}"
              }));
            });
          `,
          )
          .join("")}

        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: "mapLoaded"
        }));
      </script>
    </body>
    </html>
  `;

  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "markerClick") {
        handleMarkerPress(data.markerId);
      } else if (data.type === "mapLoaded") {
        setIsMapLoaded(true);
        if (currentLocation) {
          initializeMap(currentLocation.latitude, currentLocation.longitude);
        }
      }
    } catch {}
  };

  return (
    <View style={styles.mapContainer}>
      <WebView
        ref={webViewRef}
        source={{ html: kakaoMapHTML }}
        style={styles.map}
        onMessage={handleWebViewMessage}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
      />

      <LinearGradient
        colors={[
          "rgba(255, 255, 255, 0.9)",
          "rgba(255, 255, 255, 0.7)",
          "rgba(255, 255, 255, 0)",
        ]}
        style={styles.headerGradient}
      />

      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.backButton}>
          <Image
            source={require("../../assets/icons/Vector.png")}
            style={[styles.backButtonImage, { transform: [{ scaleX: -1 }] }]}
          />
        </TouchableOpacity>

        <Image
          source={require("../../assets/icons/logo.png")}
          style={styles.logoImage}
        />

        <TouchableOpacity style={styles.searchButton}>
          <Image
            source={require("../../assets/icons/search.png")}
            style={styles.searchButtonImage}
          />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.rightButtons,
          isWalkRecordVisible && styles.rightButtonsWithCard,
        ]}
      >
        <TouchableOpacity
          style={styles.locationButton}
          onPress={handleLocationPress}
        >
          <Image
            source={require("../../assets/icons/locate.png")}
            style={styles.locateImage}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
          <Text style={styles.menuButtonText}>☰</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: { flex: 1 },
  map: { flex: 1, width: "100%", height: "100%" },
  headerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 5,
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: 20,
    left: 10,
    right: 10,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonImage: { width: 11, height: 21 },
  logoImage: { width: 46, height: 23 },
  searchButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonImage: { width: 24, height: 24 },
  rightButtons: {
    position: "absolute",
    bottom: 130,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    zIndex: 10,
  },
  rightButtonsWithCard: { bottom: 10 },
  locationButton: {
    width: 51,
    height: 51,
    backgroundColor: "#FFF",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  locateImage: { width: 37, height: 37 },
  menuButton: {
    width: 51,
    height: 51,
    backgroundColor: "#FFF",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  menuButtonText: { fontSize: 18, color: "#333" },
});

export default Map;
