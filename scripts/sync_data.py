import os, csv, json, re

HERE = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(HERE)
ROOT = os.path.join(PROJECT_ROOT, "data_referensi")
OUT_TS = os.path.join(PROJECT_ROOT, "src", "data", "reportData.ts")

def parse_ig_ts(path):
    if not os.path.exists(path):
        return None
    raw = open(path, "rb").read().decode("utf-16")
    lines = [l.strip() for l in raw.splitlines() if l.strip()]
    rows = []
    for l in lines[3:]:
        parts = [p.strip('"') for p in l.split('","')]
        if len(parts) == 2:
            rows.append({"date": parts[0][:10], "val": int(parts[1])})
    return rows

def fill_daily_series(sparse_rows, year, month, num_days):
    lookup = {r["date"]: r["val"] for r in (sparse_rows or [])}
    out = []
    for d in range(1, num_days + 1):
        ds = f"{year:04d}-{month:02d}-{d:02d}"
        out.append({"date": ds, "val": lookup.get(ds, 0)})
    return out

def parse_ig_demografi(path):
    if not os.path.exists(path):
        # fallback without .csv extension
        alt = path[:-4] if path.endswith(".csv") else path + ".csv"
        if os.path.exists(alt):
            path = alt
        else:
            return None
    raw = open(path, "rb").read().decode("utf-16")
    res = {"age_gender": [], "cities": [], "countries": []}
    lines = [l.strip() for l in raw.splitlines()]
    i = 0
    while i < len(lines):
        l = lines[i]
        if '"Usia & jenis kelamin"' in l:
            hdr = next(csv.reader([lines[i+1]]))
            i += 2
            while i < len(lines) and lines[i]:
                r = next(csv.reader([lines[i]]))
                row_dict = {"age": r[0], "Perempuan": 0.0, "Laki_laki": 0.0}
                for col_idx in range(1, len(hdr)):
                    key = "Laki_laki" if "Laki" in hdr[col_idx] else "Perempuan"
                    row_dict[key] = float(r[col_idx])
                res["age_gender"].append(row_dict)
                i += 1
        elif '"Kota populer"' in l:
            names = next(csv.reader([lines[i+1]]))
            vals = next(csv.reader([lines[i+2]]))
            res["cities"] = [{"name": n, "pct": float(v)} for n, v in zip(names, vals)]
            i += 3
        elif '"Negara Populer"' in l:
            names = next(csv.reader([lines[i+1]]))
            vals = next(csv.reader([lines[i+2]]))
            res["countries"] = [{"name": n, "pct": float(v)} for n, v in zip(names, vals)]
            i += 3
        else:
            i += 1
    return res

def parse_tiktok_posts(path):
    if not os.path.exists(path):
        return []
    body = "\n".join(open(path, encoding="utf-8-sig").read().splitlines()[1:])
    pat = re.compile(
        r'"([^"]+)","(.*?)","(https://www\.tiktok\.com/@[^/]+/video/\d+)","([^"]+)","(\d+)","(\d+)","(\d+)","(\d+)"',
        re.S
    )
    items = []
    for m in pat.finditer(body):
        exp_t, title, link, post_t, likes, comments, shares, views = m.groups()
        clean_title = " ".join(title.replace('""', '"').strip('"').split())
        items.append({
            "exportTime": exp_t,
            "title": clean_title,
            "link": link,
            "videoId": link.split("/")[-1],
            "postTime": post_t,
            "likes": int(likes),
            "comments": int(comments),
            "shares": int(shares),
            "views": int(views),
            "isCurrentMonth": post_t.startswith("October")
        })
    return items

ig_sep_dir = f"{ROOT}/instagram/2026-09"
ig_oct_dir = f"{ROOT}/instagram/2026-10"

ig_sep_pengikut_sparse = parse_ig_ts(f"{ig_sep_dir}/pengikut.csv")
ig_oct_pengikut_sparse = parse_ig_ts(f"{ig_oct_dir}/pengikut.csv")

