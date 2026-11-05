export type ContentIdea = {
  id: number;
  title: string;
  defaultDate: string; // YYYY-MM-DD
  defaultDayName: string;
  time: string;
  platform: "instagram" | "tiktok";
  format: string;
  pilar: "Edukasi" | "Fasilitas Unggulan" | "Autentik" | "Lifestyle";
  weekGroup: string;
  hook: string;
  alur: string;
  cta: string;
  dasarReport: string;
  catatan?: string;
};

export const CONTENT_IDEAS: ContentIdea[] = [
  {
    id: 1,
    title: "Google Maps vs Aslinya",
    defaultDate: "2026-11-06",
    defaultDayName: "Jum",
    time: "18:00 WIB",
    platform: "tiktok",
    format: "TikTok (silang IG Reels) · Video 30 dtk",
    pilar: "Edukasi",
    weekGroup: "Minggu 1 · Konversi Profil (6–12 Nov)",
    hook: "“Foto Street View vs aslinya — cari bedanya.”",
    alur: "Tangkapan Street View depan kost → transisi ke video asli di titik yang sama → jalan masuk tanpa putus → berakhir di kamar.",
    cta: "“Mau video call langsung dari kamar? Chat WA 0821-3667-7730.”",
    dasarReport: "Kata kunci 'akun kost hoax jogja' · Pencarian = 42,0% tayangan TikTok.",
  },
  {
    id: 2,
    title: "Profil Ini Lobi Hotel",
    defaultDate: "2026-11-08",
    defaultDayName: "Min",
    time: "19:00 WIB",
    platform: "instagram",
    format: "IG Reels · Video 20 dtk",
    pilar: "Fasilitas Unggulan",
    weekGroup: "Minggu 1 · Konversi Profil (6–12 Nov)",
    hook: "“Selamat datang di lobi Jogja Lodge. Resepsionisnya ada di sini 👆”",
    alur: "Mimin berperan resepsionis → tunjuk Highlight Kamar → tunjuk Highlight Lokasi → tunjuk link WA di bio sambil bilang “check-in di sini.”",
    cta: "“Klik link WA di bio, Mimin layani langsung.”",
    dasarReport: "241 kunjungan profil, 0 klik bio, baru 3 pesan DM.",
  },
  {
    id: 3,
    title: "Katalog Kamar Deluxe vs VIP",
    defaultDate: "2026-11-10",
    defaultDayName: "Sel",
    time: "19:00 WIB",
    platform: "instagram",
    format: "IG Carousel 6 slide (sematkan di profil)",
    pilar: "Edukasi",
    weekGroup: "Minggu 1 · Konversi Profil (6–12 Nov)",
    hook: "“Deluxe atau VIP? Geser sebelum kamu chat.”",
    alur: "Slide 2–3 Deluxe (foto + fasilitas) → slide 4–5 VIP (+ dapur pribadi) → slide 6 tabel perbandingan.",
    cta: "“Simpan dulu, lalu klik WA di bio untuk tanya kamar kosong.”",
    dasarReport: "Unfollow naik +41,7% (-17 pengikut) karena katalog kamar tidak ditemukan.",
  },
  {
    id: 4,
    title: "Join the Trend Part 2",
    defaultDate: "2026-11-12",
    defaultDayName: "Kam",
    time: "19:00 WIB",
    platform: "instagram",
    format: "IG Reels (silang TikTok) · Video 15 dtk",
    pilar: "Autentik",
    weekGroup: "Minggu 1 · Konversi Profil (6–12 Nov)",
    hook: "Pakai audio tren yang sama + teks “Part 2: versi kamar 👀”.",
    alur: "Gerakan tren di koridor → potong ke kamar → teks penutup “Kamar ini ada di Highlight.”",
    cta: "“Komen 'MAU' untuk info kamar.”",
    dasarReport: "Konten #1 'We just had to join the trend' = 1.600 tayangan (67,3% Top 5), tetapi 0 komentar.",
  },
  {
    id: 5,
    title: "Seri Tur Kamar Part 1 — Deluxe",
    defaultDate: "2026-11-13",
    defaultDayName: "Jum",
    time: "18:00 WIB",
    platform: "tiktok",
    format: "TikTok · Video 45 dtk",
    pilar: "Fasilitas Unggulan",
    weekGroup: "Minggu 2–3 · Konsistensi Konten (13–23 Nov)",
    hook: "“Kost eksklusif Jogja, Part 1: kamar Deluxe. Part 2 lebih gila.”",
    alur: "Buka pintu → kasur & AC → water heater → meja kerja & colokan → teks “Part 2: VIP + dapur pribadi, Senin.”",
    cta: "“Follow biar nggak ketinggalan Part 2.”",
    dasarReport: "Penonton kembali hanya 8–27 pemirsa/hari → butuh konten berseri.",
  },
  {
    id: 6,
    title: "POV Nugas sampai Lupa Makan",
    defaultDate: "2026-11-15",
    defaultDayName: "Min",
    time: "19:00 WIB",
    platform: "instagram",
    format: "IG Reels · Video 15 dtk",
    pilar: "Autentik",
    weekGroup: "Minggu 2–3 · Konsistensi Konten (13–23 Nov)",
    hook: "“Anak kost be like: belum makan dari pagi, nanggung nugas.”",
    alur: "Laptop di meja kamar → jam berganti cepat → perut bunyi → sadar sudah malam → tutup laptop.",
    cta: "“Tag teman yang selalu begini.”",
    dasarReport: "Formula relatable September → 571 tayangan, 15 suka.",
  },
  {
    id: 7,
    title: "Seri Tur Kamar Part 2 — VIP + Dapur Pribadi",
    defaultDate: "2026-11-16",
    defaultDayName: "Sen",
    time: "18:00 WIB",
    platform: "tiktok",
    format: "TikTok (silang IG Reels) · Video 45 dtk",
    pilar: "Fasilitas Unggulan",
    weekGroup: "Minggu 2–3 · Konsistensi Konten (13–23 Nov)",
    hook: "“Part 2: kamar VIP yang punya dapur sendiri.”",
    alur: "Masuk kamar VIP → dapur pribadi (masak mi) → makan di kamar → teks “Full furnished, nggak perlu keluar.”",
    cta: "“Komen 'VIP' untuk info harga.”",
    dasarReport: "Video kompetitor 'Full Furnished, Mezzanine, Dapur Pribadi' = 2,1 juta tayangan di audiens yang sama.",
  },
  {
    id: 8,
    title: "5 Menit dari Pakuwon Mall",
    defaultDate: "2026-11-17",
    defaultDayName: "Sel",
    time: "19:00 WIB",
    platform: "instagram",
    format: "IG Reels (geotag Sleman) · Video 20 dtk",
    pilar: "Lifestyle",
    weekGroup: "Minggu 2–3 · Konsistensi Konten (13–23 Nov)",
    hook: "“Dari kamar ke Pakuwon Mall: cuma 5 menit. Buktinya ⏱️”",
    alur: "Timer mulai di pintu kamar → perjalanan dipercepat → timer berhenti di pintu mal.",
    cta: "“Cek Highlight Lokasi di profil.”",
    dasarReport: "Video evergreen TikTok '5 Menit dari Pakuwon Mall' = 120.246 tayangan.",
  },
  {
    id: 9,
    title: "Tebak: Hotel Bintang 3 atau Kost Bulanan?",
    defaultDate: "2026-11-18",
    defaultDayName: "Rab",
    time: "18:00 WIB",
    platform: "tiktok",
    format: "TikTok · Video 20 dtk",
    pilar: "Edukasi",
    weekGroup: "Minggu 2–3 · Konsistensi Konten (13–23 Nov)",
    hook: "“Ini kamar hotel atau kost? Tebak sebelum detik 10 — tulis di komentar.”",
    alur: "Close-up kasur → water heater → AC → meja kerja → reveal “Kost bulanan di Jogja Lodge.”",
    cta: "“Tebakanmu benar? Komen dulu, jawaban di pinned comment.”",
    dasarReport: "Kata kunci 'perbedaan kost exclusive dan biasa' · video 'kost rasa hotel' = 70.566 tayangan · komentar masih minim.",
  },
  {
    id: 10,
    title: "Dulu Explore Jogja Sebulan Sekali",
    defaultDate: "2026-11-19",
    defaultDayName: "Kam",
    time: "19:00 WIB",
    platform: "instagram",
    format: "IG Reels · Video 20 dtk",
    pilar: "Lifestyle",
    weekGroup: "Minggu 2–3 · Konsistensi Konten (13–23 Nov)",
    hook: "“Dulu explore Jogja sebulan sekali. Sekarang tiap pulang kerja.”",
    alur: "Keluar kost sore → kuliner dekat kost → kafe → pulang ke kamar yang nyaman.",
    cta: "“Simpan buat referensi tinggal di Jogja.”",
    dasarReport: "Konten #1 September dengan formula ini = 9,7 rb tayangan.",
  },
  {
    id: 11,
    title: "Peta Hidup Sehat Sekitar Kost",
    defaultDate: "2026-11-21",
    defaultDayName: "Sab",
    time: "18:00 WIB",
    platform: "tiktok",
    format: "TikTok · Video 30 dtk",
    pilar: "Lifestyle",
    weekGroup: "Minggu 2–3 · Konsistensi Konten (13–23 Nov)",
    hook: "“Tinggal di sini, alasan bolos gym-mu habis.”",
    alur: "Keluar kamar → gym terdekat (±5–10 menit motor) → kolam renang sekitar → warung sehat → pulang mandi air hangat.",
    cta: "“Cari kost dekat gym di Jogja? Chat WA di bio.”",
    dasarReport: "Kata kunci 'kos kosan jogja deket gym'.",
  },
  {
    id: 12,
    title: "Pindah dari Jakarta ke Jogja?",
    defaultDate: "2026-11-24",
    defaultDayName: "Sel",
    time: "19:00 WIB",
    platform: "instagram",
    format: "IG Reels · Video 30 dtk",
    pilar: "Autentik",
    weekGroup: "Minggu 4 · Perluasan Audiens & Konversi WA (24–30 Nov)",
    hook: "“Pindah kuliah/kerja dari Jakarta ke Jogja? Ini kost eksklusif rasa hotel.”",
    alur: "Koper datang → check-in kamar → buka jendela → teks “Nggak kangen Jakarta.”",
    cta: "“Kirim ke teman yang mau pindah ke Jogja.”",
    dasarReport: "Jakarta = 6,99% pemirsa potensial (kota terbesar).",
  },
  {
    id: 13,
    title: "Kost Aman untuk Perempuan Perantau",
    defaultDate: "2026-11-25",
    defaultDayName: "Rab",
    time: "18:00 WIB",
    platform: "tiktok",
    format: "TikTok · Video 30 dtk",
    pilar: "Fasilitas Unggulan",
    weekGroup: "Minggu 4 · Perluasan Audiens & Konversi WA (24–30 Nov)",
    hook: "“Pulang malam sendirian di Jogja? Ini yang bikin aku tenang.”",
    alur: "Pulang malam → CCTV & akses masuk aman → koridor bersih → kunci kamar → rebahan.",
    cta: "“Follow untuk update kamar kosong.”",
    dasarReport: "Pemirsa TikTok 68% perempuan, 26,2% usia 18–24 thn.",
  },
  {
    id: 14,
    title: "Jarak Kost ke Kampus & Mal",
    defaultDate: "2026-11-26",
    defaultDayName: "Kam",
    time: "19:00 WIB",
    platform: "instagram",
    format: "IG Carousel 6 slide",
    pilar: "Edukasi",
    weekGroup: "Minggu 4 · Perluasan Audiens & Konversi WA (24–30 Nov)",
    hook: "“Kuliah di mana? Cek berapa menit dari kamarmu.”",
    alur: "1 slide per tujuan (kampus & mal) berisi jarak menit riil → slide terakhir peta.",
    cta: "“Simpan & kirim ke calon maba.”",
    dasarReport: "Pemirsa IG 18–24 thn baru 11,5%.",
    catatan: "Isi jarak menit dari Google Maps sebelum tayang.",
  },
  {
    id: 15,
    title: "Pilih VIP atau Deluxe?",
    defaultDate: "2026-11-28",
    defaultDayName: "Sab",
    time: "18:00 WIB",
    platform: "tiktok",
    format: "TikTok · Video 20 dtk",
    pilar: "Edukasi",
    weekGroup: "Minggu 4 · Perluasan Audiens & Konversi WA (24–30 Nov)",
    hook: "“Kamu tim Deluxe atau tim VIP? Komen biar Mimin spill daftar harga!”",
    alur: "Split-screen Deluxe vs VIP → 3 perbedaan cepat → pinned comment berisi kisaran harga + WA 0821-3667-7730.",
    cta: "“Follow @jogjalodge untuk promo bulanan.”",
    dasarReport: "Video 'kalian pilih tipe yang mana nih?' = 57.900 tayangan · 190 kunjungan profil → +3 pengikut.",
  },
];

