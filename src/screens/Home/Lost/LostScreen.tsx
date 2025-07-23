import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import Header from '../../../components/Header';
import { Colors } from "../../../constants/colors";
import icon_search from '../../../assets/icons/icon_search.png';
import icon_detail_page from '../../../assets/icons/icon_detail_page.png';
import happy1 from '../../../assets/images/happy1.png'



const DATA = [
  {
    id: '1',
    status: '실종',
    dateTime: '2025.03.01 11:25',
    location: '서울특별시 도봉구',
    breed: '견종 / 특징',
    image: happy1,
  },
  {
    id: '2',
    status: '발견',
    dateTime: '2025.03.01 11:25',
    location: '서울특별시 도봉구',
    breed: '견종 / 특징',
    image: happy1,
  },
  {
    id: '3',
    status: '실종',
    dateTime: '2025.03.01 11:25',
    location: '서울특별시 도봉구',
    breed: '견종 / 특징',
    image: happy1,
  },
];

const LostPetListScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("전체");

  // petcard
  const renderItem = ({ item }: { item: typeof DATA[0] }) => {
    const isLost = item.status === '실종';
    return (
      <View style={[styles.card, item.id === '1' && styles.selectedCard]}> {/* 첫 번째 항목만 선택 효과 */}
        <View style={[styles.badge, isLost ? styles.badgeLost : styles.badgeFound]}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
        <Image source={item.image} style={styles.image} />
        <View style={styles.cardInfo}>
          <Text style={styles.dateText}>{item.dateTime}</Text>
          <Text style={styles.locationText}>{item.location}</Text>
          <Text style={styles.breedText}>{item.breed}</Text>
        </View>
        <Image source={icon_detail_page} style={styles.arrowIcon} />
      </View>
    );
  };

  // 드롭아웃
  const [selectedPet, setSelectedPet] = useState<string>("쫑이");
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.tabWrapper}>
        {['전체', '실종동물', '발견동물'].map((label) => (
          <TouchableOpacity
            key={label}
            onPress={() => setActiveTab(label)}
            style={styles.tabItem}
          >
            <Text
              style={[styles.tabText, activeTab === label && styles.tabTextActive]}
            >
              {label}
            </Text>
            {activeTab === label && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder="지역 또는 견종으로 검색"
          placeholderTextColor="#999"
        />
        <TouchableOpacity>
          <Image source={icon_search} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />

      <View style={styles.floatingWrapper}>
        <TouchableOpacity style={styles.fab}>
          <Image source={icon_search} style={styles.fabIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fab}>
          <Text style={styles.fabPlus}>+</Text>
        </TouchableOpacity>
      </View>
    
    
    </View>

    

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabWrapper: {
    marginTop:5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabText: {
    fontSize: 18,
    color: '#aaa',
    fontWeight: 'bold',
    paddingBottom: 6,
  },
  tabTextActive: {
    color: '#1A1A1A',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: '80%',
    backgroundColor: '#222',
  },
  searchWrapper: {
    marginTop: 12,
    marginHorizontal: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: '#000',
    marginLeft: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    position: 'relative',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  badge: {
    position: 'absolute',
    top: -6,
    left: -6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    zIndex: 2,
  },
  badgeLost: {
    backgroundColor: '#FF4D4D',
  },
  badgeFound: {
    backgroundColor: '#3399FF',
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  locationText: {
    fontSize: 13,
    color: '#555',
  },
  breedText: {
    fontSize: 13,
    color: '#999',
  },
  arrowIcon: {
    width: 20,
    height: 20,
    tintColor: '#999',
    marginLeft: 8,
  },
    floatingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
  },

  fab: {
    backgroundColor: '#3366FF',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },

  fabIcon: {
    width: 28,
    height: 28,
    tintColor: '#fff',
  },

  fabPlus: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: -4,
  },

});




export default LostPetListScreen;