ig_data = {
    "2026-09": {
        "available": True,
        "periodKey": "2026-09",
        "monthTitle": "September 2026",
        "periodLabel": "1 – 30 September 2026 (30 Hari)",
        "tayangan": parse_ig_ts(f"{ig_sep_dir}/tayangan.csv"),
        "jangkauan": parse_ig_ts(f"{ig_sep_dir}/jangkauan.csv"),
        "interaksi": parse_ig_ts(f"{ig_sep_dir}/interaksi_konten.csv"),
        "kunjungan": parse_ig_ts(f"{ig_sep_dir}/kunjungan.csv"),
        "klik": parse_ig_ts(f"{ig_sep_dir}/klik_tautan.csv"),
        "pengikut": fill_daily_series(ig_sep_pengikut_sparse, 2026, 9, 30),
        "pengikutActiveDays": len(ig_sep_pengikut_sparse),
        "demografi": None,
        "potensial": None,
        "allTimeRangeLabel": None,
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
            {"rank": 1, "title": "biasanya cuma explore Jogja sebulan sekali...", "overlay": "Kuliner & Hidup di Jogja", "date": "11 September 18:18", "views": 9700, "viewsLabel": "9,7 rb", "likes": 90, "comments": 1, "shares": 9, "pilar": "Autentik / Lifestyle"},
            {"rank": 2, "title": "Dear future me, semoga nanti punya...", "overlay": "Santai di Sofa Kamar", "date": "18 September 19:18", "views": 875, "viewsLabel": "875", "likes": 5, "comments": 0, "shares": 1, "pilar": "Autentik / Kehidupan Kost"},
            {"rank": 3, "title": "Belum makan kalau belum selesai 😌...", "overlay": "Anak kost be like: Laper belum makan dari pagi Ntar aja lah nanggung nugas", "date": "25 September 21:28", "views": 571, "viewsLabel": "571", "likes": 15, "comments": 0, "shares": 0, "pilar": "Autentik / Relatable Mahasiswa"},
            {"rank": 4, "title": "The real a place to call home ❤️✨", "overlay": "Bukan hotel, tapi ini Kost eksklusif di Jogja", "date": "4 September 00:01", "views": 441, "viewsLabel": "441", "likes": 11, "comments": 0, "shares": 0, "pilar": "Fasilitas Unggulan"},
            {"rank": 5, "title": "Your room. Your comfort. Your home. ...", "overlay": "pov: kamu kost di tipe kamar VIP", "date": "9 September 22:48", "views": 217, "viewsLabel": "217", "likes": 6, "comments": 0, "shares": 2, "pilar": "Fasilitas Unggulan (VIP Room)"}
        ],
        "presentFiles": [
            "tayangan.csv", "jangkauan.csv", "interaksi_konten.csv", "kunjungan.csv",
            "pengikut.csv", "klik_tautan.csv", "konten_populer.png", "tren_pemirsa.png"
        ],
        "missingFiles": [
            {"name": "demografi_pemirsa.csv", "reason": "Filter Instagram hanya mendukung Kumulatif Sepanjang Masa (4 Okt 2023 – 3 Nov 2026), sehingga hanya ditampilkan pada periode terbaru (Oktober 2026)."},
            {"name": "pemirsa_potensial.csv", "reason": "Filter Instagram hanya mendukung Kumulatif Sepanjang Masa (4 Okt 2023 – 3 Nov 2026), sehingga hanya ditampilkan pada periode terbaru (Oktober 2026)."}
        ]
    },
    "2026-10": {
        "available": True,
        "periodKey": "2026-10",
        "monthTitle": "Oktober 2026",
        "periodLabel": "1 – 31 Oktober 2026 (31 Hari)",
        "tayangan": parse_ig_ts(f"{ig_oct_dir}/tayangan.csv"),
        "jangkauan": parse_ig_ts(f"{ig_oct_dir}/jangkauan.csv"),
        "interaksi": parse_ig_ts(f"{ig_oct_dir}/interaksi_konten.csv"),
        "kunjungan": parse_ig_ts(f"{ig_oct_dir}/kunjungan.csv"),
        "klik": parse_ig_ts(f"{ig_oct_dir}/klik_tautan.csv"),
        "pengikut": fill_daily_series(ig_oct_pengikut_sparse, 2026, 10, 31),
        "pengikutActiveDays": len(ig_oct_pengikut_sparse),
        "demografi": parse_ig_demografi(f"{ig_oct_dir}/demografi_pemirsa.csv"),
        "potensial": parse_ig_demografi(f"{ig_oct_dir}/pemirsa_potensial.csv"),
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
            {"rank": 1, "title": "We just had to join the trend 💃 #jogjalodge...", "overlay": "pov: ketika ketemu customer yang sefrekuensi", "date": "22 Oktober 20:46", "views": 1600, "viewsLabel": "1,6 rb", "likes": 22, "comments": 0, "shares": 4, "pilar": "Autentik / Tren Relatable"},
            {"rank": 2, "title": "Nikmat mana yang kau dustakan 🥺", "overlay": "beres mandi, perut kenyang, AC dingin, sprei baru, baju tidur wangi dan besoknya libur kerja", "date": "2 Oktober 23:13", "views": 275, "viewsLabel": "275", "likes": 5, "comments": 0, "shares": 0, "pilar": "Autentik / Kehidupan Kost"},
            {"rank": 3, "title": "Lemesin dulu sebelum lanjut bekerja 💃", "overlay": "pov: ngasih dorongan ke temen biar semangat kerja", "date": "17 Oktober 20:59", "views": 218, "viewsLabel": "218", "likes": 6, "comments": 0, "shares": 0, "pilar": "Autentik / Lifestyle"},
            {"rank": 4, "title": "Definisi kost rasa hotel berasa staycation...", "overlay": "Kost Ekslusif ✅", "date": "10 Oktober 23:09", "views": 174, "viewsLabel": "174", "likes": 5, "comments": 0, "shares": 0, "pilar": "Fasilitas Unggulan (Room Tour)"},
            {"rank": 5, "title": "**Comfort lives in every detail.** ✨...", "overlay": "pov: ngekost di kosan eksklusif service kebersihannya ga main-main", "date": "30 Oktober 08:11", "views": 110, "viewsLabel": "110", "likes": 7, "comments": 0, "shares": 0, "pilar": "Fasilitas Unggulan (Kebersihan)"}
        ],
        "presentFiles": [
            "tayangan.csv", "jangkauan.csv", "interaksi_konten.csv", "kunjungan.csv",
            "pengikut.csv", "klik_tautan.csv", "konten_populer.png", "demografi_pemirsa.csv",
            "tren_pemirsa.png", "pemirsa_potensial.csv"
        ],
        "missingFiles": []
    }
}

