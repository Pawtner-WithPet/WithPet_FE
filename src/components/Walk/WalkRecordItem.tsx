import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Dimensions } from "react-native"; 
import { WalkRecord, Pet } from "../../types/index";
import { PetTag } from "./PetTag"; 

const { width } = Dimensions.get('window');

interface WalkRecordItemProps {
  record: WalkRecord & { isFavorite: boolean };
  textColor?: string;
  pets?: Pet[];
  onPress: (record: WalkRecord) => void;
  onPressView?: (record: WalkRecord) => void;
  onPressFavorite?: (record: WalkRecord) => void;
}

export const WalkRecordItem: React.FC<WalkRecordItemProps> = ({
  record,
  textColor = "#000",
  pets = [],
  onPress,
  onPressView,
  onPressFavorite,
}) => {
  const { date, time, speed, distance } = record;
  const [isItemFavorite, setIsItemFavorite] = useState(record.isFavorite);
  const [isModalVisible, setIsModalVisible] = useState(false); 

  useEffect(() => {
    setIsItemFavorite(record.isFavorite);
  }, [record.isFavorite]);

  const handleCardPress = () => {
    onPress(record);
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    setIsModalVisible(true); 
  };
  
  const handleConfirmFavorite = () => {
    const newState = !isItemFavorite; 
    setIsItemFavorite(newState); 
    setIsModalVisible(false); 
    if (onPressFavorite) onPressFavorite(record); 
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const FavoriteConfirmationModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
      >
        <TouchableOpacity 
            style={modalStyles.centeredView} 
            activeOpacity={1} 
            onPress={handleCloseModal} 
        >
        {/* 모달 본체 */}
        <View style={modalStyles.modalView} onStartShouldSetResponder={() => true}>
          
          <TouchableOpacity 
              style={modalStyles.closeButton} 
              onPress={handleCloseModal} 
          >
            <Text style={modalStyles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <View style={modalStyles.modalContent}>
              <Text style={modalStyles.modalQuestionText}>
                  해당 산책 기록을
              </Text>
              <Text style={[modalStyles.modalQuestionText]}>
                  익숙한 산책 경로로 지정하시겠습니까?
              </Text>
              <View style={modalStyles.descriptionWrapper}>
                  <Text style={modalStyles.modalDescriptionText}>
                      익숙한 산책 경로는 실종 시
                  </Text>
                  <Text style={modalStyles.modalDescriptionText}>
                      다른 사용자에게 공유되어
                  </Text>
                  <Text style={modalStyles.modalDescriptionText}>
                      탐색에 도움을 줍니다.
                  </Text>
              </View>
          </View>

          <TouchableOpacity 
              style={modalStyles.saveButton} 
              onPress={handleConfirmFavorite}
          >
            <Text style={modalStyles.saveButtonText}>저장하기</Text>
          </TouchableOpacity>
          
        </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={handleCardPress}
        activeOpacity={0.8}
      >
        {/* 1. 날짜 및 기록 */}
        <View style={styles.contentWrapper}>
          
          {/* 날짜 */}
          <View style={styles.header}>
            <Text style={[styles.dateText, { color: textColor }]}>{date}</Text>
          </View>

          {/* 시간 정보 */}
          <View style={styles.statsRow}>
            <Image
              source={require("../../assets/icons/time.png")}
              style={styles.icon}
            />
            <Text style={styles.timeText}>{time}</Text>
          </View>

          {/* 속도 및 거리 정보 */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Image
                source={require("../../assets/icons/speed.png")}
                style={styles.icon}
              />
              <Text style={styles.statValue}>{speed}</Text>
            </View>
            <View style={styles.statItem}>
              <Image
                source={require("../../assets/icons/map.png")}
                style={[styles.icon, styles.mapIcon]}
              />
              <Text style={styles.mapValue}>{distance}</Text>
            </View>
          </View>
        </View>

        {/* 2. 이름 태그 컨테이너 */}
        {pets.length > 0 && (
          <View style={styles.petTagsTopRightContainer}>
            {pets.map((pet) => (
              <PetTag key={pet.id} pet={pet} />
            ))}
          </View>
        )}

        {/* 3. 즐겨찾기 별  */}
        <TouchableOpacity
          style={styles.favoriteButtonContainer}
          onPress={handleFavoritePress} 
        >
          <Image
            source={
              isItemFavorite
                ? require("../../assets/icons/star_filled.png")
                : require("../../assets/icons/star_empty.png")
            }
            style={styles.starIcon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <FavoriteConfirmationModal />
    </>
  );
};

// 기존 스타일 정의
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    position: 'relative', 
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
    minHeight: 100,
  },
  contentWrapper: {
    flex: 1,
    paddingRight: 60,
  },
  header: {
    marginBottom: 5,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  petTagsTopRightContainer: {
    position: 'absolute',
    top: 15, 
    right: 15, 
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end', 
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 5,
    tintColor: '#8C8C8C',
  },
  mapIcon: {
    tintColor: '#4262FF',
  },
  timeText: {
    fontSize: 16,
    color: '#8C8C8C',
  },
  statValue: {
    fontSize: 16,
    color: '#8C8C8C',
    fontWeight: '500',
  },
  mapValue: {
    fontSize: 16,
    color: '#4262FF',
    fontWeight: '500',
  },
  favoriteButtonContainer: {
    position: 'absolute',
    right: 15, 
    bottom: 15, 
    padding: 5,
  },
  starIcon: {
    width: 35,
    height: 35,
  },
});

// 팝업 전용 스타일
const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        paddingTop: 40, 
        paddingBottom: 20,
        paddingHorizontal: 20, 
        alignItems: 'flex-start', 
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: width * 0.85, 
        minHeight: width * 0.5, 
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 15, 
        padding: 5,
        zIndex: 10,
    },
    closeButtonText: {
        fontSize: 24,
        fontWeight: '300',
        color: '#000',
    },
    modalContent: {
        alignItems: 'flex-start', 
        marginBottom: 80,
        padding:15,
        width: '100%',
    },
    modalQuestionText: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'left', 
        lineHeight: 25,
    },
    descriptionWrapper: {
        marginTop: 20,
    },
    modalDescriptionText: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'left',
        lineHeight: 20,
    },
    saveButton: {
        position: 'absolute',
        bottom: 20, 
        right: 20,
        backgroundColor: '#374151', 
        borderRadius: 10,
        paddingVertical: 10, 
        width: 'auto', 
        minWidth: 100,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 3,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 15,
    },
});