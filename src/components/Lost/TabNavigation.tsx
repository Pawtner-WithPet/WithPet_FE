import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: string[];
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  tabs,
}) => {
  return (
    <View style={styles.tabWrapper}>
      {tabs.map((label) => (
        <TouchableOpacity
          key={label}
          onPress={() => onTabChange(label)}
          style={styles.tabItem}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === label && styles.tabTextActive,
            ]}
          >
            {label}
          </Text>
          {activeTab === label && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },
  tabText: {
    fontSize: 18,
    color: "#aaa",
    fontWeight: "bold",
  },
  tabTextActive: {
    color: "#1A1A1A",
  },
  tabUnderline: {
    position: "absolute",
    bottom: 0,
    height: 2,
    width: "80%",
    backgroundColor: "#222",
  },
});

export default TabNavigation;
