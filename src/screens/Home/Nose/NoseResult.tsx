import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from "../../../components/Header";

const mockMatchedInfo = {
  date: '2025.03.01',
  time: '14:25',
  location: '서울시 도봉구',
  matchRate: '99%',
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

  const titleText =
    type === 'found' ? '실종된 내 반려동물과의 비문 인식률' : '촬영한 발견동물과의 비문 인식률';
  const listTitleText =
    type === 'found' ? '등록된 실종동물 일치율 목록' : '등록된 발견동물 일치율 목록';

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>{titleText}</Text>

        <View style={styles.imageRow}>
          <View style={styles.myNoseCard}>
            <Image source={mockMatchedInfo.myNose} style={styles.noseImage} />
            <Text style={styles.metaText}>{mockMatchedInfo.date}{'\n'}{mockMatchedInfo.time}{'\n'}{mockMatchedInfo.location}</Text>
          </View>
          <View style={styles.noseImageWrapper}>
            <Image source={mockMatchedInfo.dogNose} style={styles.noseImage} />
            <View style={styles.matchOverlay}>
              <Text style={styles.matchText}>{mockMatchedInfo.matchRate}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.listTitle}>{listTitleText}</Text>

        <FlatList
          horizontal
          data={mockList}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Image source={item.image} style={styles.listImage} />
              <View style={styles.matchRateOverlay}>
                <Text style={styles.matchRateText}>{item.match}</Text>
              </View>
            </View>
          )}
        />
      </ScrollView>
      <TouchableOpacity style={styles.saveButton}>
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
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 20,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  myNoseCard: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
  },
  noseImageWrapper: {
    position: 'relative',
  },
  noseImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  matchOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  matchText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  metaText: {
    marginTop: 12,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    lineHeight: 20,
  },
  divider: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 12,
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 24,
    flexGrow: 1,
  },
  listItem: {
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  matchRateOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchRateText: {
    color: 'white',
    fontWeight: 'bold',
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
});

export default NoseResultScreen;
