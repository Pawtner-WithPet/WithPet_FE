import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const iconBack = require("../../../assets/icons/icon_detail_page.png");
const avatarPlaceholder = require("../../../assets/icons/enter_image.png");
const happy1 = require("../../../assets/images/happy1.png");
const happy2 = require("../../../assets/images/happy2.png");

type Message = {
  id: string;
  side: "me" | "other";
  text?: string;
  image?: string;
  read?: boolean;
  time: string;
};

const mockMessages: Message[] = [
  { id: "1", side: "me", text: "안녕하세요", read: true, time: "00:00" },
  { id: "2", side: "other", text: "안녕하세요. 강아지 주인분 맞으신가요?", time: "00:00" },
  {
    id: "3",
    side: "me",
    text: "네, 맞습니다",
    read: false,
    time: "00:00",
  },
];

const ChatRoom: React.FC = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const listRef = useRef<FlatList>(null);

  const data = useMemo(() => mockMessages, []);

  const renderHeader = () => (
    <>
      <View style={styles.noticeWrap}>
        <Text style={styles.noticeText}>
          사례금을 노린 허위 제보는 법령에 따라 처벌받을 수 있으나 서비스 이용
          시 유의하여 주시길 바랍니다.
        </Text>
      </View>

      <View style={styles.thinDivider} />

      <View style={styles.dateChip}>
        <Text style={styles.dateChipText}>00월 00일</Text>
      </View>
    </>
  );

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.side === "me";

    const bubble = item.image ? (
      <View
        style={[
          styles.imageBubble,
          isMe ? styles.bubbleRight : styles.bubbleLeft,
        ]}
      />
    ) : (
      <View
        style={[
          styles.bubble,
          isMe ? styles.bubbleMe : styles.bubbleOther,
          isMe ? styles.bubbleRight : styles.bubbleLeft,
        ]}
      >
        <Text style={[styles.bubbleText, isMe && styles.bubbleTextMe]}>
          {item.text}
        </Text>
      </View>
    );

    const statusLine = isMe ? (
      <View
        style={[
          styles.statusRow,
          { alignSelf: isMe ? "flex-end" : "flex-start" },
        ]}
      >
        <Text
          style={[
            styles.readLabel,
            item.read ? styles.readBlue : styles.readRed,
          ]}
        >
          {item.read ? "읽음" : "안읽음"}
        </Text>
        <Text style={styles.timeLabel}>{item.time}</Text>
      </View>
    ) : (
      <View style={[styles.statusRow, { alignSelf: "flex-start" }]}>
        <Text style={styles.timeLabel}>{item.time}</Text>
      </View>
    );

    return (
      <View style={[styles.row, isMe ? styles.rowRight : styles.rowLeft]}>
        {isMe ? <>{bubble}</> : <>{bubble}</>}
        {statusLine}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerBtn}
        >
          <Image source={iconBack} style={styles.backIcon} />
        </TouchableOpacity>

        <View style={styles.titleWrap}>
          <Text style={styles.title}>포포</Text>
          <Text style={styles.subtitle}>포메라니안</Text>
        </View>

        <View style={styles.rightWrap}>
          <Image source={avatarPlaceholder} style={styles.headerAvatar} />
        </View>
      </View>

      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(m) => m.id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.inputBar}>
        <TouchableOpacity style={styles.plusBtn} activeOpacity={0.8}>
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>

        <View style={styles.inputWrap}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="메시지를 입력해 주세요."
            placeholderTextColor="#9CA3AF"
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          style={[styles.sendBtn, !input.trim() && { opacity: 0.5 }]}
          activeOpacity={0.8}
          disabled={!input.trim()}
          onPress={() => {
            setInput("");
            listRef.current?.scrollToEnd({ animated: true });
          }}
        >
          <Text style={styles.sendIcon}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const BLUE = "#4262FF";
const BG = "#FFFFFF";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerBtn: { padding: 6, marginRight: 6 },
  backIcon: {
    width: 24,
    height: 24,
    transform: [{ scaleX: -1 }],
    tintColor: "#111",
  },
  titleWrap: { flex: 1, alignItems: "center" },
  title: { fontSize: 18, fontWeight: "800", color: "#111" },
  subtitle: { fontSize: 12, color: "#999", marginTop: 2 },
  rightWrap: { width: 36, alignItems: "flex-end" },
  headerAvatar: {
    width: 30,
    height: 30,
    borderRadius: 14,
    backgroundColor: "#EEE",
  },

  noticeWrap: {
    marginHorizontal: 16,
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#F7F8FA",
    borderRadius: 12,
  },
  noticeText: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
    textAlign: "center",
  },
  thinDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  dateChip: {
    alignSelf: "center",
    backgroundColor: "#F2F3F5",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 2,
    marginBottom: 8,
  },
  dateChipText: { fontSize: 11, color: "#999" },

  listContent: { paddingHorizontal: 16, paddingBottom: 88 },
  row: { marginVertical: 6 },
  rowLeft: { alignItems: "flex-start" },
  rowRight: { alignItems: "flex-end" },

  bubble: {
    maxWidth: "78%",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  bubbleLeft: { alignSelf: "flex-start" },
  bubbleRight: { alignSelf: "flex-end" },

  bubbleMe: { backgroundColor: BLUE },
  bubbleOther: { backgroundColor: "#F0F0F0" },

  bubbleText: { fontSize: 15, color: "#111" },
  bubbleTextMe: { color: "#fff", fontWeight: "600" },

  imageBubble: {
    width: 220,
    height: 110,
    borderRadius: 12,
    backgroundColor: BLUE,
  },

  statusRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 4,
    alignItems: "center",
  },
  readLabel: { fontSize: 11 },
  readBlue: { color: BLUE },
  readRed: { color: "#FF5757" },
  timeLabel: { fontSize: 11, color: "#999" },

  /* 입력 바 */
  inputBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F8FA",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  plusBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  plusText: { fontSize: 22, color: "#9CA3AF", lineHeight: 22 },
  inputWrap: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    height: 40,
    justifyContent: "center",
  },
  input: { fontSize: 14, color: "#111", paddingVertical: 0 },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BLUE,
  },
  sendIcon: { color: "#fff", fontSize: 16, fontWeight: "800" },
});

export default ChatRoom;
