import React from "react";
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
  const handleAllTermsToggle = () => {
    const newValue = !allTermsAgreed;
    setAllTermsAgreed(newValue);
    setPersonalInfoCollection(newValue);
    setLocationInfo(newValue);
    setAiAnalysis(newValue);
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
            {allTermsAgreed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.allTermsText}>전체 이용 약관에 동의합니다</Text>
        </View>
      </TouchableOpacity>

      {/* 개별 약관들 */}
      <View style={styles.individualTerms}>
        <TouchableOpacity
          style={styles.termItem}
          onPress={() => setPersonalInfoCollection(!personalInfoCollection)}
        >
          <View style={styles.termLeft}>
            <View
              style={[
                styles.smallCheckbox,
                personalInfoCollection && styles.checkedSmallBox,
              ]}
            >
              {personalInfoCollection && (
                <Text style={styles.smallCheckmark}>✓</Text>
              )}
            </View>
            <Text style={styles.termText}>
              [필수] 개인정보 수집 및 이용 동의
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.termItem}
          onPress={() => setLocationInfo(!locationInfo)}
        >
          <View style={styles.termLeft}>
            <View
              style={[
                styles.smallCheckbox,
                locationInfo && styles.checkedSmallBox,
              ]}
            >
              {locationInfo && <Text style={styles.smallCheckmark}>✓</Text>}
            </View>
            <Text style={styles.termText}>
              [필수] 위치정보 수집 및 이용 동의
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.termItem}
          onPress={() => setAiAnalysis(!aiAnalysis)}
        >
          <View style={styles.termLeft}>
            <View
              style={[
                styles.smallCheckbox,
                aiAnalysis && styles.checkedSmallBox,
              ]}
            >
              {aiAnalysis && <Text style={styles.smallCheckmark}>✓</Text>}
            </View>
            <Text style={styles.termText}>
              [필수] AI 분석 및 사진 데이터 활용 동의
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  termsContainer: {
    marginBottom: 30,
  },
  allTermsContainer: {
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 23,
    height: 23,
    borderRadius: 12,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: "#4262FF",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  allTermsText: {
    fontSize: 15,
    fontWeight: "medium",
    color: "#000000",
  },
  individualTerms: {
    paddingLeft: 10,
  },
  termItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 9,
  },
  termLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  smallCheckbox: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkedSmallBox: {
    backgroundColor: "#4262FF",
  },
  smallCheckmark: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  termText: {
    fontSize: 14,
    color: "#666666",
    flex: 1,
  },
  arrow: {
    fontSize: 18,
    color: "#CCCCCC",
    marginLeft: 10,
  },
});

export default Agreement;
