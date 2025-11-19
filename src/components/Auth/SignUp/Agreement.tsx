import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface AgreementProps {
  allTermsAgreed: boolean;
  setAllTermsAgreed: (agreed: boolean) => void;
  personalInfoCollection: boolean;
  setPersonalInfoCollection: (agreed: boolean) => void;
  locationInfo: boolean;
  setLocationInfo: (agreed: boolean) => void;
  aiAnalysis: boolean;
  setAiAnalysis: (agreed: boolean) => void;
}

const Agreement: React.FC<AgreementProps> = ({
  allTermsAgreed,
  setAllTermsAgreed,
  personalInfoCollection,
  setPersonalInfoCollection,
  locationInfo,
  setLocationInfo,
  aiAnalysis,
  setAiAnalysis,
}) => {
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const handleAllTermsToggle = () => {
    const newValue = !allTermsAgreed;
    setAllTermsAgreed(newValue);
    setPersonalInfoCollection(newValue);
    setLocationInfo(newValue);
    setAiAnalysis(newValue);
  };

  const toggleTermExpansion = (termType: string) => {
    setExpandedTerm(expandedTerm === termType ? null : termType);
  };

  const termDetails = {
    personalInfo:
      "본 서비스는 회원가입, 계정 관리, 서비스 제공 및 관련 법령에 따른 의무 이행을 위해 사용자의 개인정보를 수집합니다. 수집되는 개인정보 항목은 이메일 주소, 비밀번호, 위치 정보, 강아지 비문 사진입니다. 수집된 개인정보는 서비스 이용을 위한 필수적인 용도로만 사용되며, 사용자의 동의 없이 제3자에게 제공되지 않습니다. 개인정보 수집 및 이용 동의를 거부하실 수 있으나, 이 경우 서비스 이용에 제한이 있을 수 있습니다.",
    location:
      "본 서비스는 반려견 실종 알림 및 산책 기록 추적 등의 기능 제공을 위해 사용자의 위치 정보를 수집합니다. 실종된 반려견이 10km 내에서 발견된 경우 해당 위치 정보를 활용하여 실시간 알림을 제공하며, 반려견 실종 시 산책 기록을 기반으로 위치를 추적하여 알림을 발송합니다. 위치 정보는 서비스 제공 목적으로만 사용되며, 제3자에게 제공되지 않습니다. 위치 정보 수집 및 이용 동의를 거부하실 수 있으나, 이 경우 해당 기능을 이용하실 수 없습니다.",
    aiAnalysis:
      "본 서비스는 사용자가 제공한 강아지 비문 사진을 AI 분석을 통해 등록하고 비교하는 기능을 제공합니다. AI 분석 및 비문 비교는 실종된 반려견 추적을 위한 목적으로만 사용되며, 사진 데이터는 다른 용도로 사용되지 않습니다. 비문 사진을 AI 분석에 제공하는 것에 동의해야 해당 기능을 이용하실 수 있습니다. 사진 데이터 활용 동의를 거부하실 수 있으나, 이 경우 해당 기능을 이용하실 수 없습니다.",
  };

  return (
    <View style={styles.termsContainer}>
      {/* 전체 동의 */}
      <TouchableOpacity
        style={styles.allTermsContainer}
        onPress={handleAllTermsToggle}
      >
        <View style={styles.checkboxContainer}>
          <View style={[styles.checkbox, allTermsAgreed && styles.checkedBox]}>
            <Text style={[styles.checkmark]}>✓</Text>
          </View>
          <Text style={styles.allTermsText}>전체 이용 약관에 동의합니다</Text>
        </View>
      </TouchableOpacity>

      {/* 개별 약관들 */}
      <View style={styles.individualTerms}>
        <View style={styles.termContainer}>
          <TouchableOpacity
            style={styles.termItem}
            onPress={() => setPersonalInfoCollection(!personalInfoCollection)}
          >
            <View style={styles.termLeft}>
              <Text
                style={[
                  styles.smallCheckbox,
                  personalInfoCollection && styles.checkedSmallBox,
                ]}
              >
                ✓
              </Text>
              <Text style={styles.termText}>
                [필수] 개인정보 수집 및 이용 동의
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => toggleTermExpansion("personalInfo")}
              style={styles.arrowButton}
            >
              <Text
                style={[
                  styles.arrow,
                  expandedTerm === "personalInfo" && styles.arrowExpanded,
                ]}
              >
                ›
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
          {expandedTerm === "personalInfo" && (
            <View style={styles.detailContainer}>
              <Text style={styles.detailText}>{termDetails.personalInfo}</Text>
            </View>
          )}
        </View>

        <View style={styles.termContainer}>
          <TouchableOpacity
            style={styles.termItem}
            onPress={() => setLocationInfo(!locationInfo)}
          >
            <View style={styles.termLeft}>
              <Text
                style={[
                  styles.smallCheckbox,
                  locationInfo && styles.checkedSmallBox,
                ]}
              >
                ✓
              </Text>
              <Text style={styles.termText}>
                [필수] 위치정보 수집 및 이용 동의
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => toggleTermExpansion("location")}
              style={styles.arrowButton}
            >
              <Text
                style={[
                  styles.arrow,
                  expandedTerm === "location" && styles.arrowExpanded,
                ]}
              >
                ›
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
          {expandedTerm === "location" && (
            <View style={styles.detailContainer}>
              <Text style={styles.detailText}>{termDetails.location}</Text>
            </View>
          )}
        </View>

        <View style={styles.termContainer}>
          <TouchableOpacity
            style={styles.termItem}
            onPress={() => setAiAnalysis(!aiAnalysis)}
          >
            <View style={styles.termLeft}>
              <Text
                style={[
                  styles.smallCheckbox,
                  aiAnalysis && styles.checkedSmallBox,
                ]}
              >
                ✓
              </Text>
              <Text style={styles.termText}>
                [필수] AI 분석 및 사진 데이터 활용 동의
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => toggleTermExpansion("aiAnalysis")}
              style={styles.arrowButton}
            >
              <Text
                style={[
                  styles.arrow,
                  expandedTerm === "aiAnalysis" && styles.arrowExpanded,
                ]}
              >
                ›
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
          {expandedTerm === "aiAnalysis" && (
            <View style={styles.detailContainer}>
              <Text style={styles.detailText}>{termDetails.aiAnalysis}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  termsContainer: {
    marginBottom: 21,
  },
  allTermsContainer: {
    marginBottom: 17,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#CCCCCC",
    backgroundColor: "#CCCCCC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkedBox: {
    borderColor: "#4262FF",
    backgroundColor: "#4262FF",
  },
  checkmark: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  allTermsText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000000",
  },
  individualTerms: {
    paddingLeft: 10,
  },
  termContainer: {
    marginBottom: 0,
  },
  termItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  termLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  smallCheckbox: {
    width: 16,
    height: 16,
    fontSize: 12,
    fontWeight: "bold",
    color: "#CCCCCC",
    marginRight: 12,
    textAlign: "center",
  },
  checkedSmallBox: {
    color: "#4262FF",
  },
  termText: {
    fontSize: 13,
    color: "#686767",
    flex: 1,
  },
  arrowButton: {
    padding: 5,
  },
  arrow: {
    fontSize: 18,
    color: "#686767",
    marginLeft: 10,
    transform: [{ rotate: "0deg" }],
  },
  arrowExpanded: {
    color: "#686767",
    transform: [{ rotate: "90deg" }],
  },
  detailContainer: {
    marginTop: 8,
    marginLeft: 28,
    marginRight: 10,
    padding: 12,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
  },
  detailText: {
    fontSize: 12,
    color: "#000000",
    lineHeight: 18,
  },
});

export default Agreement;
