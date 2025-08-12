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
import { useNavigation } from '@react-navigation/native';
import LostPostDetail from "./LostPostDetail";


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
  const [isExpanded, setIsExpanded] = useState(false); // 등록

  const [selectedPet, setSelectedPet] = useState(); //탐색
  const [isPetToggleVisible, setPetToggleVisible] = useState(false); //탐색
  const [isDropdownVisible, setDropdownVisible] = useState(false); //탐색

  const filteredData = activeTab === '전체' ? DATA : DATA.filter(item => item.status === (activeTab === '실종동물' ? '실종' : '발견'));

  const navigation = useNavigation<any>();


  // petcard
  const renderItem = ({ item }: { item: typeof DATA[0] }) => {
    const isLost = item.status === '실종';

    const post = {
      id: item.id,
      status: item.status as "실종" | "발견",
      name: "포포",
      age: "1살",
      breed: "포메라니안",
      height: "미측정",
      weight: "미측정",
      location: "서울 강북구 수유역 부근",
      lostDateTime: "2025.03.01 오후 3시경",
      feature: "겁이 많은 편이에요.\n이름을 부르면 알아들어요.",
      extra: "사례금 100만원\n찾으시면 채팅보다는 연락처로 전화주세요.",
      image: item.image ?? happy1,
    };
    return (
      <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => navigation.navigate("LostPostDetail", { post })}
      style={styles.card}
    >
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
    </TouchableOpacity>
    );
  };


  

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
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>등록된 정보가 없습니다.</Text>}
        contentContainerStyle={{ padding: 16 }}
      />

      <View style={styles.floatingWrapper}>
        {isPetToggleVisible && (
          <View style={styles.petDropdownWrapper}>
            <TouchableOpacity
              style={styles.petToggleBtn}
              onPress={() => setDropdownVisible(prev => !prev)}
            >
              <Text style={styles.petToggleText}>
                탐색할 반려견   ▲
              </Text>
            </TouchableOpacity>

            {isDropdownVisible && (
              <View style={styles.dropdown}>
                {["쫑이", "하양이"].map((pet) => (
                  <TouchableOpacity
                    key={pet}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setDropdownVisible(false);
                    }}
                  >
                    <Text style={styles.dropdownText}>{pet}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
        <TouchableOpacity style={styles.fab} onPress={() => setPetToggleVisible(prev => !prev)}>
          <Image source={icon_search} style={styles.fabIcon} />
        </TouchableOpacity>

        
        {isExpanded && (
          <View style={styles.dropdownButtons}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#F64C4C' }]} onPress={() => navigation.navigate("LostPetRegister")}>
              <Text style={styles.actionButtonText}>실종동물 등록</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#4262FF' }]} onPress={() => navigation.navigate("FoundPetRegister")}>
              <Text style={styles.actionButtonText}>발견동물 등록</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.fab} onPress={() => setIsExpanded(prev => !prev)}>
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
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
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
  badge: {
    position: 'absolute',
    top: -6,
    left: -6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeLost: {
    backgroundColor: '#F64C4C',
    width: 60,
    height: 30,
    top: 5,
    left: 10,
  },
  badgeFound: {
    width: 60,
    height: 30,
    top: 5,
    left: 10,
    backgroundColor: '#0086FF',
  },
  badgeText: {
    color: '#fff',
    fontSize: 18,
     
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 100,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  locationText: {
    fontSize: 17,
    color: '#999',
  },
  breedText: {
    fontSize: 17,
    color: '#999',
  },
  arrowIcon: {
    width: 40,
    height: 40,
    tintColor: '#000',
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
    width: 40,
    height: 40,
    tintColor: '#fff',
  },

  fabPlus: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: -4,
  },

  dropdownButtons: {
    position: 'absolute',
    bottom: 80,
    right: 0,
    alignItems: 'flex-end',
  },

  petDropdownWrapper: {
    position: 'absolute',
    bottom: 80, 
    right: 230,  
    alignItems: 'flex-end',
    zIndex: 10, 
  },
  petToggleBtn: {
    backgroundColor: '#3366FF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    left:10,
  },
  petToggleText: {
    color: '#fff',
    fontSize:18,
    fontWeight: 'bold',
  },
  dropdown: {
    position: 'absolute',
    bottom: 44, 
    right: -8,
    backgroundColor: '#A5BFFF',
    borderRadius: 10,
    overflow: 'hidden',
    zIndex: 20,
    minWidth: 150,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize:18,
  },


  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 1,
  },

  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },

});




export default LostPetListScreen;