tt_oct_dir = f"{ROOT}/tiktok/2026-10"
tt_ov_rows = [
    {
        "date": r["Date"],
        "views": int(r["Video Views"]),
        "profileViews": int(r["Profile Views"]),
        "likes": int(r["Likes"]),
        "comments": int(r["Comments"]),
        "shares": int(r["Shares"]),
        "interactions": int(r["Likes"]) + int(r["Comments"]) + int(r["Shares"])
    }
    for r in csv.DictReader(open(f"{tt_oct_dir}/overview.csv", encoding="utf-8-sig"))
]

tt_vw_rows = [
    {
        "date": r["Date"],
        "total": int(r["Total Viewers"]),
        "newViewers": int(r["New Viewers"]),
        "returning": int(r["Returning Viewers"])
    }
    for r in csv.DictReader(open(f"{tt_oct_dir}/viewers.csv", encoding="utf-8-sig"))
    if r["Total Viewers"] != "undefined"
]

tt_fh_rows = [
    {
        "date": r["Date"],
        "followers": int(r["Followers"]),
        "diff": int(r["Difference in followers from previous day"])
    }
    for r in csv.DictReader(open(f"{tt_oct_dir}/followers_history.csv", encoding="utf-8-sig"))
]

tt_fg_rows = [
    {"gender": r["Gender"], "pct": round(float(r["Distribution"]) * 100, 1)}
    for r in csv.DictReader(open(f"{tt_oct_dir}/followers_gender.csv", encoding="utf-8-sig"))
]

tt_ft_rows = [
    {"code": r["Top territories"], "pct": round(float(r["Distribution"]) * 100, 2)}
    for r in csv.DictReader(open(f"{tt_oct_dir}/followers_top_teritories.csv", encoding="utf-8-sig"))
]

tt_fa_raw = list(csv.DictReader(open(f"{tt_oct_dir}/followers_activity.csv", encoding="utf-8-sig")))
hourly_buckets = {h: [] for h in range(24)}
valid_fa_dates = []
for r in tt_fa_raw:
    if r["Date"] != "November 3":
        if r["Date"] not in valid_fa_dates:
            valid_fa_dates.append(r["Date"])
        hourly_buckets[int(r["Hour"])].append(int(r["Active followers"]))

tt_hourly_avg = [
    {"hour": f"{h:02d}:00", "avgActive": round(sum(hourly_buckets[h]) / len(hourly_buckets[h]), 1)}
    for h in range(24)
]

