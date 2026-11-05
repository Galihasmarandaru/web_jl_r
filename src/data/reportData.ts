// AUTO-GENERATED FROM data_referensi/ BY scripts/sync_data.py — DO NOT EDIT MANUALLY
export type PeriodKey = "2026-10" | "2026-09";

export interface DailyVal { date: string; val: number; }
export interface DemografiData {
  age_gender: { age: string; Perempuan: number; Laki_laki: number }[];
  cities: { name: string; pct: number }[];
  countries: { name: string; pct: number }[];
}
export interface IGPeriodData {
  available: boolean;
  periodKey: PeriodKey;
  monthTitle: string;
  periodLabel: string;
  tayangan: DailyVal[];
  jangkauan: DailyVal[];
  interaksi: DailyVal[];
  kunjungan: DailyVal[];
  klik: DailyVal[];
  pengikut: DailyVal[];
  pengikutActiveDays: number;
  demografi: DemografiData | null;
  potensial: DemografiData | null;
  allTimeRangeLabel?: string | null;
  trenPemirsa: {
    mengikuti: number;
    mengikutiDeltaLabel: string;
    batalMengikuti: number;
    batalDeltaLabel: string;
    netPengikut: number;
    kontakPesan: number;
    kontakDeltaLabel: string;
    totalPengikut: number;
    periodText: string;
  };
  kontenPopuler: {
    rank: number;
    title: string;
    overlay: string;
    date: string;
    views: number;
    viewsLabel: string;
    likes: number;
    comments: number;
    shares: number;
    pilar: string;
  }[];
  presentFiles: string[];
  missingFiles: { name: string; reason: string }[];
}

export interface TikTokPostItem {
  exportTime: string;
  title: string;
  link: string;
  videoId: string;
  postTime: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isCurrentMonth: boolean;
}

export interface TikTokPeriodData {
  available: boolean;
  periodKey: PeriodKey;
  monthTitle: string;
  periodLabel: string;
  reason?: string;
  overview: {
    date: string;
    views: number;
    profileViews: number;
    likes: number;
    comments: number;
    shares: number;
    interactions: number;
  }[];
  viewers: {
    date: string;
    total: number;
    newViewers: number;
    returning: number;
  }[];
  trafficSource: { source: string; rawName: string; pct: number }[];
  searchQueries: { query: string; pct: number; intent: string }[];
  topPosts: {
    most_views: TikTokPostItem[];
    most_new_viewers: TikTokPostItem[];
    most_likes: TikTokPostItem[];
    new_followers: TikTokPostItem[];
  };
  viewersDemographics: {
    gender: { label: string; pct: number }[];
    age: { age: string; pct: number }[];
    locations: { country: string; pct: number; note: string }[];
  };
  competitorsAndInterests: {
    creators: { name: string; followers: string; category: string; highlight: boolean }[];
    posts: { rank: number; creator: string; title: string; views: string; highlight: boolean }[];
  };
  followersHistory: { date: string; followers: number; diff: number }[];
  followersGender: { gender: string; pct: number }[];
  followersTerritories: { code: string; pct: number }[];
  followersActivity: {
    dateRange: string;
    hourlyAvg: { hour: string; avgActive: number }[];
  };
  presentFiles: string[];
  missingFiles: { name: string; reason: string }[];
}

export interface ReportPayload {
  defaultPeriod: PeriodKey;
  periods: { key: PeriodKey; label: string; sub: string; hasIG: boolean; hasTT: boolean }[];
  instagram: Record<PeriodKey, IGPeriodData>;
  tiktok: Record<PeriodKey, TikTokPeriodData>;
}

