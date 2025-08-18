import React, { useMemo, useState } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList, Image
} from "react-native";
import { Colors } from "../../../constants/colors";
import Header from '../../../components/Header';


const iconChat = require("../../../assets/icons/chat.png");
const iconPaw = require("../../../assets/icons/my_pet.png");   
const icon_detail_page = require("../../../assets/icons/icon_detail_page.png");   

type Noti = {
  id: string;
  type: "chat" | "search";
  title: string;       
  body: string;         
  hoursAgo: number;     
};

const mockNotis: Noti[] = [
  { id: "1", type: "chat",   title: "채팅 알림", body: "000 님으로 부터 메시지가 도착했습니다.", hoursAgo: 3 },
  { id: "2", type: "search", title: "탐색 결과", body: "000 님으로 부터 메시지가 도착했습니다.", hoursAgo: 3 },
  { id: "3", type: "chat",   title: "채팅 알림", body: "000 님으로 부터 메시지가 도착했습니다.", hoursAgo: 3 },
  { id: "4", type: "chat",   title: "채팅 알림", body: "000 님으로 부터 메시지가 도착했습니다.", hoursAgo: 3 },
];

const Tabs = ["전체", "채팅", "탐색"] as const;
type Tab = typeof Tabs[number];

const Notifications: React.FC = () => {
  const [tab, setTab] = useState<Tab>("전체");
  const [order] = useState<"최신순">("최신순"); 

  const data = useMemo(() => {
    if (tab === "전체") return mockNotis;
    if (tab === "채팅") return mockNotis.filter(n => n.type === "chat");
    return mockNotis.filter(n => n.type === "search");
  }, [tab]);

  const renderItem = ({ item }: { item: Noti }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleWrap}>
          <Image
            source={item.type === "chat" ? iconChat : iconPaw}
            style={styles.cardIcon}
          />
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
        <Text style={styles.cardTime}>{item.hoursAgo}시간 전</Text>
      </View>
      <Text style={styles.cardBody}>{item.body}</Text>
    </View>
  );

  const ItemSeparator = () => <View style={{ height: 14 }} />;

  return (
    <View style={styles.container}>
        <Header />
        <View style={styles.container2}>
            {/* 탭 + 정렬 */}
            <View style={styles.rowBetween}>
                <View style={styles.tabs}>
                {Tabs.map(t => (
                    <TouchableOpacity
                    key={t}
                    style={[styles.tab, tab === t ? styles.tabActive : styles.tabInactive]}
                    onPress={() => setTab(t)}
                    activeOpacity={0.8}
                    >
                    <Text style={[styles.tabText, tab === t ? styles.tabTextActive : styles.tabTextInactive]}>
                        {t}
                    </Text>
                    </TouchableOpacity>
                ))}
                </View>

                <View style={styles.orderWrap}>
                <Text style={styles.orderText}>{order}</Text>
                <Image source={icon_detail_page} style={styles.orderImage}/>
                </View>
            </View>

            {/* 리스트 */}
            <FlatList
                data={data}
                keyExtractor={(n) => n.id}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemSeparator}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
            </View>

        </View>
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container2:{
    padding : 15,
  },
  topIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12, paddingBottom: 8,
  },
  topIcon: { width: 22, height: 22, tintColor: "#111" },
  topIconBig: { width: 44, height: 24, resizeMode: "contain", tintColor: "#7C7CFF" },

  rowBetween: { marginTop: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  tabs: { flexDirection: "row", gap: 8 },
  tab: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 18 },
  tabActive: { backgroundColor: "#1E2A4A" },
  tabInactive: { backgroundColor: "#E9EAEE" },
  tabText: { fontSize: 13, fontWeight: "700" },
  tabTextActive: { color: "#fff" },
  tabTextInactive: { color: "#6B7280" },

  orderWrap: { flexDirection: "row", alignItems: "center", gap: 6 },
  orderText: { fontSize: 13, color: "#111" },
  orderImage: {width: 22, height: 22, transform: [{ rotate: "90deg" }],},

  listContent: { paddingVertical: 16, paddingBottom: 24 },

  card: {
    backgroundColor: "#F2F3F5",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#D5D7DB",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  cardTitleWrap: { flexDirection: "row", alignItems: "center", gap: 8 },
  cardIcon: { width: 30, height: 30, tintColor: "#111", resizeMode: "contain" },
  cardTitle: { fontSize: 15, fontWeight: "800", color: "#111" },
  cardTime: { fontSize: 12, color: "#9CA3AF" },
  cardBody: { fontSize: 15, color: "#222", lineHeight: 22 },
});

export default Notifications;
