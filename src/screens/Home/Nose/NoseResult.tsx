import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from '../../../components/Header';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const mockMatchedInfo = {
  date: '2025.03.01',
  time: '14:25',
  location: '서울시 도봉구',
  matchRate: '95%',
  dogNose: require('../../../assets/images/nose.png'),
  myNose: require('../../../assets/images/nose.png'),
};

const mockList = [
  { id: '1', match: '40%', image: require('../../../assets/images/nose.png') },
  { id: '2', match: '50%', image: require('../../../assets/images/nose.png') },
];

const NoseResultScreen = () => {
  const route = useRoute();
  const type = (route.params as any)?.type ?? 'found';

  const parsedMatch = parseInt(mockMatchedInfo.matchRate);
  const circleRadius = 70;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = (1 - parsedMatch / 100) * circumference;

  // 팝업
  const [showPopup, setShowPopup] = useState(false);
  const [foundLocation, setFoundLocation] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>
          실종된 내 반려동물과의{'\n'} <Text style={styles.highlight}>비문 인식률</Text>
        </Text>

        <View style={styles.comparisonRow}>
          <View style={styles.myNoseCardLarge}>
            <Image source={mockMatchedInfo.myNose} style={styles.noseImageLarge} />
            <Text style={styles.metaText}>
              {mockMatchedInfo.location}{'\n'}{mockMatchedInfo.date}{'\n'}{mockMatchedInfo.time}
            </Text>
          </View>

          <View style={styles.noseImageWrapperSmall}>
            <Svg width={160} height={160}>
              <Defs>
                <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <Stop offset="0%" stopColor="#a0c4ff" />
                  <Stop offset="100%" stopColor="#4361ee" />
                </LinearGradient>
              </Defs>
              <Circle
                cx={80}
                cy={80}
                r={circleRadius}
                strokeWidth={strokeWidth}
                fill="none"
              />
              <Circle
                cx={70}
                cy={70}
                r={circleRadius}
                stroke="url(#grad)"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                rotation="-90"
                origin="80,70"
              />
            </Svg>
            <Image source={mockMatchedInfo.dogNose} style={styles.noseImageSmall} />
            <View style={styles.matchBadgeBig}>
              <Text style={styles.matchBadgeText}>{mockMatchedInfo.matchRate}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionDivider} />
        <Text style={styles.listTitle}>등록된 실종(발견) 동물</Text>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={mockList}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => {
            const percent = parseInt(item.match);
            const radius = 64;
            const strokeDash = (1 - percent / 100) * 2 * Math.PI * radius;

            return (
              <View style={styles.listItem}>
                <View style={styles.noseItemWrapper}>
                  <Svg width={140} height={140}>
                    <Defs>
                      <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <Stop offset="0%" stopColor="#4361ee" />
                        <Stop offset="100%" stopColor="#a0c4ff" />
                      </LinearGradient>
                    </Defs>
                    <Circle
                      cx={70}
                      cy={70}
                      r={radius}
                      stroke="#e0e0e0"
                      strokeWidth={6}
                      fill="none"
                    />
                    <Circle
                      cx={70}
                      cy={70}
                      r={radius}
                      stroke="url(#grad)"
                      strokeWidth={6}
                      fill="none"
                      strokeDasharray={2 * Math.PI * radius}
                      strokeDashoffset={strokeDash}
                      strokeLinecap="round"
                      rotation="-90"
                      origin="70,70"
                    />
                  </Svg>
                  <Image source={item.image} style={styles.listImage} />
                  <View style={styles.overlayCircle}>
                    <Text style={styles.overlayText}>{item.match}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </ScrollView>

      {showPopup && (
      <View style={styles.popupOverlay}>
        <View style={styles.popupBox}>
          <TouchableOpacity onPress={() => setShowPopup(false)} style={styles.popupClose}>
            <Text style={{ fontSize: 24 }}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.popupText}>
            비문 인식을 진행한 동물의 {'\n'}<Text style={{ color: '#5b6eff' }}>발견 장소</Text>를 입력해주세요.
          </Text>

          <TextInput
            style={styles.popupInput}
            placeholder="예: 서울시 도봉구"
            multiline
            value={foundLocation}
            onChangeText={setFoundLocation}
          />

          <TouchableOpacity style={styles.popupButton} onPress={() => {
            console.log('저장된 위치:', foundLocation);
            setShowPopup(false);
          }}>
            <Text style={styles.popupButtonText}>결과 저장하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    )}

      <TouchableOpacity style={styles.saveButton} onPress={() => setShowPopup(true)}>
        <Text style={styles.saveButtonText}>결과 저장하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  scroll: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 20,
  },
  highlight: {
    color: '#5b6eff',
    fontWeight: '700',
  },
  comparisonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 20,
  },
  myNoseCardLarge: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#eaf0ff',
    borderRadius: 20,
    width: 150,
  },
  noseImageLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  noseImageWrapperSmall: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 160,
  },
  noseImageSmall: {
    width: 130,
    height: 130,
    borderRadius: 65,
    position: 'absolute',
  },
  matchBadgeBig: {
    position: 'absolute',
    top: -5,
    right: 15,
    backgroundColor: '#4f75ff',
    width: 50,               
    height: 50,               
    borderRadius: 25,         
    alignItems: 'center',      
    justifyContent: 'center', 
    zIndex: 10,
    elevation: 3,
    borderWidth: 2, 
    borderColor: '#ffffff',
  },
  matchBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  metaText: {
    marginTop: 12,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    lineHeight: 20,
  },

  sectionDivider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 24,
    width: '100%',
  },



  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 12,
  },
  listContainer: {
    paddingHorizontal: 10,
    flexGrow: 1,
    marginBottom: 24,
  },
  listItem: {
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noseItemWrapper: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  listImage: {
    width: 115,
    height: 115,
    borderRadius: 100,
    position: 'absolute',
  },
  saveButton: {
    backgroundColor: '#3c4fff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    margin: 16,
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  overlayCircle: {
    position: 'absolute',
    width: 115,
    height: 115,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    alignItems: 'center',
    justifyContent: 'center',
  },

  overlayText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },

  //팝업
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  popupBox: {
    width: '85%',
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  popupClose: {
    position: 'absolute',
    top: 10,
    right: 14,
  },
  popupText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  popupInput: {
    width: '100%',
    minHeight: 80,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    fontSize: 14,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  popupButton: {
    backgroundColor: '#1e1e2f',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  popupButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },



});

export default NoseResultScreen;