tiktok_data = {
    "2026-09": {
        "available": False,
        "periodKey": "2026-09",
        "monthTitle": "September 2026",
        "periodLabel": "Belum Tersedia",
        "reason": "Data Referensi TikTok untuk periode September 2026 (data_referensi/tiktok/2026-09/) tidak tersedia.",
        "presentFiles": [],
        "missingFiles": [
            {"name": fn, "reason": "File periode September 2026 tidak tersedia di data_referensi/tiktok/2026-09/"}
            for fn in [
                "overview.csv", "trafic_source.png", "search_queries.png", "most_views.csv",
                "most_new_viewers.csv", "most_likes.csv", "new_followers.csv", "viewers.csv",
                "creators_your_viewers_also_watched.png", "viewers_gender_last_30.png",
                "viewers_age_last_30.png", "viewers_locations_last_30.png",
                "posts_your_viewers_also_viewed.png", "followers_activity.csv",
                "followers_gender.csv", "followers_history.csv", "followers_top_teritories.csv"
            ]
        ]
    },
    "2026-10": {
        "available": True,
        "periodKey": "2026-10",
        "monthTitle": "Oktober 2026",
        "periodLabel": "Rentang Bergulir 28 Hari (6 Okt – 2 Nov 2026)",
        "overview": tt_ov_rows,
        "viewers": tt_vw_rows,
        "trafficSource": [
            {"source": "Search (Pencarian TikTok)", "rawName": "Search", "pct": 42.0},
            {"source": "Personal Profile (Kunjungan Profil)", "rawName": "Personal profile", "pct": 35.9},
            {"source": "For You (FYP)", "rawName": "For You", "pct": 22.2},
            {"source": "Following (Tab Mengikuti)", "rawName": "Following", "pct": 0.0},
            {"source": "Sound (Halaman Audio)", "rawName": "Sound", "pct": 0.0}
        ],
        "searchQueries": [
            {"query": "rukita kalani jogja", "pct": 0.1, "intent": "Kompetitor Langsung (Rukita)"},
            {"query": "Akun kost hoax jogja", "pct": 0.1, "intent": "Keamanan / Verifikasi Kost Asli"},
            {"query": "kos kosan jogja deket gym", "pct": 0.1, "intent": "Fasilitas Gym / Gaya Hidup"},
            {"query": "kos exclusive jogja sidoarum", "pct": 0.1, "intent": "Pencarian Kost Eksklusif Area Jogja"},
            {"query": "perbedaan kost exclusive dan biasa", "pct": 0.1, "intent": "Edukasi / Perbandingan Kost"}
        ],
        "topPosts": {
            "most_views": parse_tiktok_posts(f"{tt_oct_dir}/most_views.csv"),
            "most_new_viewers": parse_tiktok_posts(f"{tt_oct_dir}/most_new_viewers.csv"),
            "most_likes": parse_tiktok_posts(f"{tt_oct_dir}/most_likes.csv"),
            "new_followers": parse_tiktok_posts(f"{tt_oct_dir}/new_followers.csv")
        },
        "viewersDemographics": {
            "gender": [
                {"label": "Perempuan (Female)", "pct": 68.0},
                {"label": "Laki-laki (Male)", "pct": 32.0},
                {"label": "Lainnya (Other)", "pct": 0.0}
            ],
            "age": [
                {"age": "18-24", "pct": 26.2},
                {"age": "25-34", "pct": 54.6},
                {"age": "35-44", "pct": 10.8},
                {"age": "45-54", "pct": 5.9},
                {"age": "55+", "pct": 2.5}
            ],
            "locations": [
                {"country": "Indonesia", "pct": 97.1, "note": "97,1%"},
                {"country": "Spain", "pct": 0.3, "note": "<1%"},
                {"country": "Australia", "pct": 0.3, "note": "<1%"},
                {"country": "Malaysia", "pct": 0.3, "note": "<1%"},
                {"country": "United States", "pct": 0.3, "note": "<1%"},
                {"country": "Cambodia", "pct": 0.3, "note": "<1%"},
                {"country": "Saudi Arabia", "pct": 0.3, "note": "<1%"},
                {"country": "Jersey", "pct": 0.3, "note": "<1%"},
                {"country": "South Africa", "pct": 0.3, "note": "<1%"},
                {"country": "Türkiye", "pct": 0.3, "note": "<1%"},
                {"country": "Others", "pct": 0.2, "note": "<1%"}
            ]
        },
        "competitorsAndInterests": {
            "creators": [
                {"name": "JOGJAKOSKU | INFO KOST JOGJA", "followers": "37K followers", "category": "Kompetitor / Direktori Kost Jogja", "highlight": True},
                {"name": "travelio_id", "followers": "22K followers", "category": "Platform Sewa Hunian / Apartemen", "highlight": True},
                {"name": "Booking.com", "followers": "5.4M followers", "category": "OTA Penginapan & Akomodasi", "highlight": True},
                {"name": "Shopee Indonesia", "followers": "19M followers", "category": "E-Commerce", "highlight": False},
                {"name": "ndshvv", "followers": "13M followers", "category": "Lifestyle Creator", "highlight": False},
                {"name": "syafira", "followers": "11M followers", "category": "Family / Lifestyle Creator", "highlight": False},
                {"name": "YONI", "followers": "10M followers", "category": "Creator", "highlight": False},
                {"name": "Hanum mega", "followers": "3.2M followers", "category": "Beauty / Lifestyle Creator", "highlight": False}
            ],
            "posts": [
                {"rank": 1, "creator": "SHELLA SAUKIA", "title": "Dapet Hadiah karna udah jadi model SS😂@Hanum mega...", "views": "13M views", "highlight": False},
                {"rank": 2, "creator": "Niken Salindry Reall", "title": "Jan nguantukkkkkkk polll", "views": "21M views", "highlight": False},
                {"rank": 3, "creator": "VILMEI ✨", "title": "(Konten kreator lifestyle)", "views": "9.8M views", "highlight": False},
                {"rank": 4, "creator": "JOGJAKOSKU | INFO KOST JOGJA", "title": "Coming Soon 😍 Full Furnished, Mezzanine, Dapur Pribadi,...", "views": "2.1M views", "highlight": True},
                {"rank": 5, "creator": "mon🍣", "title": "kak...thankyou udh selalu baik dan percaya sm aku. bahkan...", "views": "4.3M views", "highlight": False},
                {"rank": 6, "creator": "Ruce Nuenda", "title": "Bersama bocil lantam ini lagi 😊", "views": "2.5M views", "highlight": False},
                {"rank": 7, "creator": "syafira", "title": "Pertama kalinya aku merespon hal ini. selama ini aku...", "views": "20M views", "highlight": False},
                {"rank": 8, "creator": "Samuel Grubbs", "title": "Would you double it and give it to the next person? 👀", "views": "45M views", "highlight": False},
                {"rank": 9, "creator": "Adeline margaret 👑", "title": "Pak shirin 68 tahun yang rela merantau demi istri dan...", "views": "2.1M views", "highlight": False},
                {"rank": 10, "creator": "Apris Devita", "title": "Membalas @Si Opet 😸 Hai Opet salam kenal, Tidak semua...", "views": "3.8M views", "highlight": False}
            ]
        },
        "followersHistory": tt_fh_rows,
        "followersGender": tt_fg_rows,
        "followersTerritories": tt_ft_rows,
        "followersActivity": {
            "dateRange": f"{valid_fa_dates[0]} – {valid_fa_dates[-1]} (6 Hari Penuh, Nov 3 parsial dikecualikan)",
            "hourlyAvg": tt_hourly_avg
        },
        "presentFiles": [
            "overview.csv", "trafic_source.png", "search_queries.png", "most_views.csv",
            "most_new_viewers.csv", "most_likes.csv", "new_followers.csv", "viewers.csv",
            "creators_your_viewers_also_watched.png", "viewers_gender_last_30.png",
            "viewers_age_last_30.png", "viewers_locations_last_30.png",
            "posts_your_viewers_also_viewed.png", "followers_activity.csv",
            "followers_gender.csv", "followers_history.csv", "followers_top_teritories.csv"
        ],
        "missingFiles": []
    }
}

payload = {
    "defaultPeriod": "2026-10",
    "periods": [
        {"key": "2026-10", "label": "Oktober 2026", "sub": "Periode Terbaru · IG & TikTok Lengkap", "hasIG": True, "hasTT": True},
        {"key": "2026-09", "label": "September 2026", "sub": "IG (8 File) · TikTok Belum Ada Data", "hasIG": True, "hasTT": False}
    ],
    "instagram": ig_data,
    "tiktok": tiktok_data
}

TS_TYPES = """// AUTO-GENERATED FROM data_referensi/ BY scripts/sync_data.py — DO NOT EDIT MANUALLY
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
"""

os.makedirs(os.path.dirname(OUT_TS), exist_ok=True)
with open(OUT_TS, "w", encoding="utf-8") as f:
    f.write(TS_TYPES + "\n")
    f.write("export const REPORT_DATA: ReportPayload = ")
    f.write(json.dumps(payload, ensure_ascii=False, indent=2))
    f.write(" as unknown as ReportPayload;\n")
print("Synced data_referensi/ -> src/data/reportData.ts")
