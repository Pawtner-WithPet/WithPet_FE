// src/screens/Home/Mypage/ChatList.tsx
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Colors } from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const iconBack = require("../../../assets/icons/icon_detail_page.png");
const iconSearch = require("../../../assets/icons/search.png");
const profilePlaceholder = require("../../../assets/icons/enter_image.png");

type Chat = {
  id: number;
  name: string;
  preview: string;
  time?: string;
  updatedAt: string;
  unreadCount: number;
  profile?: number;
};

const mockChats: Chat[] = [
  {
    id: 1,
    name: "포포",
    preview: "아이 상태가 괜찮은가요?",
    profile: require("../../../assets/images/happy1.png"),
    unreadCount: 0,
    updatedAt: "2025-08-14T12:10:00+09:00",
  },
  {
    id: 2,
    name: "두부",
    preview: "아이 상태가 괜찮은가요?",
    profile: require("../../../assets/images/happy1.png"),
    unreadCount: 0,
    updatedAt: "2025-08-14T12:10:00+09:00",
  },
  {
    id: 3,
    name: "망고",
    preview: "사진 보내드렸어요!",
    profile: require("../../../assets/images/happy2.png"),
    unreadCount: 5,
    updatedAt: "2025-07-20T10:05:00+09:00",
  },
];

const ChatList: React.FC = () => {
  const [chatList] = useState<Chat[]>(mockChats);
  const navigation = useNavigation();
  const getAvatarSource = (chat: Chat) => chat.profile ?? profilePlaceholder;

  const isToday = (d: Date) => {
    const now = new Date();
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  };

  const formatChatTime = (iso: string, fallback?: string) => {
    try {
      const d = new Date(iso);
      if (isNaN(d.getTime())) return fallback ?? "";
      if (isToday(d)) {
        return new Intl.DateTimeFormat("ko-KR", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(d);
      }
      return `${d.getMonth() + 1}월 ${d.getDate()}일`;
    } catch {
      return fallback ?? "";
    }
  };

  const renderItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      style={styles.chatItem}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("ChatRoom" as never)}
    >
      {/* 왼쪽 프로필 */}
      {item.profile ? (
        <Image source={item.profile} style={styles.avatar} />
      ) : (
        <View style={styles.avatar}>
          <Image source={profilePlaceholder} style={styles.placeholderIcon} />
        </View>
      )}

      {/* 가운데 이름 + 미리보기 */}
      <View style={styles.middle}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.preview} numberOfLines={1}>
          {item.preview}
        </Text>
      </View>

      {/* 오른쪽 시간 + 뱃지 */}
      <View style={styles.right}>
        <Text style={styles.time}>
          {formatChatTime(item.updatedAt, item.time)}
        </Text>
        {item.unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const ItemSeparator = () => <View style={styles.divider} />;

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
      <FlatList
        data={chatList}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.content}
      />
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
    marginTop: 30,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  headerBtn: { padding: 6 },
  headerIconBack: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    transform: [{ scaleX: -1 }],
  },
  headerIcon: { width: 24, height: 24, resizeMode: "contain" },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#111" },
  content: { paddingVertical: 4, backgroundColor: "#fff" },

  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 14,
    backgroundColor: "#EEE",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  middle: { flex: 1, justifyContent: "center" },
  name: { fontSize: 15, fontWeight: "700", color: "#111" },
  preview: { fontSize: 14, color: "#666", marginTop: 2 },
  right: { alignItems: "flex-end" },
  time: { fontSize: 12, color: "#999", marginBottom: 6 },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: "#4262FF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  divider: { height: 1, backgroundColor: "#E1E1E1", marginLeft: 20 },
});

export default ChatList;
