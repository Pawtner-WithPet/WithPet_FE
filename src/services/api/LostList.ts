import api from "./api";

export type PostItem = {
  id: string;
  status: "실종" | "발견";
  gender?: "male" | "female";
  breed: string;
  dateTime: string;            
  location: string;
  image?: { uri: string };
  postId: number;
  sex: string | null;
  raw: any;
};

const normType = (v: any): "실종" | "발견" => {
  const s = String(v ?? "").trim().toUpperCase();
  if (s === "LOST" || s === "실종") return "실종";
  if (s === "FOUND" || s === "발견") return "발견";
  return "실종";
};

const normSex = (v: any): "male" | "female" | undefined => {
  const s = String(v ?? "").trim().toUpperCase();
  if (s === "MALE" || s === "수컷") return "male";
  if (s === "FEMALE" || s === "암컷") return "female";
  return undefined;
};

const toEpochMs = (v: string | number | null | undefined): number => {
  if (v == null) return 0;
  if (typeof v === "number") return v < 1e12 ? v * 1000 : v; 
  const t = Date.parse(v);
  return Number.isNaN(t) ? 0 : t;
};

const fmtDot = (v: string | number | null | undefined): string => {
  if (v == null) return "-";
  if (typeof v === "number") {
    const ms = v < 1e12 ? v * 1000 : v;
    const d = new Date(ms);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(
      d.getHours()
    )}:${pad(d.getMinutes())}`;
  }
  return v.replace(/-/g, ".").replace("T", " ").slice(0, 16);
};

export async function fetchSearchAllList(
  params?: { keyword?: string }
): Promise<PostItem[]> {
  try {
    console.log("[Lost] all-list 성공");
    const res = await api.get("/api/search/all-list", { params });
    const rows: any[] = res?.data?.data ?? [];

    const mapped = rows.map((r) => {
      const status = normType(r.type);
      const createdMs = toEpochMs(r.createdAt);
      const eventMs = toEpochMs(r.eventDate);

      return {
        id: `${status === "실종" ? "lost" : "found"}-${r.postId}`,
        status,
        gender: normSex(r.sex),
        breed: r.kindNm,
        dateTime: fmtDot(r.eventDate), 
        location: r.location ?? "-",
        image: r.imgUrl ? { uri: r.imgUrl } : undefined,
        postId: r.postId,
        sex: r.sex ?? null,
        raw: r,
        __prio: status === "실종" ? 0 : 1,         
        __sort: createdMs || eventMs,              
      };
    });

    mapped.sort((a, b) => (a.__prio - b.__prio) || (b.__sort - a.__sort));
    return mapped.map(({ __prio, __sort, ...rest }) => rest);
  } catch (error: any) {
    console.error("[Lost] all-list 실패:", error?.message);
    if (error?.response) {
      console.error("📦 서버 응답 상태:", error.response.status);
      console.error("📦 서버 응답 데이터:", error.response.data);
    } else if (error.request) {
      console.error("🚫 요청이 전송됐으나 응답이 없습니다:", error.request);
    } else {
      console.error("❗ 알 수 없는 에러:", error.message);
    }
    return [];
  }
}
