import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Tab = {
  id: string;
  label: string;
  active: boolean;
};

type TabNavigationProps = {
  activeTab: string;
  onTabChange: (tabId: string) => void;
};

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs: Tab[] = [
    { id: "discovered", label: "발견동물", active: true },
    { id: "sns", label: "SNS", active: true },
    { id: "report", label: "보호소", active: true },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          onPress={() => tab.active && onTabChange(tab.id)}
          style={[
            styles.tab,
            activeTab === tab.id && styles.activeTab,
            !tab.active && styles.inactiveTab,
          ]}
          disabled={!tab.active}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText,
              !tab.active && styles.inactiveTabText,
            ]}
          >
            {tab.label}
          </Text>
          {activeTab === tab.id && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    position: "relative",
  },
  activeTab: {
    // 활성 탭 스타일
  },
  inactiveTab: {
    // 비활성 탭 스타일
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#CCCCCC",
  },
  activeTabText: {
    color: "#000000",
    fontWeight: "600",
  },
  inactiveTabText: {
    color: "#CCCCCC",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#000000",
  },
});

export default TabNavigation;
