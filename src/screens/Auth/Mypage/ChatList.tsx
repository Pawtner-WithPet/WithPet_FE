import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { getChatRooms } from "../../../services/api/MessageList";

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
  profile?: any;
};

const ChatList: React.FC = () => {
  const navigation = useNavigation();

  const [rooms, setRooms] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const chatRooms = await getChatRooms();
        // API 데이터를 Chat 타입에 맞게 변환
        const formattedRooms: Chat[] = chatRooms.map((r: any) => ({
          id: r.roomId,
          name: r.opponentNickname,
          profile: r.opponentProfileImg
            ? { uri: r.opponentProfileImg }
            : undefined,
          preview: r.lastMessageContent,
          updatedAt: r.lastMessageAt,
          unreadCount: r.unreadCount,
        }));
        setRooms(formattedRooms);
        setError(null);
      } catch (err) {
        let errorMessage = "알 수 없는 오류가 발생했습니다.";
        if (err instanceof Error) errorMessage = err.message;
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

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
      <View style={styles.avatar}>
        <Image
          source={item.profile ?? profilePlaceholder}
          style={styles.placeholderIcon}
        />
      </View>

      <View style={styles.middle}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.preview} numberOfLines={1}>
          {item.preview}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.time}>{formatChatTime(item.updatedAt)}</Text>
        {item.unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );

  if (rooms.length === 0)
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>채팅방이 없습니다.</Text>
      </View>
    );

  return (
    <FlatList
      data={rooms}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View style={styles.divider} />}
      contentContainerStyle={{ backgroundColor: "#fff" }}
    />
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", fontSize: 16, fontWeight: "bold" },
  emptyContainer: { padding: 50, alignItems: "center" },
  emptyText: { color: "#666", fontSize: 16 },

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
    overflow: "hidden",
  },
  placeholderIcon: {
    width: 40,
    height: 40,
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
