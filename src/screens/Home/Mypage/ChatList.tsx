// src/screens/Home/Mypage/ChatList.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Colors } from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";

// 아이콘
const iconBack = require("../../../assets/icons/icon_detail_page.png");
const iconSearch = require("../../../assets/icons/icon_search.png");

const mockChats = [
  {
    id: 1,
    name: "포포 보호자님",
    preview: "혹시 근처에서 보셨나요?",
    profile: require("../../../assets/images/happy1.png"),
    unreadCount: 2,
    time: "오후 3:42",
  },
  {
    id: 2,
    name: "두부 보호자님",
    preview: "아이 상태가 괜찮은가요?",
    profile: require("../../../assets/images/happy1.png"),
    unreadCount: 0,
    time: "오후 12:10",
  },
  {
    id: 3,
    name: "망고 보호자님",
    preview: "사진 보내드렸어요!",
    profile: require("../../../assets/images/happy1.png"),
    unreadCount: 5,
    time: "오전 10:05",
  },
];

const ChatList: React.FC = () => {
  const [chatList] = useState(mockChats);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => navigation.goBack()}
        >
          <Image source={iconBack} style={styles.headerIconBack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>채팅</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Image source={iconSearch} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>

      {/* 채팅 리스트 */}
      <ScrollView contentContainerStyle={styles.content}>
        {chatList.map((chat) => (
          <TouchableOpacity key={chat.id} style={styles.chatItem}>
            {/* 왼쪽 프로필 */}
            <Image source={chat.profile} style={styles.avatar} />

            {/* 가운데 이름 + 미리보기 */}
            <View style={styles.middle}>
              <Text style={styles.name} numberOfLines={1}>
                {chat.name}
              </Text>
              <Text style={styles.preview} numberOfLines={1}>
                {chat.preview}
              </Text>
            </View>

            {/* 오른쪽 시간 + 뱃지 */}
            <View style={styles.right}>
              <Text style={styles.time}>{chat.time}</Text>
              {chat.unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{chat.unreadCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  headerBtn: {
    padding: 6,
  },
  headerIconBack: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    transform: [{ scaleX: -1 }], // 뒤집기
  },
  headerIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
  },
  content: {
    paddingVertical: 4,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 14,
  },
  middle: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
  preview: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  right: {
    alignItems: "flex-end",
  },
  time: {
    fontSize: 12,
    color: "#999",
    marginBottom: 6,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FF5555",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default ChatList;
