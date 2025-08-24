import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";

const SystemInfoBox: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.infoBox}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.infoText}>국가동물보호정보시스템이란?</Text>
        <Text style={styles.arrow}></Text>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.title}>국가동물보호정보시스템</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.contentScrollView}>
              <Text style={styles.description}>
                국가동물보호정보시스템은 반려동물의 등록과 관리를 위한 국가
                차원의 통합 정보시스템입니다.
                {"\n\n"}
                <Text style={styles.subTitle}>주요 기능:</Text>
                {"\n"}• 반려동물 등록 및 정보 관리
                {"\n"}• 동물등록증 발급
                {"\n"}• 실종신고 및 찾기 서비스
                {"\n"}• 소유자 변경 신고
                {"\n"}• 사망신고 처리
                {"\n\n"}
                <Text style={styles.subTitle}>등록 대상:</Text>
                {"\n"}• 생후 2개월 이상 또는 체중 2kg 이상의 개{"\n"}• 관할
                시·군·구청 또는 읍·면·동 주민센터에서 등록
                {"\n\n"}
                <Text style={styles.subTitle}>등록 혜택:</Text>
                {"\n"}• 실종 시 빠른 찾기 서비스
                {"\n"}• 소유권 증명
                {"\n"}• 각종 반려동물 관련 서비스 이용 가능
                {"\n\n"}
                등록되지 않은 반려동물은 본 서비스를 이용하실 수 없습니다.
              </Text>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F9FA",
    borderWidth: 2,
    borderColor: "#4A90E2",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  infoText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "bold",
    flex: 1,
  },
  arrow: {
    fontSize: 16,
    color: "#4A90E2",
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    margin: 20,
    maxHeight: "80%",
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    flex: 1,
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 18,
    color: "#666666",
    fontWeight: "bold",
  },
  contentScrollView: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    maxHeight: 400,
  },
  description: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 22,
  },
  subTitle: {
    fontWeight: "bold",
    color: "#4A90E2",
    fontSize: 15,
  },
});

export default SystemInfoBox;