export const REPORT_DATA: ReportPayload = {
  "defaultPeriod": "2026-10",
  "periods": [
    {
      "key": "2026-10",
      "label": "Oktober 2026",
      "sub": "Periode Terbaru · IG & TikTok Lengkap",
      "hasIG": true,
      "hasTT": true
    },
    {
      "key": "2026-09",
      "label": "September 2026",
      "sub": "IG (8 File) · TikTok Belum Ada Data",
      "hasIG": true,
      "hasTT": false
    }
  ],
  "instagram": {
    "2026-09": {
      "available": true,
      "periodKey": "2026-09",
      "monthTitle": "September 2026",
      "periodLabel": "1 – 30 September 2026 (30 Hari)",
      "tayangan": [
        {
          "date": "2026-09-01",
          "val": 110
        },
        {
          "date": "2026-09-02",
          "val": 112
        },
        {
          "date": "2026-09-03",
          "val": 340
        },
        {
          "date": "2026-09-04",
          "val": 167
        },
        {
          "date": "2026-09-05",
          "val": 110
        },
        {
          "date": "2026-09-06",
          "val": 32
        },
        {
          "date": "2026-09-07",
          "val": 128
        },
        {
          "date": "2026-09-08",
          "val": 59
        },
        {
          "date": "2026-09-09",
          "val": 219
        },
        {
          "date": "2026-09-10",
          "val": 94
        },
        {
          "date": "2026-09-11",
          "val": 745
        },
        {
          "date": "2026-09-12",
          "val": 575
        },
        {
          "date": "2026-09-13",
          "val": 303
        },
        {
          "date": "2026-09-14",
          "val": 264
        },
        {
          "date": "2026-09-15",
          "val": 269
        },
        {
          "date": "2026-09-16",
          "val": 264
        },
        {
          "date": "2026-09-17",
          "val": 281
        },
        {
          "date": "2026-09-18",
          "val": 325
        },
        {
          "date": "2026-09-19",
          "val": 449
        },
        {
          "date": "2026-09-20",
          "val": 830
        },
        {
          "date": "2026-09-21",
          "val": 432
        },
        {
          "date": "2026-09-22",
          "val": 580
        },
        {
          "date": "2026-09-23",
          "val": 336
        },
        {
          "date": "2026-09-24",
          "val": 411
        },
        {
          "date": "2026-09-25",
          "val": 716
        },
        {
          "date": "2026-09-26",
          "val": 436
        },
        {
          "date": "2026-09-27",
          "val": 302
        },
        {
          "date": "2026-09-28",
          "val": 282
        },
        {
          "date": "2026-09-29",
          "val": 253
        },
        {
          "date": "2026-09-30",
          "val": 374
        }
      ],
      "jangkauan": [
        {
          "date": "2026-09-01",
          "val": 33
        },
        {
          "date": "2026-09-02",
          "val": 36
        },
        {
          "date": "2026-09-03",
          "val": 126
        },
        {
          "date": "2026-09-04",
          "val": 89
        },
        {
          "date": "2026-09-05",
          "val": 29
        },
        {
          "date": "2026-09-06",
          "val": 19
        },
        {
          "date": "2026-09-07",
          "val": 65
        },
        {
          "date": "2026-09-08",
          "val": 36
        },
        {
          "date": "2026-09-09",
          "val": 57
        },
        {
          "date": "2026-09-10",
          "val": 25
        },
        {
          "date": "2026-09-11",
          "val": 16
        },
        {
          "date": "2026-09-12",
          "val": 11
        },
        {
          "date": "2026-09-13",
          "val": 7
        },
        {
          "date": "2026-09-14",
          "val": 13
        },
        {
          "date": "2026-09-15",
          "val": 14
        },
        {
          "date": "2026-09-16",
          "val": 15
        },
        {
          "date": "2026-09-17",
          "val": 14
        },
        {
          "date": "2026-09-18",
          "val": 78
        },
        {
          "date": "2026-09-19",
          "val": 186
        },
        {
          "date": "2026-09-20",
          "val": 390
        },
        {
          "date": "2026-09-21",
          "val": 14
        },
        {
          "date": "2026-09-22",
          "val": 17
        },
        {
          "date": "2026-09-23",
          "val": 13
        },
        {
          "date": "2026-09-24",
          "val": 19
        },
        {
          "date": "2026-09-25",
          "val": 317
        },
        {
          "date": "2026-09-26",
          "val": 83
        },
        {
          "date": "2026-09-27",
          "val": 38
        },
        {
          "date": "2026-09-28",
          "val": 25
        },
        {
          "date": "2026-09-29",
          "val": 13
        },
        {
          "date": "2026-09-30",
          "val": 24
        }
      ],
      "interaksi": [
        {
          "date": "2026-09-01",
          "val": 1
        },
        {
          "date": "2026-09-02",
          "val": 1
        },
        {
          "date": "2026-09-03",
          "val": 9
        },
        {
          "date": "2026-09-04",
          "val": 3
        },
        {
          "date": "2026-09-05",
          "val": 0
        },
        {
          "date": "2026-09-06",
          "val": 1
        },
        {
          "date": "2026-09-07",
          "val": 0
        },
        {
          "date": "2026-09-08",
          "val": 4
        },
        {
          "date": "2026-09-09",
          "val": 4
        },
        {
          "date": "2026-09-10",
          "val": 2
        },
        {
          "date": "2026-09-11",
          "val": 28
        },
        {
          "date": "2026-09-12",
          "val": 15
        },
        {
          "date": "2026-09-13",
          "val": 8
        },
        {
          "date": "2026-09-14",
          "val": 6
        },
        {
          "date": "2026-09-15",
          "val": 4
        },
        {
          "date": "2026-09-16",
          "val": 7
        },
        {
          "date": "2026-09-17",
          "val": 4
        },
        {
          "date": "2026-09-18",
          "val": 2
        },
        {
          "date": "2026-09-19",
          "val": 4
        },
        {
          "date": "2026-09-20",
          "val": 6
        },
        {
          "date": "2026-09-21",
          "val": 7
        },
        {
          "date": "2026-09-22",
          "val": 4
        },
        {
          "date": "2026-09-23",
          "val": 2
        },
        {
          "date": "2026-09-24",
          "val": 4
        },
        {
          "date": "2026-09-25",
          "val": 18
        },
        {
          "date": "2026-09-26",
          "val": 5
        },
        {
          "date": "2026-09-27",
          "val": 3
        },
        {
          "date": "2026-09-28",
          "val": 7
        },
        {
          "date": "2026-09-29",
          "val": 4
        },
        {
          "date": "2026-09-30",
          "val": 4
        }
      ],
      "kunjungan": [
        {
          "date": "2026-09-01",
          "val": 10
        },
        {
          "date": "2026-09-02",
          "val": 14
        },
        {
          "date": "2026-09-03",
          "val": 10
        },
        {
          "date": "2026-09-04",
          "val": 5
        },
        {
          "date": "2026-09-05",
          "val": 8
        },
        {
          "date": "2026-09-06",
          "val": 6
        },
        {
          "date": "2026-09-07",
          "val": 5
        },
        {
          "date": "2026-09-08",
          "val": 6
        },
        {
          "date": "2026-09-09",
          "val": 14
        },
        {
          "date": "2026-09-10",
          "val": 10
        },
        {
          "date": "2026-09-11",
          "val": 10
        },
        {
          "date": "2026-09-12",
          "val": 7
        },
        {
          "date": "2026-09-13",
          "val": 7
        },
        {
          "date": "2026-09-14",
          "val": 10
        },
        {
          "date": "2026-09-15",
          "val": 8
        },
        {
          "date": "2026-09-16",
          "val": 6
        },
        {
          "date": "2026-09-17",
          "val": 8
        },
        {
          "date": "2026-09-18",
          "val": 10
        },
        {
          "date": "2026-09-19",
          "val": 10
        },
        {
          "date": "2026-09-20",
          "val": 8
        },
        {
          "date": "2026-09-21",
          "val": 6
        },
        {
          "date": "2026-09-22",
          "val": 9
        },
        {
          "date": "2026-09-23",
          "val": 13
        },
        {
          "date": "2026-09-24",
          "val": 11
        },
        {
          "date": "2026-09-25",
          "val": 16
        },
        {
          "date": "2026-09-26",
          "val": 9
        },
        {
          "date": "2026-09-27",
          "val": 10
        },
        {
          "date": "2026-09-28",
          "val": 8
        },
        {
          "date": "2026-09-29",
          "val": 9
        },
        {
          "date": "2026-09-30",
          "val": 15
        }
      ],
      "klik": [
        {
          "date": "2026-09-01",
          "val": 0
        },
        {
          "date": "2026-09-02",
          "val": 0
        },
        {
          "date": "2026-09-03",
          "val": 0
        },
        {
          "date": "2026-09-04",
          "val": 0
        },
        {
          "date": "2026-09-05",
          "val": 0
        },
        {
          "date": "2026-09-06",
          "val": 0
        },
        {
          "date": "2026-09-07",
          "val": 0
        },
        {
          "date": "2026-09-08",
          "val": 0
        },
        {
          "date": "2026-09-09",
          "val": 0
        },
        {
          "date": "2026-09-10",
          "val": 0
        },
        {
          "date": "2026-09-11",
          "val": 0
        },
        {
          "date": "2026-09-12",
          "val": 0
        },
        {
          "date": "2026-09-13",
          "val": 0
        },
        {
          "date": "2026-09-14",
          "val": 0
        },
        {
          "date": "2026-09-15",
          "val": 0
        },
        {
          "date": "2026-09-16",
          "val": 0
        },
        {
          "date": "2026-09-17",
          "val": 0
        },
        {
          "date": "2026-09-18",
          "val": 0
        },
        {
          "date": "2026-09-19",
          "val": 0
        },
        {
          "date": "2026-09-20",
          "val": 0
        },
        {
          "date": "2026-09-21",
          "val": 0
        },
        {
          "date": "2026-09-22",
          "val": 0
        },
        {
          "date": "2026-09-23",
          "val": 0
        },
        {
          "date": "2026-09-24",
          "val": 0
        },
        {
          "date": "2026-09-25",
          "val": 0
        },
        {
          "date": "2026-09-26",
          "val": 0
        },
        {
          "date": "2026-09-27",
          "val": 0
        },
        {
          "date": "2026-09-28",
          "val": 0
        },
        {
          "date": "2026-09-29",
          "val": 0
        },
        {
          "date": "2026-09-30",
          "val": 0
        }
      ],
      "pengikut": [
        {
          "date": "2026-09-01",
          "val": 0
        },
        {
          "date": "2026-09-02",
          "val": 0
        },
        {
          "date": "2026-09-03",
          "val": 0
        },
        {
          "date": "2026-09-04",
          "val": 2
        },
        {
          "date": "2026-09-05",
          "val": 0
        },
        {
          "date": "2026-09-06",
          "val": 0
        },
        {
          "date": "2026-09-07",
          "val": 1
        },
        {
          "date": "2026-09-08",
          "val": 0
        },
        {
          "date": "2026-09-09",
          "val": 0
        },
        {
          "date": "2026-09-10",
          "val": 1
        },
        {
          "date": "2026-09-11",
          "val": 1
        },
        {
          "date": "2026-09-12",
          "val": 2
        },
        {
          "date": "2026-09-13",
          "val": 0
        },
        {
          "date": "2026-09-14",
          "val": 1
        },
        {
          "date": "2026-09-15",
          "val": 0
        },
        {
          "date": "2026-09-16",
          "val": 0
        },
        {
          "date": "2026-09-17",
          "val": 0
        },
        {
          "date": "2026-09-18",
          "val": 1
        },
        {
          "date": "2026-09-19",
          "val": 0
        },
        {
          "date": "2026-09-20",
          "val": 0
        },
        {
          "date": "2026-09-21",
          "val": 0
        },
        {
          "date": "2026-09-22",
          "val": 1
        },
        {
          "date": "2026-09-23",
          "val": 1
        },
        {
          "date": "2026-09-24",
          "val": 0
        },
        {
          "date": "2026-09-25",
          "val": 1
        },
        {
          "date": "2026-09-26",
          "val": 0
        },
        {
          "date": "2026-09-27",
          "val": 0
        },
        {
          "date": "2026-09-28",
          "val": 0
        },
        {
          "date": "2026-09-29",
          "val": 1
        },
        {
          "date": "2026-09-30",
          "val": 0
        }
      ],
      "pengikutActiveDays": 11,
      "demografi": null,
      "potensial": null,
      "allTimeRangeLabel": null,
      "trenPemirsa": {
        "mengikuti": 13,
        "mengikutiDeltaLabel": "↑ 44,4% vs Agt",
        "batalMengikuti": 12,
        "batalDeltaLabel": "↓ 45,5% vs Agt",
        "netPengikut": 1,
        "kontakPesan": 2,
        "kontakDeltaLabel": "↓ 33,3% vs Agt",
        "totalPengikut": 1488,
        "periodText": "1 Sep 2026 – 30 Sep 2026"
      },
      "kontenPopuler": [
        {
          "rank": 1,
          "title": "biasanya cuma explore Jogja sebulan sekali...",
          "overlay": "Kuliner & Hidup di Jogja",
          "date": "11 September 18:18",
          "views": 9700,
          "viewsLabel": "9,7 rb",
          "likes": 90,
          "comments": 1,
          "shares": 9,
          "pilar": "Autentik / Lifestyle"
        },
        {
          "rank": 2,
          "title": "Dear future me, semoga nanti punya...",
          "overlay": "Santai di Sofa Kamar",
          "date": "18 September 19:18",
          "views": 875,
          "viewsLabel": "875",
          "likes": 5,
          "comments": 0,
          "shares": 1,
          "pilar": "Autentik / Kehidupan Kost"
        },
        {
          "rank": 3,
          "title": "Belum makan kalau belum selesai 😌...",
          "overlay": "Anak kost be like: Laper belum makan dari pagi Ntar aja lah nanggung nugas",
          "date": "25 September 21:28",
          "views": 571,
          "viewsLabel": "571",
          "likes": 15,
          "comments": 0,
          "shares": 0,
          "pilar": "Autentik / Relatable Mahasiswa"
        },
        {
          "rank": 4,
          "title": "The real a place to call home ❤️✨",
          "overlay": "Bukan hotel, tapi ini Kost eksklusif di Jogja",
          "date": "4 September 00:01",
          "views": 441,
          "viewsLabel": "441",
          "likes": 11,
          "comments": 0,
          "shares": 0,
          "pilar": "Fasilitas Unggulan"
        },
        {
          "rank": 5,
          "title": "Your room. Your comfort. Your home. ...",
          "overlay": "pov: kamu kost di tipe kamar VIP",
          "date": "9 September 22:48",
          "views": 217,
          "viewsLabel": "217",
          "likes": 6,
          "comments": 0,
          "shares": 2,
          "pilar": "Fasilitas Unggulan (VIP Room)"
        }
      ],
      "presentFiles": [
        "tayangan.csv",
        "jangkauan.csv",
        "interaksi_konten.csv",
        "kunjungan.csv",
        "pengikut.csv",
        "klik_tautan.csv",
        "konten_populer.png",
        "tren_pemirsa.png"
      ],
      "missingFiles": [
        {
          "name": "demografi_pemirsa.csv",
          "reason": "Filter Instagram hanya mendukung Kumulatif Sepanjang Masa (4 Okt 2023 – 3 Nov 2026), sehingga hanya ditampilkan pada periode terbaru (Oktober 2026)."
        },
        {
          "name": "pemirsa_potensial.csv",
          "reason": "Filter Instagram hanya mendukung Kumulatif Sepanjang Masa (4 Okt 2023 – 3 Nov 2026), sehingga hanya ditampilkan pada periode terbaru (Oktober 2026)."
        }
      ]
    },
    "2026-10": {
      "available": true,
      "periodKey": "2026-10",
      "monthTitle": "Oktober 2026",
      "periodLabel": "1 – 31 Oktober 2026 (31 Hari)",
      "tayangan": [
        {
          "date": "2026-10-01",
          "val": 211
        },
        {
          "date": "2026-10-02",
          "val": 343
        },
        {
          "date": "2026-10-03",
          "val": 237
        },
        {
          "date": "2026-10-04",
          "val": 172
        },
        {
          "date": "2026-10-05",
          "val": 279
        },
        {
          "date": "2026-10-06",
          "val": 215
        },
        {
          "date": "2026-10-07",
          "val": 126
        },
        {
          "date": "2026-10-08",
          "val": 176
        },
        {
          "date": "2026-10-09",
          "val": 153
        },
        {
          "date": "2026-10-10",
          "val": 267
        },
        {
          "date": "2026-10-11",
          "val": 465
        },
        {
          "date": "2026-10-12",
          "val": 132
        },
        {
          "date": "2026-10-13",
          "val": 94
        },
        {
          "date": "2026-10-14",
          "val": 243
        },
        {
          "date": "2026-10-15",
          "val": 128
        },
        {
          "date": "2026-10-16",
          "val": 157
        },
        {
          "date": "2026-10-17",
          "val": 335
        },
        {
          "date": "2026-10-18",
          "val": 159
        },
        {
          "date": "2026-10-19",
          "val": 131
        },
        {
          "date": "2026-10-20",
          "val": 99
        },
        {
          "date": "2026-10-21",
          "val": 148
        },
        {
          "date": "2026-10-22",
          "val": 1644
        },
        {
          "date": "2026-10-23",
          "val": 235
        },
        {
          "date": "2026-10-24",
          "val": 166
        },
        {
          "date": "2026-10-25",
          "val": 104
        },
        {
          "date": "2026-10-26",
          "val": 171
        },
        {
          "date": "2026-10-27",
          "val": 115
        },
        {
          "date": "2026-10-28",
          "val": 68
        },
        {
          "date": "2026-10-29",
          "val": 140
        },
        {
          "date": "2026-10-30",
          "val": 146
        },
        {
          "date": "2026-10-31",
          "val": 28
        }
      ],
      "jangkauan": [
        {
          "date": "2026-10-01",
          "val": 14
        },
        {
          "date": "2026-10-02",
          "val": 162
        },
        {
          "date": "2026-10-03",
          "val": 11
        },
        {
          "date": "2026-10-04",
          "val": 8
        },
        {
          "date": "2026-10-05",
          "val": 18
        },
        {
          "date": "2026-10-06",
          "val": 19
        },
        {
          "date": "2026-10-07",
          "val": 16
        },
        {
          "date": "2026-10-08",
          "val": 25
        },
        {
          "date": "2026-10-09",
          "val": 27
        },
        {
          "date": "2026-10-10",
          "val": 47
        },
        {
          "date": "2026-10-11",
          "val": 38
        },
        {
          "date": "2026-10-12",
          "val": 34
        },
        {
          "date": "2026-10-13",
          "val": 13
        },
        {
          "date": "2026-10-14",
          "val": 27
        },
        {
          "date": "2026-10-15",
          "val": 13
        },
        {
          "date": "2026-10-16",
          "val": 9
        },
        {
          "date": "2026-10-17",
          "val": 139
        },
        {
          "date": "2026-10-18",
          "val": 14
        },
        {
          "date": "2026-10-19",
          "val": 5
        },
        {
          "date": "2026-10-20",
          "val": 8
        },
        {
          "date": "2026-10-21",
          "val": 7
        },
        {
          "date": "2026-10-22",
          "val": 1267
        },
        {
          "date": "2026-10-23",
          "val": 91
        },
        {
          "date": "2026-10-24",
          "val": 23
        },
        {
          "date": "2026-10-25",
          "val": 16
        },
        {
          "date": "2026-10-26",
          "val": 17
        },
        {
          "date": "2026-10-27",
          "val": 10
        },
        {
          "date": "2026-10-28",
          "val": 12
        },
        {
          "date": "2026-10-29",
          "val": 36
        },
        {
          "date": "2026-10-30",
          "val": 48
        },
        {
          "date": "2026-10-31",
          "val": 2
        }
      ],
      "interaksi": [
        {
          "date": "2026-10-01",
          "val": 2
        },
        {
          "date": "2026-10-02",
          "val": 7
        },
        {
          "date": "2026-10-03",
          "val": 1
        },
        {
          "date": "2026-10-04",
          "val": 3
        },
        {
          "date": "2026-10-05",
          "val": 8
        },
        {
          "date": "2026-10-06",
          "val": 3
        },
        {
          "date": "2026-10-07",
          "val": 5
        },
        {
          "date": "2026-10-08",
          "val": 0
        },
        {
          "date": "2026-10-09",
          "val": 2
        },
        {
          "date": "2026-10-10",
          "val": 6
        },
        {
          "date": "2026-10-11",
          "val": 4
        },
        {
          "date": "2026-10-12",
          "val": 5
        },
        {
          "date": "2026-10-13",
          "val": 1
        },
        {
          "date": "2026-10-14",
          "val": 0
        },
        {
          "date": "2026-10-15",
          "val": 0
        },
        {
          "date": "2026-10-16",
          "val": 0
        },
        {
          "date": "2026-10-17",
          "val": 7
        },
        {
          "date": "2026-10-18",
          "val": 0
        },
        {
          "date": "2026-10-19",
          "val": 1
        },
        {
          "date": "2026-10-20",
          "val": 0
        },
        {
          "date": "2026-10-21",
          "val": 3
        },
        {
          "date": "2026-10-22",
          "val": 33
        },
        {
          "date": "2026-10-23",
          "val": 1
        },
        {
          "date": "2026-10-24",
          "val": 7
        },
        {
          "date": "2026-10-25",
          "val": 0
        },
        {
          "date": "2026-10-26",
          "val": 1
        },
        {
          "date": "2026-10-27",
          "val": 1
        },
        {
          "date": "2026-10-28",
          "val": 0
        },
        {
          "date": "2026-10-29",
          "val": 11
        },
        {
          "date": "2026-10-30",
          "val": 3
        },
        {
          "date": "2026-10-31",
          "val": 0
        }
      ],
      "kunjungan": [
        {
          "date": "2026-10-01",
          "val": 5
        },
        {
          "date": "2026-10-02",
          "val": 7
        },
        {
          "date": "2026-10-03",
          "val": 8
        },
        {
          "date": "2026-10-04",
          "val": 8
        },
        {
          "date": "2026-10-05",
          "val": 9
        },
        {
          "date": "2026-10-06",
          "val": 10
        },
        {
          "date": "2026-10-07",
          "val": 8
        },
        {
          "date": "2026-10-08",
          "val": 7
        },
        {
          "date": "2026-10-09",
          "val": 8
        },
        {
          "date": "2026-10-10",
          "val": 11
        },
        {
          "date": "2026-10-11",
          "val": 9
        },
        {
          "date": "2026-10-12",
          "val": 4
        },
        {
          "date": "2026-10-13",
          "val": 5
        },
        {
          "date": "2026-10-14",
          "val": 8
        },
        {
          "date": "2026-10-15",
          "val": 11
        },
        {
          "date": "2026-10-16",
          "val": 7
        },
        {
          "date": "2026-10-17",
          "val": 7
        },
        {
          "date": "2026-10-18",
          "val": 7
        },
        {
          "date": "2026-10-19",
          "val": 8
        },
        {
          "date": "2026-10-20",
          "val": 9
        },
        {
          "date": "2026-10-21",
          "val": 8
        },
        {
          "date": "2026-10-22",
          "val": 15
        },
        {
          "date": "2026-10-23",
          "val": 11
        },
        {
          "date": "2026-10-24",
          "val": 6
        },
        {
          "date": "2026-10-25",
          "val": 8
        },
        {
          "date": "2026-10-26",
          "val": 9
        },
        {
          "date": "2026-10-27",
          "val": 6
        },
        {
          "date": "2026-10-28",
          "val": 6
        },
        {
          "date": "2026-10-29",
          "val": 7
        },
        {
          "date": "2026-10-30",
          "val": 7
        },
        {
          "date": "2026-10-31",
          "val": 2
        }
      ],
      "klik": [
        {
          "date": "2026-10-01",
          "val": 0
        },
        {
          "date": "2026-10-02",
          "val": 0
        },
        {
          "date": "2026-10-03",
          "val": 0
        },
        {
          "date": "2026-10-04",
          "val": 0
        },
        {
          "date": "2026-10-05",
          "val": 0
        },
        {
          "date": "2026-10-06",
          "val": 0
        },
        {
          "date": "2026-10-07",
          "val": 0
        },
        {
          "date": "2026-10-08",
          "val": 0
        },
        {
          "date": "2026-10-09",
          "val": 0
        },
        {
          "date": "2026-10-10",
          "val": 0
        },
        {
          "date": "2026-10-11",
          "val": 0
        },
        {
          "date": "2026-10-12",
          "val": 0
        },
        {
          "date": "2026-10-13",
          "val": 0
        },
        {
          "date": "2026-10-14",
          "val": 0
        },
        {
          "date": "2026-10-15",
          "val": 0
        },
        {
          "date": "2026-10-16",
          "val": 0
        },
        {
          "date": "2026-10-17",
          "val": 0
        },
        {
          "date": "2026-10-18",
          "val": 0
        },
        {
          "date": "2026-10-19",
          "val": 0
        },
        {
          "date": "2026-10-20",
          "val": 0
        },
        {
          "date": "2026-10-21",
          "val": 0
        },
        {
          "date": "2026-10-22",
          "val": 0
        },
        {
          "date": "2026-10-23",
          "val": 0
        },
        {
          "date": "2026-10-24",
          "val": 0
        },
        {
          "date": "2026-10-25",
          "val": 0
        },
        {
          "date": "2026-10-26",
          "val": 0
        },
        {
          "date": "2026-10-27",
          "val": 0
        },
        {
          "date": "2026-10-28",
          "val": 0
        },
        {
          "date": "2026-10-29",
          "val": 0
        },
        {
          "date": "2026-10-30",
          "val": 0
        },
        {
          "date": "2026-10-31",
          "val": 0
        }
      ],
      "pengikut": [
        {
          "date": "2026-10-01",
          "val": 0
        },
        {
          "date": "2026-10-02",
          "val": 0
        },
        {
          "date": "2026-10-03",
          "val": 1
        },
        {
          "date": "2026-10-04",
          "val": 1
        },
        {
          "date": "2026-10-05",
          "val": 0
        },
        {
          "date": "2026-10-06",
          "val": 1
        },
        {
          "date": "2026-10-07",
          "val": 0
        },
        {
          "date": "2026-10-08",
          "val": 0
        },
        {
          "date": "2026-10-09",
          "val": 0
        },
        {
          "date": "2026-10-10",
          "val": 0
        },
        {
          "date": "2026-10-11",
          "val": 1
        },
        {
          "date": "2026-10-12",
          "val": 0
        },
        {
          "date": "2026-10-13",
          "val": 0
        },
        {
          "date": "2026-10-14",
          "val": 0
        },
        {
          "date": "2026-10-15",
          "val": 2
        },
        {
          "date": "2026-10-16",
          "val": 0
        },
        {
          "date": "2026-10-17",
          "val": 0
        },
        {
          "date": "2026-10-18",
          "val": 0
        },
        {
          "date": "2026-10-19",
          "val": 2
        },
        {
          "date": "2026-10-20",
          "val": 0
        },
        {
          "date": "2026-10-21",
          "val": 1
        },
        {
          "date": "2026-10-22",
          "val": 0
        },
        {
          "date": "2026-10-23",
          "val": 1
        },
        {
          "date": "2026-10-24",
          "val": 1
        },
        {
          "date": "2026-10-25",
          "val": 0
        },
        {
          "date": "2026-10-26",
          "val": 0
        },
        {
          "date": "2026-10-27",
          "val": 0
        },
        {
          "date": "2026-10-28",
          "val": 0
        },
        {
          "date": "2026-10-29",
          "val": 1
        },
        {
          "date": "2026-10-30",
          "val": 0
        },
        {
          "date": "2026-10-31",
          "val": 1
        }
      ],
      "pengikutActiveDays": 11,
      "demografi": {
        "age_gender": [
          {
            "age": "18-24",
            "Perempuan": 9.4,
            "Laki_laki": 2.1
          },
          {
            "age": "25-34",
            "Perempuan": 22.9,
            "Laki_laki": 17.4
          },
          {
            "age": "35-44",
            "Perempuan": 19.1,
            "Laki_laki": 12.8
          },
          {
            "age": "45-54",
            "Perempuan": 8.7,
            "Laki_laki": 3.5
          },
          {
            "age": "55-64",
            "Perempuan": 2.8,
            "Laki_laki": 1.0
          },
          {
            "age": "65+",
            "Perempuan": 0.3,
            "Laki_laki": 0.0
          }
        ],
        "cities": [
          {
            "name": "Kota Hồ Chí Minh, Vietnam",
            "pct": 3.7
          },
          {
            "name": "Daerah Khusus Ibukota Jakarta",
            "pct": 2.6
          },
          {
            "name": "Kejayan, Special Region of Yogyakarta",
            "pct": 2.5
          },
          {
            "name": "Ngaglik, Special Region of Yogyakarta",
            "pct": 1.8
          },
          {
            "name": "Kota Yogyakarta, Daerah Istimewa Yogyakarta",
            "pct": 1.7
          },
          {
            "name": "Kota Bekasi, Jawa Barat",
            "pct": 0.7
          },
          {
            "name": "Kota Semarang, Jawa Tengah",
            "pct": 0.6
          },
          {
            "name": "Berbah, Special Region of Yogyakarta",
            "pct": 0.5
          },
          {
            "name": "Bangkok, Thailand",
            "pct": 0.5
          },
          {
            "name": "Kota Surabaya, Jawa Timur",
            "pct": 0.5
          }
        ],
        "countries": [
          {
            "name": "Indonesia",
            "pct": 28.0
          },
          {
            "name": "Vietnam",
            "pct": 6.9
          },
          {
            "name": "Thailand",
            "pct": 1.4
          },
          {
            "name": "Turki",
            "pct": 1.3
          },
          {
            "name": "Argentina",
            "pct": 1.2
          },
          {
            "name": "Uzbekistan",
            "pct": 0.9
          },
          {
            "name": "India",
            "pct": 0.8
          },
          {
            "name": "Kazakhstan",
            "pct": 0.7
          },
          {
            "name": "Laos",
            "pct": 0.7
          },
          {
            "name": "Afrika Selatan",
            "pct": 0.6
          }
        ]
      },
      "potensial": {
        "age_gender": [
          {
            "age": "18-24",
            "Perempuan": 10.2,
            "Laki_laki": 9.4
          },
          {
            "age": "25-34",
            "Perempuan": 18.2,
            "Laki_laki": 18.8
          },
          {
            "age": "35-44",
            "Perempuan": 11.2,
            "Laki_laki": 12.3
          },
          {
            "age": "45-54",
            "Perempuan": 5.7,
            "Laki_laki": 6.5
          },
          {
            "age": "55-64",
            "Perempuan": 2.4,
            "Laki_laki": 2.8
          },
          {
            "age": "65+",
            "Perempuan": 1.0,
            "Laki_laki": 1.5
          }
        ],
        "cities": [
          {
            "name": "Jakarta, Indonesia",
            "pct": 6.99
          },
          {
            "name": "Bekasi",
            "pct": 2.25
          },
          {
            "name": "Bandung",
            "pct": 2.18
          },
          {
            "name": "Medan, Indonesia",
            "pct": 2.13
          },
          {
            "name": "Surabaya, Indonesia",
            "pct": 1.7
          },
          {
            "name": "Depok",
            "pct": 1.48
          },
          {
            "name": "Tangerang",
            "pct": 1.47
          },
          {
            "name": "Palembang",
            "pct": 1.22
          },
          {
            "name": "Makassar",
            "pct": 1.18
          },
          {
            "name": "Semarang, Indonesia",
            "pct": 1.12
          }
        ],
        "countries": [
          {
            "name": "Indonesia",
            "pct": 100.0
          }
        ]
      },
      "allTimeRangeLabel": "Sepanjang Masa: 4 Okt 2023 – 3 Nov 2026",
      "trenPemirsa": {
        "mengikuti": 13,
        "mengikutiDeltaLabel": "0% vs Sep",
        "batalMengikuti": 17,
        "batalDeltaLabel": "↑ 41,7% vs Sep",
        "netPengikut": -4,
        "kontakPesan": 3,
        "kontakDeltaLabel": "↑ 50,0% vs Sep",
        "totalPengikut": 1488,
        "periodText": "1 Okt 2026 – 31 Okt 2026"
      },
      "kontenPopuler": [
        {
          "rank": 1,
          "title": "We just had to join the trend 💃 #jogjalodge...",
          "overlay": "pov: ketika ketemu customer yang sefrekuensi",
          "date": "22 Oktober 20:46",
          "views": 1600,
          "viewsLabel": "1,6 rb",
          "likes": 22,
          "comments": 0,
          "shares": 4,
          "pilar": "Autentik / Tren Relatable"
        },
        {
          "rank": 2,
          "title": "Nikmat mana yang kau dustakan 🥺",
          "overlay": "beres mandi, perut kenyang, AC dingin, sprei baru, baju tidur wangi dan besoknya libur kerja",
          "date": "2 Oktober 23:13",
          "views": 275,
          "viewsLabel": "275",
          "likes": 5,
          "comments": 0,
          "shares": 0,
          "pilar": "Autentik / Kehidupan Kost"
        },
        {
          "rank": 3,
          "title": "Lemesin dulu sebelum lanjut bekerja 💃",
          "overlay": "pov: ngasih dorongan ke temen biar semangat kerja",
          "date": "17 Oktober 20:59",
          "views": 218,
          "viewsLabel": "218",
          "likes": 6,
          "comments": 0,
          "shares": 0,
          "pilar": "Autentik / Lifestyle"
        },
        {
          "rank": 4,
          "title": "Definisi kost rasa hotel berasa staycation...",
          "overlay": "Kost Ekslusif ✅",
          "date": "10 Oktober 23:09",
          "views": 174,
          "viewsLabel": "174",
          "likes": 5,
          "comments": 0,
          "shares": 0,
          "pilar": "Fasilitas Unggulan (Room Tour)"
        },
        {
          "rank": 5,
          "title": "**Comfort lives in every detail.** ✨...",
          "overlay": "pov: ngekost di kosan eksklusif service kebersihannya ga main-main",
          "date": "30 Oktober 08:11",
          "views": 110,
          "viewsLabel": "110",
          "likes": 7,
          "comments": 0,
          "shares": 0,
          "pilar": "Fasilitas Unggulan (Kebersihan)"
        }
      ],
      "presentFiles": [
        "tayangan.csv",
        "jangkauan.csv",
        "interaksi_konten.csv",
        "kunjungan.csv",
        "pengikut.csv",
        "klik_tautan.csv",
        "konten_populer.png",
        "demografi_pemirsa.csv",
        "tren_pemirsa.png",
        "pemirsa_potensial.csv"
      ],
      "missingFiles": []
    }
  },
  "tiktok": {
    "2026-09": {
      "available": false,
      "periodKey": "2026-09",
      "monthTitle": "September 2026",
      "periodLabel": "Belum Tersedia",
      "reason": "Data Referensi TikTok untuk periode September 2026 (data_referensi/tiktok/2026-09/) tidak tersedia.",
      "presentFiles": [],
      "missingFiles": [
        {
          "name": "overview.csv",
          "reason": "File periode September 2026 tidak tersedia di data_referensi/tiktok/2026-09/"
        },
        {
          "name": "trafic_source.png",
          "reason": "File periode September 2026 tidak tersedia di data_referensi/tiktok/2026-09/"
        },
        {
          "name": "search_queries.png",
          "reason": "File periode September 2026 tidak tersedia di data_referensi/tiktok/2026-09/"
        },
        {
          "name": "most_views.csv",
          "reason": "File periode September 2026 tidak tersedia di data_referensi/tiktok/2026-09/"
        },
        {
          "name": "most_new_viewers.csv",
          "reason": "File periode September 2026 tidak tersedia di data_referensi/tiktok/2026-09/"
        },
        {
          "name": "most_likes.csv",
          "reason": "File periode September 2026 tidak tersedia di data_referensi/tiktok/2026-09/"
        },
        {
          "name": "new_followers.csv",
          "reason": "File periode September 2026 tidak tersedia di data_referensi/tiktok/2026-09/"
        },
        {
          "name": "viewers.csv",
          "reason": "File periode September 2026 tidak tersedia di data_referensi/tiktok/2026-09/"
        },
        {
          "name": "creators_your_viewers_also_watched.png",
          "reason": "File periode September 2026 tidak tersedia di data_referensi/tiktok/2026-09/"
        },
        {
          "name": "viewers_gender_last_30.png",
          "reason": "File periode September 2026 tidak tersedia di data_referensi/tiktok/2026-09/"
        },
        {
          "name": "viewers_age_last_30.png",
          "reason": "File periode September 2026 tidak tersedia di data_referensi/tiktok/2026-09/"
        },
        {
          "name": "viewers_locations_last_30.png",
          "reason": "File periode September 2026 tidak tersedia di data_referensi/tiktok/2026-09/"
        },
        {
          "name": "posts_your_viewers_also_viewed.png",
          "reason": "File periode September 2026 tidak tersedia di data_referensi/tiktok/2026-09/"
        },
        {
          "name": "followers_activity.csv",
          "reason": "File periode September 2026 tidak tersedia di data_referensi/tiktok/2026-09/"
        },
        {
          "name": "followers_gender.csv",
          "reason": "File periode September 2026 tidak tersedia di data_referensi/tiktok/2026-09/"
        },
        {
          "name": "followers_history.csv",
          "reason": "File periode September 2026 tidak tersedia di data_referensi/tiktok/2026-09/"
        },
        {
          "name": "followers_top_teritories.csv",
          "reason": "File periode September 2026 tidak tersedia di data_referensi/tiktok/2026-09/"
        }
      ]
    },
    "2026-10": {
      "available": true,
      "periodKey": "2026-10",
      "monthTitle": "Oktober 2026",
      "periodLabel": "Rentang Bergulir 28 Hari (6 Okt – 2 Nov 2026)",
      "overview": [
        {
          "date": "October 6",
          "views": 108,
          "profileViews": 10,
          "likes": 1,
          "comments": 0,
          "shares": 0,
          "interactions": 1
        },
        {
          "date": "October 7",
          "views": 66,
          "profileViews": 5,
          "likes": 0,
          "comments": 0,
          "shares": 0,
          "interactions": 0
        },
        {
          "date": "October 8",
          "views": 71,
          "profileViews": 6,
          "likes": 1,
          "comments": 0,
          "shares": 0,
          "interactions": 1
        },
        {
          "date": "October 9",
          "views": 85,
          "profileViews": 4,
          "likes": 0,
          "comments": 0,
          "shares": 1,
          "interactions": 1
        },
        {
          "date": "October 10",
          "views": 221,
          "profileViews": 3,
          "likes": 2,
          "comments": 0,
          "shares": 0,
          "interactions": 2
        },
        {
          "date": "October 11",
          "views": 413,
          "profileViews": 6,
          "likes": 5,
          "comments": 0,
          "shares": 2,
          "interactions": 7
        },
        {
          "date": "October 12",
          "views": 61,
          "profileViews": 5,
          "likes": 0,
          "comments": 0,
          "shares": 0,
          "interactions": 0
        },
        {
          "date": "October 13",
          "views": 136,
          "profileViews": 6,
          "likes": 0,
          "comments": 0,
          "shares": 3,
          "interactions": 3
        },
        {
          "date": "October 14",
          "views": 66,
          "profileViews": 3,
          "likes": 0,
          "comments": 0,
          "shares": 1,
          "interactions": 1
        },
        {
          "date": "October 15",
          "views": 110,
          "profileViews": 6,
          "likes": 1,
          "comments": 0,
          "shares": 0,
          "interactions": 1
        },
        {
          "date": "October 16",
          "views": 95,
          "profileViews": 7,
          "likes": 0,
          "comments": 0,
          "shares": 2,
          "interactions": 2
        },
        {
          "date": "October 17",
          "views": 60,
          "profileViews": 2,
          "likes": 1,
          "comments": 0,
          "shares": 2,
          "interactions": 3
        },
        {
          "date": "October 18",
          "views": 116,
          "profileViews": 6,
          "likes": 2,
          "comments": 0,
          "shares": 2,
          "interactions": 4
        },
        {
          "date": "October 19",
          "views": 77,
          "profileViews": 2,
          "likes": 0,
          "comments": 0,
          "shares": 0,
          "interactions": 0
        },
        {
          "date": "October 20",
          "views": 57,
          "profileViews": 5,
          "likes": 0,
          "comments": 0,
          "shares": 0,
          "interactions": 0
        },
        {
          "date": "October 21",
          "views": 58,
          "profileViews": 4,
          "likes": 0,
          "comments": 0,
          "shares": 0,
          "interactions": 0
        },
        {
          "date": "October 22",
          "views": 796,
          "profileViews": 13,
          "likes": 11,
          "comments": 1,
          "shares": 1,
          "interactions": 13
        },
        {
          "date": "October 23",
          "views": 258,
          "profileViews": 15,
          "likes": 2,
          "comments": 0,
          "shares": 1,
          "interactions": 3
        },
        {
          "date": "October 24",
          "views": 213,
          "profileViews": 11,
          "likes": 1,
          "comments": 0,
          "shares": 1,
          "interactions": 2
        },
        {
          "date": "October 25",
          "views": 52,
          "profileViews": 2,
          "likes": 0,
          "comments": 0,
          "shares": 0,
          "interactions": 0
        },
        {
          "date": "October 26",
          "views": 131,
          "profileViews": 7,
          "likes": 4,
          "comments": 0,
          "shares": 1,
          "interactions": 5
        },
        {
          "date": "October 27",
          "views": 154,
          "profileViews": 15,
          "likes": 2,
          "comments": 0,
          "shares": 2,
          "interactions": 4
        },
        {
          "date": "October 28",
          "views": 133,
          "profileViews": 8,
          "likes": 1,
          "comments": 0,
          "shares": 2,
          "interactions": 3
        },
        {
          "date": "October 29",
          "views": 178,
          "profileViews": 9,
          "likes": 5,
          "comments": 0,
          "shares": 0,
          "interactions": 5
        },
        {
          "date": "October 30",
          "views": 70,
          "profileViews": 6,
          "likes": 0,
          "comments": 0,
          "shares": 0,
          "interactions": 0
        },
        {
          "date": "October 31",
          "views": 58,
          "profileViews": 2,
          "likes": 4,
          "comments": 0,
          "shares": 0,
          "interactions": 4
        },
        {
          "date": "November 1",
          "views": 147,
          "profileViews": 11,
          "likes": 2,
          "comments": 0,
          "shares": 3,
          "interactions": 5
        },
        {
          "date": "November 2",
          "views": 281,
          "profileViews": 11,
          "likes": 1,
          "comments": 0,
          "shares": 0,
          "interactions": 1
        }
      ],
      "viewers": [
        {
          "date": "October 7",
          "total": 52,
          "newViewers": 37,
          "returning": 15
        },
        {
          "date": "October 8",
          "total": 39,
          "newViewers": 30,
          "returning": 9
        },
        {
          "date": "October 9",
          "total": 43,
          "newViewers": 36,
          "returning": 7
        },
        {
          "date": "October 10",
          "total": 34,
          "newViewers": 23,
          "returning": 11
        },
        {
          "date": "October 11",
          "total": 182,
          "newViewers": 143,
          "returning": 39
        },
        {
          "date": "October 12",
          "total": 319,
          "newViewers": 274,
          "returning": 45
        },
        {
          "date": "October 13",
          "total": 40,
          "newViewers": 32,
          "returning": 8
        },
        {
          "date": "October 14",
          "total": 49,
          "newViewers": 34,
          "returning": 15
        },
        {
          "date": "October 15",
          "total": 36,
          "newViewers": 24,
          "returning": 12
        },
        {
          "date": "October 16",
          "total": 48,
          "newViewers": 38,
          "returning": 10
        },
        {
          "date": "October 17",
          "total": 39,
          "newViewers": 28,
          "returning": 11
        },
        {
          "date": "October 18",
          "total": 38,
          "newViewers": 27,
          "returning": 11
        },
        {
          "date": "October 19",
          "total": 57,
          "newViewers": 41,
          "returning": 16
        },
        {
          "date": "October 20",
          "total": 38,
          "newViewers": 30,
          "returning": 8
        },
        {
          "date": "October 21",
          "total": 36,
          "newViewers": 23,
          "returning": 13
        },
        {
          "date": "October 22",
          "total": 33,
          "newViewers": 20,
          "returning": 13
        },
        {
          "date": "October 23",
          "total": 670,
          "newViewers": 612,
          "returning": 58
        },
        {
          "date": "October 24",
          "total": 198,
          "newViewers": 166,
          "returning": 32
        },
        {
          "date": "October 25",
          "total": 117,
          "newViewers": 96,
          "returning": 21
        },
        {
          "date": "October 26",
          "total": 40,
          "newViewers": 32,
          "returning": 8
        },
        {
          "date": "October 27",
          "total": 71,
          "newViewers": 53,
          "returning": 18
        },
        {
          "date": "October 28",
          "total": 69,
          "newViewers": 42,
          "returning": 27
        },
        {
          "date": "October 29",
          "total": 72,
          "newViewers": 52,
          "returning": 20
        },
        {
          "date": "October 30",
          "total": 40,
          "newViewers": 27,
          "returning": 13
        },
        {
          "date": "October 31",
          "total": 32,
          "newViewers": 18,
          "returning": 14
        },
        {
          "date": "November 1",
          "total": 41,
          "newViewers": 25,
          "returning": 16
        },
        {
          "date": "November 2",
          "total": 75,
          "newViewers": 59,
          "returning": 16
        }
      ],
      "trafficSource": [
        {
          "source": "Search (Pencarian TikTok)",
          "rawName": "Search",
          "pct": 42.0
        },
        {
          "source": "Personal Profile (Kunjungan Profil)",
          "rawName": "Personal profile",
          "pct": 35.9
        },
        {
          "source": "For You (FYP)",
          "rawName": "For You",
          "pct": 22.2
        },
        {
          "source": "Following (Tab Mengikuti)",
          "rawName": "Following",
          "pct": 0.0
        },
        {
          "source": "Sound (Halaman Audio)",
          "rawName": "Sound",
          "pct": 0.0
        }
      ],
      "searchQueries": [
        {
          "query": "rukita kalani jogja",
          "pct": 0.1,
          "intent": "Kompetitor Langsung (Rukita)"
        },
        {
          "query": "Akun kost hoax jogja",
          "pct": 0.1,
          "intent": "Keamanan / Verifikasi Kost Asli"
        },
        {
          "query": "kos kosan jogja deket gym",
          "pct": 0.1,
          "intent": "Fasilitas Gym / Gaya Hidup"
        },
        {
          "query": "kos exclusive jogja sidoarum",
          "pct": 0.1,
          "intent": "Pencarian Kost Eksklusif Area Jogja"
        },
        {
          "query": "perbedaan kost exclusive dan biasa",
          "pct": 0.1,
          "intent": "Edukasi / Perbandingan Kost"
        }
      ],
      "topPosts": {
        "most_views": [
          {
            "exportTime": "November 4",
            "title": "Join the trend💃 #kosteksklusifjogja #kostjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7699489085324496135",
            "videoId": "7699489085324496135",
            "postTime": "October 22",
            "likes": 14,
            "comments": 1,
            "shares": 2,
            "views": 1233,
            "isCurrentMonth": true
          },
          {
            "exportTime": "November 4",
            "title": "Jogjalodge udah kayak hotel banget kan? cek link bio buat cobain kost rasa hotel ini #kost #kostjogja #jogja #jogja24jam #kosteksklusif #kosteksklusifjogja #infokostjogja #infokosjogja #fyp #fypシ #fypシ゚viral #foryou #foryoupage #foryourpage #edit #taylorswift #infokostdankontrakjogja #infokostdankontrakanjogja #infokostdankontrakan #kostdijogja #galerikostjogja #jogjakost #infokostjogja #penginapanjogja #wisatajogja #wisatajogjahits #kontrakanjogja #kostjogjaeksklusif #kostjogjaperbulan #kostdijogja #yogya #yogyakarta #yogyakartaistimewa #explorejogja #kostjogjaputra #kostjogjaputri #jogjakarta #jogjaistimewa #jogjakartaid #kostanjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7430429840081210631",
            "videoId": "7430429840081210631",
            "postTime": "October 27",
            "likes": 1102,
            "comments": 6,
            "shares": 437,
            "views": 70566,
            "isCurrentMonth": true
          },
          {
            "exportTime": "November 4",
            "title": "Definisi kost rasa hotel berasa staycation setiap hari😍 #kostjogja #kosteksklusifjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7695072579954035976",
            "videoId": "7695072579954035976",
            "postTime": "October 10",
            "likes": 7,
            "comments": 0,
            "shares": 1,
            "views": 596,
            "isCurrentMonth": true
          },
          {
            "exportTime": "November 4",
            "title": "Nikmati Kemewahan Tinggal di Tengah Kota Jogja dengan Jogja Lodge – Kost Eksklusif yang Hadirkan Kenyamanan Seperti Rumah Sendiri! ✨ Dengan fasilitas lengkap mulai dari kamar pribadi berdesain modern, akses Wi-Fi super cepat, area parkir aman, hingga kolam renang dan ruang fitness yang terawat dengan baik. Lokasi strategis dekat dengan pusat bisnis, kampus ternama, dan destinasi wisata ikonik Jogja. Pengalaman tinggal berkualitas tanpa harus khawatir tentang kelengkapan fasilitas – itu yang kami tawarkan untukmu di Jogja Lodge. 📞 Hubungi kami sekarang untuk reservasi dan kunjungan lokasi! CP: 0821 3667 7730 #JogjaLodge #kosteksklusif #kostpremiumjogja #foryou #fyp",
            "link": "https://www.tiktok.com/@jogjalodge/video/7615824613490134290",
            "videoId": "7615824613490134290",
            "postTime": "March 11",
            "likes": 19,
            "comments": 1,
            "shares": 6,
            "views": 2499,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Kos eksklusif di Jogja yang jaraknya cuma 5 Menit dari Pakuwon Mall! #kost #kostjogja #jogja #jogja24jam #kosteksklusif #kosteksklusifjogja #infokostjogja #infokosjogja #fyp #fypシ #fypシ゚viral #foryou #foryoupage #foryourpage #edit #taylorswift #infokostdankontrakjogja #infokostdankontrakanjogja #infokostdankontrakan #kostdijogja #galerikostjogja #jogjakost #infokostjogja #penginapanjogja #wisatajogja #wisatajogjahits #kontrakanjogja #kostjogjaeksklusif #kostjogjaperbulan #kostdijogja #yogya #yogyakarta #yogyakartaistimewa #explorejogja #kostjogjaputra #kostjogjaputri #jogjakarta #jogjaistimewa #jogjakartaid #kostanjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7395219776416550150",
            "videoId": "7395219776416550150",
            "postTime": "July 24",
            "likes": 2640,
            "comments": 14,
            "shares": 732,
            "views": 120246,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Nikmati Kemewahan Tinggal di Tengah Kota Jogja dengan Jogja Lodge – Kost Eksklusif yang Hadirkan Kenyamanan Seperti Rumah Sendiri! ✨ Dengan fasilitas lengkap mulai dari kamar pribadi berdesain modern, akses Wi-Fi , area parkir aman, Lokasi strategis dekat dengan pusat bisnis, kampus ternama, dan destinasi wisata ikonik Jogja. Pengalaman tinggal berkualitas tanpa harus khawatir tentang kelengkapan fasilitas – itu yang kami tawarkan untukmu di Jogja Lodge. 📞 Hubungi kami sekarang untuk reservasi dan kunjungan lokasi! cp : 0821 3667 7730 #JogjaLodge #KostEksklusifJogja #kostjogja #kostpremiumjogja #kosteksklusif",
            "link": "https://www.tiktok.com/@jogjalodge/video/7613682474673130759",
            "videoId": "7613682474673130759",
            "postTime": "March 5",
            "likes": 30,
            "comments": 4,
            "shares": 16,
            "views": 2495,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "kalian pilih tipe yang mana nih ? 😁#kostjogja #bcaxyz #infokost #tiktoktrending #kosteksklusif #kostharian #yogyakarta",
            "link": "https://www.tiktok.com/@jogjalodge/video/7268628728769563910",
            "videoId": "7268628728769563910",
            "postTime": "August 18",
            "likes": 759,
            "comments": 35,
            "shares": 231,
            "views": 57900,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Belum makan kalau belum selesai 😌 #kostjogja #kosteksklusifjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7689480137234025746",
            "videoId": "7689480137234025746",
            "postTime": "September 25",
            "likes": 8,
            "comments": 0,
            "shares": 0,
            "views": 759,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Hati-Hati Penipuan! Jangan Sampai Tertipu Saat Cari Kost! Belakangan ini banyak yang ketipu akun palsu ngaku-ngaku Jogja Lodge. Jangan sampai kamu jadi korban juga! #penipuanonline #fyp #foryourpage #moduspenipuan #fraud #scam #hatihatipenipuan#waspadapenipuan #KostEksklusif #JogjaLodge #StaySafe #AnakKost",
            "link": "https://www.tiktok.com/@jogjalodge/video/7453079640949656838",
            "videoId": "7453079640949656838",
            "postTime": "December 27",
            "likes": 21,
            "comments": 2,
            "shares": 9,
            "views": 2984,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "The real a place to call home ❤️✨",
            "link": "https://www.tiktok.com/@jogjalodge/video/7681355644296858898",
            "videoId": "7681355644296858898",
            "postTime": "September 4",
            "likes": 9,
            "comments": 0,
            "shares": 1,
            "views": 525,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Dear future me, semoga nanti punya rumah senyaman ini. 🥹 Untuk sekarang, menikmati satu hari di sini dulu. Bangun dengan tenang. Punya ruang sendiri. Bisa fokus kerja. Bisa istirahat dengan nyaman. Dan yang paling penting… betah untuk pulang. Maybe this is what “A Place to Call Home” feels like. 🏡✨",
            "link": "https://www.tiktok.com/@jogjalodge/video/7686848504819354888",
            "videoId": "7686848504819354888",
            "postTime": "September 18",
            "likes": 7,
            "comments": 0,
            "shares": 0,
            "views": 568,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Your room. Your comfort. Your home. 🤍 Temukan pengalaman tinggal yang lebih nyaman di **VIP Room** kami. Karena rumah bukan hanya tentang tempat, tapi tentang bagaimana kamu merasa di dalamnya. **A place to call home.** ✨ Info reservasi ada di WEBSITE kami yang ada di bio 💬 Or simply DM us on Instagram.",
            "link": "https://www.tiktok.com/@jogjalodge/video/7683567090694982920",
            "videoId": "7683567090694982920",
            "postTime": "September 9",
            "likes": 13,
            "comments": 1,
            "shares": 2,
            "views": 404,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Kost eksklusif JogjaLodge dengan segala fasilitas ala hotel emang jadi tempat yang paling cocok deh buat liburan! #kost #kostjogja #jogja #jogja24jam #kosteksklusif #kosteksklusifjogja #infokostjogja #infokosjogja #fyp #fypシ #fypシ゚viral #foryou #foryoupage #foryourpage #edit #taylorswift #infokostdankontrakjogja #infokostdankontrakanjogja #infokostdankontrakan #kostdijogja #galerikostjogja #jogjakost #infokostjogja #penginapanjogja #wisatajogja #wisatajogjahits #kontrakanjogja #kostjogjaeksklusif #kostjogjaperbulan #kostdijogja #yogya #yogyakarta #yogyakartaistimewa #explorejogja #kostjogjaputra #kostjogjaputri #jogjakarta #jogjaistimewa #jogjakartaid #kostanjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7373705600179506438",
            "videoId": "7373705600179506438",
            "postTime": "May 27",
            "likes": 1035,
            "comments": 15,
            "shares": 202,
            "views": 41369,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Note : Khusus tipe VIP, tersedia kitchen untuk menyiapkan atau menyimpan makanan yang sudah matang. Jadi gimana guys? Mau ngerasain kenyamanan kost eksklusif di JOGJA LODGE? Jangan tunda-tunda lagi! Klik link di bio atau hubungi kita sekarang yaa~😎🏡✨ #kostanjogja #jogjakartaid #jogjaistimewa #jogjakarta #kostjogjaputri #kostjogjaputra #explorejogja #yogyakartaistimewa #yogyakarta #yogya #kostdijogja #kostjogjaperbulan #kostjogjaeksklusif #kontrakanjogja #fyp #fypシ #fypage #fyppppppppppppppppppppppp #infokostdankontrakanjogja #infokostdankontrakjogja #jogja24jam #edit #kost #wisatajogja #penginapanjogjamurah #galerikostjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7307248794637176070",
            "videoId": "7307248794637176070",
            "postTime": "November 30",
            "likes": 579,
            "comments": 16,
            "shares": 122,
            "views": 44108,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Kena tipu kost palsu itu makin sering terjadi, apalagi kalau cari lewat online. Biar aman, kamu harus lebih “curiga sehat” sebelum deal. Ini tips pentingnya 👇 🔍 1. Jangan percaya harga terlalu murah Kalau harga kost jauh di bawah pasaran, itu red flag. Penipu biasanya pakai harga “nggak masuk akal” biar kamu buru-buru transfer. 📸 2. Cek foto kost Reverse image di Google (biar tahu foto hasil curian atau asli) Kalau fotonya terlalu “perfect” seperti hotel, patut dicurigai 📍 3. Minta alamat lengkap & cek lokasi Cari di Google Maps, lihat apakah bangunan itu benar ada Cocokkan dengan lingkungan sekitar (jalan, warung, dll) 📞 4. Wajib video call / survey langsung Minta video call lihat kamar secara real Kalau bisa, datang langsung ke lokasi sebelum bayar 💸 5. Jangan transfer sebelum yakin Hindari DP kalau belum lihat tempat Jangan transfer ke rekening pribadi yang mencurigakan 🪪 6. Minta identitas pemilik Tanyakan KTP atau bukti kepemilikan Cocokkan nama dengan rekening tujuan 🚨 7. Waspada modus “diburu orang lain” Kalimat seperti: “Banyak yang minat, transfer sekarang ya biar aman” Itu trik klasik biar kamu panik dan langsung bayar. ⭐ 8. Cari review atau testimoni Kalau dari platform seperti: OLX Facebook Marketplace Mamikos 👉 Cek komentar atau ratingnya 🔐 9. Pilih platform terpercaya Lebih aman cari kost lewat aplikasi yang sudah punya sistem verifikasi, seperti Mamikos, dibanding transaksi langsung via chat pribadi. ⚠️ 10. Percaya insting kamu Kalau ada yang terasa “aneh”, mending batalin. Lebih baik kehilangan kost daripada kehilangan uang. #kost #jogjalodge #kosteksklusif #jogja #kostjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7618121639611419924",
            "videoId": "7618121639611419924",
            "postTime": "March 17",
            "likes": 5,
            "comments": 0,
            "shares": 0,
            "views": 681,
            "isCurrentMonth": false
          }
        ],
        "most_new_viewers": [
          {
            "exportTime": "November 4",
            "title": "Join the trend💃 #kosteksklusifjogja #kostjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7699489085324496135",
            "videoId": "7699489085324496135",
            "postTime": "October 22",
            "likes": 14,
            "comments": 1,
            "shares": 2,
            "views": 1233,
            "isCurrentMonth": true
          },
          {
            "exportTime": "November 4",
            "title": "Jogjalodge udah kayak hotel banget kan? cek link bio buat cobain kost rasa hotel ini #kost #kostjogja #jogja #jogja24jam #kosteksklusif #kosteksklusifjogja #infokostjogja #infokosjogja #fyp #fypシ #fypシ゚viral #foryou #foryoupage #foryourpage #edit #taylorswift #infokostdankontrakjogja #infokostdankontrakanjogja #infokostdankontrakan #kostdijogja #galerikostjogja #jogjakost #infokostjogja #penginapanjogja #wisatajogja #wisatajogjahits #kontrakanjogja #kostjogjaeksklusif #kostjogjaperbulan #kostdijogja #yogya #yogyakarta #yogyakartaistimewa #explorejogja #kostjogjaputra #kostjogjaputri #jogjakarta #jogjaistimewa #jogjakartaid #kostanjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7430429840081210631",
            "videoId": "7430429840081210631",
            "postTime": "October 27",
            "likes": 1102,
            "comments": 6,
            "shares": 437,
            "views": 70567,
            "isCurrentMonth": true
          },
          {
            "exportTime": "November 4",
            "title": "Definisi kost rasa hotel berasa staycation setiap hari😍 #kostjogja #kosteksklusifjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7695072579954035976",
            "videoId": "7695072579954035976",
            "postTime": "October 10",
            "likes": 7,
            "comments": 0,
            "shares": 1,
            "views": 596,
            "isCurrentMonth": true
          },
          {
            "exportTime": "November 4",
            "title": "Nikmati Kemewahan Tinggal di Tengah Kota Jogja dengan Jogja Lodge – Kost Eksklusif yang Hadirkan Kenyamanan Seperti Rumah Sendiri! ✨ Dengan fasilitas lengkap mulai dari kamar pribadi berdesain modern, akses Wi-Fi super cepat, area parkir aman, hingga kolam renang dan ruang fitness yang terawat dengan baik. Lokasi strategis dekat dengan pusat bisnis, kampus ternama, dan destinasi wisata ikonik Jogja. Pengalaman tinggal berkualitas tanpa harus khawatir tentang kelengkapan fasilitas – itu yang kami tawarkan untukmu di Jogja Lodge. 📞 Hubungi kami sekarang untuk reservasi dan kunjungan lokasi! CP: 0821 3667 7730 #JogjaLodge #kosteksklusif #kostpremiumjogja #foryou #fyp",
            "link": "https://www.tiktok.com/@jogjalodge/video/7615824613490134290",
            "videoId": "7615824613490134290",
            "postTime": "March 11",
            "likes": 19,
            "comments": 1,
            "shares": 6,
            "views": 2499,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Kos eksklusif di Jogja yang jaraknya cuma 5 Menit dari Pakuwon Mall! #kost #kostjogja #jogja #jogja24jam #kosteksklusif #kosteksklusifjogja #infokostjogja #infokosjogja #fyp #fypシ #fypシ゚viral #foryou #foryoupage #foryourpage #edit #taylorswift #infokostdankontrakjogja #infokostdankontrakanjogja #infokostdankontrakan #kostdijogja #galerikostjogja #jogjakost #infokostjogja #penginapanjogja #wisatajogja #wisatajogjahits #kontrakanjogja #kostjogjaeksklusif #kostjogjaperbulan #kostdijogja #yogya #yogyakarta #yogyakartaistimewa #explorejogja #kostjogjaputra #kostjogjaputri #jogjakarta #jogjaistimewa #jogjakartaid #kostanjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7395219776416550150",
            "videoId": "7395219776416550150",
            "postTime": "July 24",
            "likes": 2640,
            "comments": 14,
            "shares": 732,
            "views": 120246,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Nikmati Kemewahan Tinggal di Tengah Kota Jogja dengan Jogja Lodge – Kost Eksklusif yang Hadirkan Kenyamanan Seperti Rumah Sendiri! ✨ Dengan fasilitas lengkap mulai dari kamar pribadi berdesain modern, akses Wi-Fi , area parkir aman, Lokasi strategis dekat dengan pusat bisnis, kampus ternama, dan destinasi wisata ikonik Jogja. Pengalaman tinggal berkualitas tanpa harus khawatir tentang kelengkapan fasilitas – itu yang kami tawarkan untukmu di Jogja Lodge. 📞 Hubungi kami sekarang untuk reservasi dan kunjungan lokasi! cp : 0821 3667 7730 #JogjaLodge #KostEksklusifJogja #kostjogja #kostpremiumjogja #kosteksklusif",
            "link": "https://www.tiktok.com/@jogjalodge/video/7613682474673130759",
            "videoId": "7613682474673130759",
            "postTime": "March 5",
            "likes": 30,
            "comments": 4,
            "shares": 16,
            "views": 2495,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "kalian pilih tipe yang mana nih ? 😁#kostjogja #bcaxyz #infokost #tiktoktrending #kosteksklusif #kostharian #yogyakarta",
            "link": "https://www.tiktok.com/@jogjalodge/video/7268628728769563910",
            "videoId": "7268628728769563910",
            "postTime": "August 18",
            "likes": 759,
            "comments": 35,
            "shares": 231,
            "views": 57900,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Belum makan kalau belum selesai 😌 #kostjogja #kosteksklusifjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7689480137234025746",
            "videoId": "7689480137234025746",
            "postTime": "September 25",
            "likes": 8,
            "comments": 0,
            "shares": 0,
            "views": 759,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Dear future me, semoga nanti punya rumah senyaman ini. 🥹 Untuk sekarang, menikmati satu hari di sini dulu. Bangun dengan tenang. Punya ruang sendiri. Bisa fokus kerja. Bisa istirahat dengan nyaman. Dan yang paling penting… betah untuk pulang. Maybe this is what “A Place to Call Home” feels like. 🏡✨",
            "link": "https://www.tiktok.com/@jogjalodge/video/7686848504819354888",
            "videoId": "7686848504819354888",
            "postTime": "September 18",
            "likes": 7,
            "comments": 0,
            "shares": 0,
            "views": 568,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Note : Khusus tipe VIP, tersedia kitchen untuk menyiapkan atau menyimpan makanan yang sudah matang. Jadi gimana guys? Mau ngerasain kenyamanan kost eksklusif di JOGJA LODGE? Jangan tunda-tunda lagi! Klik link di bio atau hubungi kita sekarang yaa~😎🏡✨ #kostanjogja #jogjakartaid #jogjaistimewa #jogjakarta #kostjogjaputri #kostjogjaputra #explorejogja #yogyakartaistimewa #yogyakarta #yogya #kostdijogja #kostjogjaperbulan #kostjogjaeksklusif #kontrakanjogja #fyp #fypシ #fypage #fyppppppppppppppppppppppp #infokostdankontrakanjogja #infokostdankontrakjogja #jogja24jam #edit #kost #wisatajogja #penginapanjogjamurah #galerikostjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7307248794637176070",
            "videoId": "7307248794637176070",
            "postTime": "November 30",
            "likes": 579,
            "comments": 16,
            "shares": 122,
            "views": 44108,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Hati-Hati Penipuan! Jangan Sampai Tertipu Saat Cari Kost! Belakangan ini banyak yang ketipu akun palsu ngaku-ngaku Jogja Lodge. Jangan sampai kamu jadi korban juga! #penipuanonline #fyp #foryourpage #moduspenipuan #fraud #scam #hatihatipenipuan#waspadapenipuan #KostEksklusif #JogjaLodge #StaySafe #AnakKost",
            "link": "https://www.tiktok.com/@jogjalodge/video/7453079640949656838",
            "videoId": "7453079640949656838",
            "postTime": "December 27",
            "likes": 21,
            "comments": 2,
            "shares": 9,
            "views": 2984,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "The real a place to call home ❤️✨",
            "link": "https://www.tiktok.com/@jogjalodge/video/7681355644296858898",
            "videoId": "7681355644296858898",
            "postTime": "September 4",
            "likes": 9,
            "comments": 0,
            "shares": 1,
            "views": 525,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Kena tipu kost palsu itu makin sering terjadi, apalagi kalau cari lewat online. Biar aman, kamu harus lebih “curiga sehat” sebelum deal. Ini tips pentingnya 👇 🔍 1. Jangan percaya harga terlalu murah Kalau harga kost jauh di bawah pasaran, itu red flag. Penipu biasanya pakai harga “nggak masuk akal” biar kamu buru-buru transfer. 📸 2. Cek foto kost Reverse image di Google (biar tahu foto hasil curian atau asli) Kalau fotonya terlalu “perfect” seperti hotel, patut dicurigai 📍 3. Minta alamat lengkap & cek lokasi Cari di Google Maps, lihat apakah bangunan itu benar ada Cocokkan dengan lingkungan sekitar (jalan, warung, dll) 📞 4. Wajib video call / survey langsung Minta video call lihat kamar secara real Kalau bisa, datang langsung ke lokasi sebelum bayar 💸 5. Jangan transfer sebelum yakin Hindari DP kalau belum lihat tempat Jangan transfer ke rekening pribadi yang mencurigakan 🪪 6. Minta identitas pemilik Tanyakan KTP atau bukti kepemilikan Cocokkan nama dengan rekening tujuan 🚨 7. Waspada modus “diburu orang lain” Kalimat seperti: “Banyak yang minat, transfer sekarang ya biar aman” Itu trik klasik biar kamu panik dan langsung bayar. ⭐ 8. Cari review atau testimoni Kalau dari platform seperti: OLX Facebook Marketplace Mamikos 👉 Cek komentar atau ratingnya 🔐 9. Pilih platform terpercaya Lebih aman cari kost lewat aplikasi yang sudah punya sistem verifikasi, seperti Mamikos, dibanding transaksi langsung via chat pribadi. ⚠️ 10. Percaya insting kamu Kalau ada yang terasa “aneh”, mending batalin. Lebih baik kehilangan kost daripada kehilangan uang. #kost #jogjalodge #kosteksklusif #jogja #kostjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7618121639611419924",
            "videoId": "7618121639611419924",
            "postTime": "March 17",
            "likes": 5,
            "comments": 0,
            "shares": 0,
            "views": 681,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Your room. Your comfort. Your home. 🤍 Temukan pengalaman tinggal yang lebih nyaman di **VIP Room** kami. Karena rumah bukan hanya tentang tempat, tapi tentang bagaimana kamu merasa di dalamnya. **A place to call home.** ✨ Info reservasi ada di WEBSITE kami yang ada di bio 💬 Or simply DM us on Instagram.",
            "link": "https://www.tiktok.com/@jogjalodge/video/7683567090694982920",
            "videoId": "7683567090694982920",
            "postTime": "September 9",
            "likes": 13,
            "comments": 1,
            "shares": 2,
            "views": 404,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Kost eksklusif JogjaLodge dengan segala fasilitas ala hotel emang jadi tempat yang paling cocok deh buat liburan! #kost #kostjogja #jogja #jogja24jam #kosteksklusif #kosteksklusifjogja #infokostjogja #infokosjogja #fyp #fypシ #fypシ゚viral #foryou #foryoupage #foryourpage #edit #taylorswift #infokostdankontrakjogja #infokostdankontrakanjogja #infokostdankontrakan #kostdijogja #galerikostjogja #jogjakost #infokostjogja #penginapanjogja #wisatajogja #wisatajogjahits #kontrakanjogja #kostjogjaeksklusif #kostjogjaperbulan #kostdijogja #yogya #yogyakarta #yogyakartaistimewa #explorejogja #kostjogjaputra #kostjogjaputri #jogjakarta #jogjaistimewa #jogjakartaid #kostanjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7373705600179506438",
            "videoId": "7373705600179506438",
            "postTime": "May 27",
            "likes": 1035,
            "comments": 15,
            "shares": 202,
            "views": 41369,
            "isCurrentMonth": false
          }
        ],
        "most_likes": [
          {
            "exportTime": "November 4",
            "title": "Join the trend💃 #kosteksklusifjogja #kostjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7699489085324496135",
            "videoId": "7699489085324496135",
            "postTime": "October 22",
            "likes": 14,
            "comments": 1,
            "shares": 2,
            "views": 1233,
            "isCurrentMonth": true
          },
          {
            "exportTime": "November 4",
            "title": "Jogjalodge udah kayak hotel banget kan? cek link bio buat cobain kost rasa hotel ini #kost #kostjogja #jogja #jogja24jam #kosteksklusif #kosteksklusifjogja #infokostjogja #infokosjogja #fyp #fypシ #fypシ゚viral #foryou #foryoupage #foryourpage #edit #taylorswift #infokostdankontrakjogja #infokostdankontrakanjogja #infokostdankontrakan #kostdijogja #galerikostjogja #jogjakost #infokostjogja #penginapanjogja #wisatajogja #wisatajogjahits #kontrakanjogja #kostjogjaeksklusif #kostjogjaperbulan #kostdijogja #yogya #yogyakarta #yogyakartaistimewa #explorejogja #kostjogjaputra #kostjogjaputri #jogjakarta #jogjaistimewa #jogjakartaid #kostanjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7430429840081210631",
            "videoId": "7430429840081210631",
            "postTime": "October 27",
            "likes": 1102,
            "comments": 6,
            "shares": 437,
            "views": 70567,
            "isCurrentMonth": true
          },
          {
            "exportTime": "November 4",
            "title": "Definisi kost rasa hotel berasa staycation setiap hari😍 #kostjogja #kosteksklusifjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7695072579954035976",
            "videoId": "7695072579954035976",
            "postTime": "October 10",
            "likes": 7,
            "comments": 0,
            "shares": 1,
            "views": 596,
            "isCurrentMonth": true
          },
          {
            "exportTime": "November 4",
            "title": "kalian pilih tipe yang mana nih ? 😁#kostjogja #bcaxyz #infokost #tiktoktrending #kosteksklusif #kostharian #yogyakarta",
            "link": "https://www.tiktok.com/@jogjalodge/video/7268628728769563910",
            "videoId": "7268628728769563910",
            "postTime": "August 18",
            "likes": 759,
            "comments": 35,
            "shares": 231,
            "views": 57900,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Mau tinggal lama tapi tetap mewah & cozy? Yuk intip kamar Deluxe bulanan Jogja Lodge. 😉 #promomakanmerdeka #AnakRantau #fyp #KostRasaHotel #kostjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7539719915272424712",
            "videoId": "7539719915272424712",
            "postTime": "August 18",
            "likes": 16,
            "comments": 0,
            "shares": 6,
            "views": 633,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Kos eksklusif di Jogja yang jaraknya cuma 5 Menit dari Pakuwon Mall! #kost #kostjogja #jogja #jogja24jam #kosteksklusif #kosteksklusifjogja #infokostjogja #infokosjogja #fyp #fypシ #fypシ゚viral #foryou #foryoupage #foryourpage #edit #taylorswift #infokostdankontrakjogja #infokostdankontrakanjogja #infokostdankontrakan #kostdijogja #galerikostjogja #jogjakost #infokostjogja #penginapanjogja #wisatajogja #wisatajogjahits #kontrakanjogja #kostjogjaeksklusif #kostjogjaperbulan #kostdijogja #yogya #yogyakarta #yogyakartaistimewa #explorejogja #kostjogjaputra #kostjogjaputri #jogjakarta #jogjaistimewa #jogjakartaid #kostanjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7395219776416550150",
            "videoId": "7395219776416550150",
            "postTime": "July 24",
            "likes": 2640,
            "comments": 14,
            "shares": 732,
            "views": 120246,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Your room. Your comfort. Your home. 🤍 Temukan pengalaman tinggal yang lebih nyaman di **VIP Room** kami. Karena rumah bukan hanya tentang tempat, tapi tentang bagaimana kamu merasa di dalamnya. **A place to call home.** ✨ Info reservasi ada di WEBSITE kami yang ada di bio 💬 Or simply DM us on Instagram.",
            "link": "https://www.tiktok.com/@jogjalodge/video/7683567090694982920",
            "videoId": "7683567090694982920",
            "postTime": "September 9",
            "likes": 13,
            "comments": 1,
            "shares": 2,
            "views": 404,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Nikmati Kemewahan Tinggal di Tengah Kota Jogja dengan Jogja Lodge – Kost Eksklusif yang Hadirkan Kenyamanan Seperti Rumah Sendiri! ✨ Dengan fasilitas lengkap mulai dari kamar pribadi berdesain modern, akses Wi-Fi super cepat, area parkir aman, hingga kolam renang dan ruang fitness yang terawat dengan baik. Lokasi strategis dekat dengan pusat bisnis, kampus ternama, dan destinasi wisata ikonik Jogja. Pengalaman tinggal berkualitas tanpa harus khawatir tentang kelengkapan fasilitas – itu yang kami tawarkan untukmu di Jogja Lodge. 📞 Hubungi kami sekarang untuk reservasi dan kunjungan lokasi! CP: 0821 3667 7730 #JogjaLodge #kosteksklusif #kostpremiumjogja #foryou #fyp",
            "link": "https://www.tiktok.com/@jogjalodge/video/7615824613490134290",
            "videoId": "7615824613490134290",
            "postTime": "March 11",
            "likes": 19,
            "comments": 1,
            "shares": 6,
            "views": 2499,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Room Tour kamar standar, jangan skip videonya, biar tau fasilitasnya ya gaes 😉 #promomakanmerdeka #kostjogja #KostRasaHotel #fyp #AnakRantau",
            "link": "https://www.tiktok.com/@jogjalodge/video/7539022280643382546",
            "videoId": "7539022280643382546",
            "postTime": "August 16",
            "likes": 33,
            "comments": 0,
            "shares": 4,
            "views": 1085,
            "isCurrentMonth": false
          },
          {
            "exportTime": "November 4",
            "title": "Room Tour kamar VIP jogja lodge ✨#promomakanmerdeka #AnakRantau #fyp #KostRasaHotel #kostjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7537917637553048850",
            "videoId": "7537917637553048850",
            "postTime": "August 13",
            "likes": 10,
            "comments": 0,
            "shares": 8,
            "views": 621,
            "isCurrentMonth": false
          }
        ],
        "new_followers": [
          {
            "exportTime": "November 4",
            "title": "Join the trend💃 #kosteksklusifjogja #kostjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7699489085324496135",
            "videoId": "7699489085324496135",
            "postTime": "October 22",
            "likes": 14,
            "comments": 1,
            "shares": 2,
            "views": 1233,
            "isCurrentMonth": true
          },
          {
            "exportTime": "November 4",
            "title": "Definisi kost rasa hotel berasa staycation setiap hari😍 #kostjogja #kosteksklusifjogja",
            "link": "https://www.tiktok.com/@jogjalodge/video/7695072579954035976",
            "videoId": "7695072579954035976",
            "postTime": "October 10",
            "likes": 7,
            "comments": 0,
            "shares": 1,
            "views": 596,
            "isCurrentMonth": true
          },
          {
            "exportTime": "November 4",
            "title": "kalian pilih tipe yang mana nih ? 😁#kostjogja #bcaxyz #infokost #tiktoktrending #kosteksklusif #kostharian #yogyakarta",
            "link": "https://www.tiktok.com/@jogjalodge/video/7268628728769563910",
            "videoId": "7268628728769563910",
            "postTime": "August 18",
            "likes": 759,
            "comments": 35,
            "shares": 231,
            "views": 57900,
            "isCurrentMonth": false
          }
        ]
      },
      "viewersDemographics": {
        "gender": [
          {
            "label": "Perempuan (Female)",
            "pct": 68.0
          },
          {
            "label": "Laki-laki (Male)",
            "pct": 32.0
          },
          {
            "label": "Lainnya (Other)",
            "pct": 0.0
          }
        ],
        "age": [
          {
            "age": "18-24",
            "pct": 26.2
          },
          {
            "age": "25-34",
            "pct": 54.6
          },
          {
            "age": "35-44",
            "pct": 10.8
          },
          {
            "age": "45-54",
            "pct": 5.9
          },
          {
            "age": "55+",
            "pct": 2.5
          }
        ],
        "locations": [
          {
            "country": "Indonesia",
            "pct": 97.1,
            "note": "97,1%"
          },
          {
            "country": "Spain",
            "pct": 0.3,
            "note": "<1%"
          },
          {
            "country": "Australia",
            "pct": 0.3,
            "note": "<1%"
          },
          {
            "country": "Malaysia",
            "pct": 0.3,
            "note": "<1%"
          },
          {
            "country": "United States",
            "pct": 0.3,
            "note": "<1%"
          },
          {
            "country": "Cambodia",
            "pct": 0.3,
            "note": "<1%"
          },
          {
            "country": "Saudi Arabia",
            "pct": 0.3,
            "note": "<1%"
          },
          {
            "country": "Jersey",
            "pct": 0.3,
            "note": "<1%"
          },
          {
            "country": "South Africa",
            "pct": 0.3,
            "note": "<1%"
          },
          {
            "country": "Türkiye",
            "pct": 0.3,
            "note": "<1%"
          },
          {
            "country": "Others",
            "pct": 0.2,
            "note": "<1%"
          }
        ]
      },
      "competitorsAndInterests": {
        "creators": [
          {
            "name": "JOGJAKOSKU | INFO KOST JOGJA",
            "followers": "37K followers",
            "category": "Kompetitor / Direktori Kost Jogja",
            "highlight": true
          },
          {
            "name": "travelio_id",
            "followers": "22K followers",
            "category": "Platform Sewa Hunian / Apartemen",
            "highlight": true
          },
          {
            "name": "Booking.com",
            "followers": "5.4M followers",
            "category": "OTA Penginapan & Akomodasi",
            "highlight": true
          },
          {
            "name": "Shopee Indonesia",
            "followers": "19M followers",
            "category": "E-Commerce",
            "highlight": false
          },
          {
            "name": "ndshvv",
            "followers": "13M followers",
            "category": "Lifestyle Creator",
            "highlight": false
          },
          {
            "name": "syafira",
            "followers": "11M followers",
            "category": "Family / Lifestyle Creator",
            "highlight": false
          },
          {
            "name": "YONI",
            "followers": "10M followers",
            "category": "Creator",
            "highlight": false
          },
          {
            "name": "Hanum mega",
            "followers": "3.2M followers",
            "category": "Beauty / Lifestyle Creator",
            "highlight": false
          }
        ],
        "posts": [
          {
            "rank": 1,
            "creator": "SHELLA SAUKIA",
            "title": "Dapet Hadiah karna udah jadi model SS😂@Hanum mega...",
            "views": "13M views",
            "highlight": false
          },
          {
            "rank": 2,
            "creator": "Niken Salindry Reall",
            "title": "Jan nguantukkkkkkk polll",
            "views": "21M views",
            "highlight": false
          },
          {
            "rank": 3,
            "creator": "VILMEI ✨",
            "title": "(Konten kreator lifestyle)",
            "views": "9.8M views",
            "highlight": false
          },
          {
            "rank": 4,
            "creator": "JOGJAKOSKU | INFO KOST JOGJA",
            "title": "Coming Soon 😍 Full Furnished, Mezzanine, Dapur Pribadi,...",
            "views": "2.1M views",
            "highlight": true
          },
          {
            "rank": 5,
            "creator": "mon🍣",
            "title": "kak...thankyou udh selalu baik dan percaya sm aku. bahkan...",
            "views": "4.3M views",
            "highlight": false
          },
          {
            "rank": 6,
            "creator": "Ruce Nuenda",
            "title": "Bersama bocil lantam ini lagi 😊",
            "views": "2.5M views",
            "highlight": false
          },
          {
            "rank": 7,
            "creator": "syafira",
            "title": "Pertama kalinya aku merespon hal ini. selama ini aku...",
            "views": "20M views",
            "highlight": false
          },
          {
            "rank": 8,
            "creator": "Samuel Grubbs",
            "title": "Would you double it and give it to the next person? 👀",
            "views": "45M views",
            "highlight": false
          },
          {
            "rank": 9,
            "creator": "Adeline margaret 👑",
            "title": "Pak shirin 68 tahun yang rela merantau demi istri dan...",
            "views": "2.1M views",
            "highlight": false
          },
          {
            "rank": 10,
            "creator": "Apris Devita",
            "title": "Membalas @Si Opet 😸 Hai Opet salam kenal, Tidak semua...",
            "views": "3.8M views",
            "highlight": false
          }
        ]
      },
      "followersHistory": [
        {
          "date": "October 6",
          "followers": 1316,
          "diff": 0
        },
        {
          "date": "October 7",
          "followers": 1316,
          "diff": 0
        },
        {
          "date": "October 8",
          "followers": 1316,
          "diff": 0
        },
        {
          "date": "October 9",
          "followers": 1316,
          "diff": 0
        },
        {
          "date": "October 10",
          "followers": 1316,
          "diff": 1
        },
        {
          "date": "October 11",
          "followers": 1317,
          "diff": 0
        },
        {
          "date": "October 12",
          "followers": 1317,
          "diff": 0
        },
        {
          "date": "October 13",
          "followers": 1317,
          "diff": 0
        },
        {
          "date": "October 14",
          "followers": 1317,
          "diff": 0
        },
        {
          "date": "October 15",
          "followers": 1317,
          "diff": 0
        },
        {
          "date": "October 16",
          "followers": 1317,
          "diff": 0
        },
        {
          "date": "October 17",
          "followers": 1317,
          "diff": 0
        },
        {
          "date": "October 18",
          "followers": 1317,
          "diff": 0
        },
        {
          "date": "October 19",
          "followers": 1317,
          "diff": 0
        },
        {
          "date": "October 20",
          "followers": 1317,
          "diff": 0
        },
        {
          "date": "October 21",
          "followers": 1317,
          "diff": -1
        },
        {
          "date": "October 22",
          "followers": 1316,
          "diff": 1
        },
        {
          "date": "October 23",
          "followers": 1317,
          "diff": 0
        },
        {
          "date": "October 24",
          "followers": 1317,
          "diff": 0
        },
        {
          "date": "October 25",
          "followers": 1317,
          "diff": 0
        },
        {
          "date": "October 26",
          "followers": 1317,
          "diff": 0
        },
        {
          "date": "October 27",
          "followers": 1317,
          "diff": 0
        },
        {
          "date": "October 28",
          "followers": 1317,
          "diff": 1
        },
        {
          "date": "October 29",
          "followers": 1318,
          "diff": 0
        },
        {
          "date": "October 30",
          "followers": 1318,
          "diff": 0
        },
        {
          "date": "October 31",
          "followers": 1318,
          "diff": 0
        },
        {
          "date": "November 1",
          "followers": 1318,
          "diff": -1
        },
        {
          "date": "November 2",
          "followers": 1317,
          "diff": 0
        }
      ],
      "followersGender": [
        {
          "gender": "Female",
          "pct": 58.0
        },
        {
          "gender": "Male",
          "pct": 42.0
        },
        {
          "gender": "Other",
          "pct": 0.0
        }
      ],
      "followersTerritories": [
        {
          "code": "ID",
          "pct": 34.3
        },
        {
          "code": "AU",
          "pct": 0.2
        },
        {
          "code": "JP",
          "pct": 0.2
        },
        {
          "code": "KR",
          "pct": 0.2
        },
        {
          "code": "MY",
          "pct": 0.2
        },
        {
          "code": "SG",
          "pct": 0.2
        },
        {
          "code": "IN",
          "pct": 0.1
        },
        {
          "code": "SA",
          "pct": 0.1
        },
        {
          "code": "TH",
          "pct": 0.1
        },
        {
          "code": "TW",
          "pct": 0.1
        },
        {
          "code": "Others",
          "pct": 64.3
        }
      ],
      "followersActivity": {
        "dateRange": "October 28 – November 2 (6 Hari Penuh, Nov 3 parsial dikecualikan)",
        "hourlyAvg": [
          {
            "hour": "00:00",
            "avgActive": 80.7
          },
          {
            "hour": "01:00",
            "avgActive": 54.7
          },
          {
            "hour": "02:00",
            "avgActive": 38.8
          },
          {
            "hour": "03:00",
            "avgActive": 35.5
          },
          {
            "hour": "04:00",
            "avgActive": 46.2
          },
          {
            "hour": "05:00",
            "avgActive": 73.2
          },
          {
            "hour": "06:00",
            "avgActive": 91.8
          },
          {
            "hour": "07:00",
            "avgActive": 115.2
          },
          {
            "hour": "08:00",
            "avgActive": 125.8
          },
          {
            "hour": "09:00",
            "avgActive": 129.0
          },
          {
            "hour": "10:00",
            "avgActive": 131.3
          },
          {
            "hour": "11:00",
            "avgActive": 145.3
          },
          {
            "hour": "12:00",
            "avgActive": 146.0
          },
          {
            "hour": "13:00",
            "avgActive": 139.8
          },
          {
            "hour": "14:00",
            "avgActive": 136.8
          },
          {
            "hour": "15:00",
            "avgActive": 142.2
          },
          {
            "hour": "16:00",
            "avgActive": 138.7
          },
          {
            "hour": "17:00",
            "avgActive": 142.2
          },
          {
            "hour": "18:00",
            "avgActive": 151.7
          },
          {
            "hour": "19:00",
            "avgActive": 161.8
          },
          {
            "hour": "20:00",
            "avgActive": 171.0
          },
          {
            "hour": "21:00",
            "avgActive": 150.7
          },
          {
            "hour": "22:00",
            "avgActive": 132.8
          },
          {
            "hour": "23:00",
            "avgActive": 103.5
          }
        ]
      },
      "presentFiles": [
        "overview.csv",
        "trafic_source.png",
        "search_queries.png",
        "most_views.csv",
        "most_new_viewers.csv",
        "most_likes.csv",
        "new_followers.csv",
        "viewers.csv",
        "creators_your_viewers_also_watched.png",
        "viewers_gender_last_30.png",
        "viewers_age_last_30.png",
        "viewers_locations_last_30.png",
        "posts_your_viewers_also_viewed.png",
        "followers_activity.csv",
        "followers_gender.csv",
        "followers_history.csv",
        "followers_top_teritories.csv"
      ],
      "missingFiles": []
    }
  }
} as unknown as ReportPayload;