/**
 * Jadwal default 10 konten/bulan (2–3 konten/minggu, Instagram mayoritas 7:3 TikTok).
 * Ide lainnya tetap tersimpan di CONTENT_IDEAS dan dapat dipilih kapan saja lewat Popover.
 */
export const DEFAULT_SCHEDULE_MAP: Record<string, number> = {
  // Minggu 1 (3 konten: 2 IG, 1 TikTok)
  "2026-11-06": 1, // Jum - TikTok: Google Maps vs Aslinya
  "2026-11-08": 2, // Min - IG Reels: Profil Ini Lobi Hotel
  "2026-11-10": 3, // Sel - IG Carousel: Katalog Kamar Deluxe vs VIP

  // Minggu 2 (2 konten: 2 IG)
  "2026-11-15": 6, // Min - IG Reels: POV Nugas sampai Lupa Makan
  "2026-11-19": 10, // Kam - IG Reels: Dulu Explore Jogja Sebulan Sekali

  // Minggu 3 (3 konten: 2 IG, 1 TikTok)
  "2026-11-21": 11, // Sab - TikTok: Peta Hidup Sehat Sekitar Kost
  "2026-11-24": 12, // Sel - IG Reels: Pindah dari Jakarta ke Jogja?
  "2026-11-26": 14, // Kam - IG Carousel: Jarak Kost ke Kampus & Mal

  // Minggu 4 (2 konten: 1 IG, 1 TikTok)
  "2026-11-27": 8, // Jum - IG Reels: 5 Menit dari Pakuwon Mall
  "2026-11-28": 15, // Sab - TikTok: Pilih VIP atau Deluxe?
};

export const SCHEDULE_STORAGE_KEY = "jogjalodge_content_schedule_v2";

export function loadSchedule(): Record<string, number | null> {
  try {
    const raw = localStorage.getItem(SCHEDULE_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SCHEDULE_MAP };
    return JSON.parse(raw);
  } catch {
    return { ...DEFAULT_SCHEDULE_MAP };
  }
}

export function saveSchedule(schedule: Record<string, number | null>): void {
  try {
    localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(schedule));
  } catch {
    /* ignore quota errors */
  }
}
