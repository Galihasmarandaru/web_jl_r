import * as React from "react";
import { Clock, Eye, Heart, MessageCircle, Share2 } from "lucide-react";
import { Bar, Line } from "react-chartjs-2";
import {
  CellUnit,
  chartOpts,
  deltaLabelNode,
  Down,
  type FunnelStage,
  FunnelSummary,
  InteractiveActionPlan,
  MetricVal,
  momNode,
  type NavItem,
  ReportModule,
  ReportSection,
  SectionNav,
  SignedNode,
  sliceByRange,
  StatTile,
  Up,
} from "@/components/ReportShared";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type PeriodKey, REPORT_DATA } from "@/data/reportData";
import { cn, fmtNum, fmtPct, maxBy, shortDateID, sumBy } from "@/lib/utils";

const ID = {
  ringkasan: "ig-ringkasan",
  s1: "ig-s1",
  s2: "ig-s2",
  s3: "ig-s3",
  s4: "ig-s4",
  rencana: "ig-rencana",
};

const KUMULATIF_BADGE = (
  <Badge variant="secondary" className="text-[10px] font-medium">
    Kumulatif 4 Okt 2023 – 3 Nov 2026
  </Badge>
);

export function InstagramTab({ periodKey }: { periodKey: PeriodKey }) {
  const d = REPORT_DATA.instagram[periodKey];
  const prev = periodKey === "2026-10" ? REPORT_DATA.instagram["2026-09"] : null;
  const isOct = periodKey === "2026-10";

  const [selectedPostRank, setSelectedPostRank] = React.useState<number>(1);
  React.useEffect(() => setSelectedPostRank(1), [periodKey]);

  /* ---------- Angka utama ---------- */
  const totTayangan = sumBy(d.tayangan, (r) => r.val);
  const totJangkauan = sumBy(d.jangkauan, (r) => r.val);
  const totInteraksi = sumBy(d.interaksi, (r) => r.val);
  const totKunjungan = sumBy(d.kunjungan, (r) => r.val);
  const totKlik = sumBy(d.klik, (r) => r.val);
  const totPengikut = sumBy(d.pengikut, (r) => r.val);

  const prevTayangan = prev ? sumBy(prev.tayangan, (r) => r.val) : null;
  const prevJangkauan = prev ? sumBy(prev.jangkauan, (r) => r.val) : null;
  const prevInteraksi = prev ? sumBy(prev.interaksi, (r) => r.val) : null;
  const prevKunjungan = prev ? sumBy(prev.kunjungan, (r) => r.val) : null;
  const prevKlik = prev ? sumBy(prev.klik, (r) => r.val) : null;

  const pkTayangan = maxBy(d.tayangan, (r) => r.val);
  const pkJangkauan = maxBy(d.jangkauan, (r) => r.val);
  const pkInteraksi = maxBy(d.interaksi, (r) => r.val);
  const pkKunjungan = maxBy(d.kunjungan, (r) => r.val);

  const freq = totJangkauan ? totTayangan / totJangkauan : 0;
  const freqLabel = freq.toFixed(2).replace(".", ",");
  const reachConv = totTayangan ? (totJangkauan / totTayangan) * 100 : 0;
  const er = totJangkauan ? (totInteraksi / totJangkauan) * 100 : 0;
  const visitRate = totJangkauan ? (totKunjungan / totJangkauan) * 100 : 0;
  const avgVisitPerDay = d.kunjungan.length ? totKunjungan / d.kunjungan.length : 0;

  const tp = d.trenPemirsa;

  const totalTop5Views = sumBy(d.kontenPopuler, (p) => p.views);
  const maxPostViews = d.kontenPopuler[0]?.views || 1;
  const top1Pct = totalTop5Views ? ((d.kontenPopuler[0]?.views ?? 0) / totalTop5Views) * 100 : 0;
  const focusedPost =
    d.kontenPopuler.find((p) => p.rank === selectedPostRank) ?? d.kontenPopuler[0];

  const momJangkauan = momNode(totJangkauan, prevJangkauan);
  const momTayangan = momNode(totTayangan, prevTayangan);

  /* ---------- Ringkasan: Corong Konversi ---------- */
  const stages: FunnelStage[] = [
    {
      label: "Tayangan",
      value: fmtNum(totTayangan),
      unit: "tayangan",
      sub: `${freqLabel}x tayangan/akun`,
      curr: totTayangan,
      prev: prevTayangan,
      targetId: ID.s1,
    },
    {
      label: "Jangkauan",
      value: fmtNum(totJangkauan),
      unit: "akun",
      sub: `${fmtPct(reachConv, 1)} dari tayangan`,
      curr: totJangkauan,
      prev: prevJangkauan,
      targetId: ID.s1,
    },
    {
      label: "Interaksi",
      value: fmtNum(totInteraksi),
      unit: "interaksi",
      sub: `ER ${fmtPct(er, 2)} dari jangkauan`,
      curr: totInteraksi,
      prev: prevInteraksi,
      targetId: ID.s2,
    },
    {
      label: "Cek Profil",
      value: fmtNum(totKunjungan),
      unit: "kunjungan",
      sub: `${fmtPct(visitRate, 1)} dari jangkauan`,
      curr: totKunjungan,
      prev: prevKunjungan,
      targetId: ID.s2,
    },
    {
      label: "Klik Bio",
      value: fmtNum(totKlik),
      unit: "klik",
      sub: `${tp.kontakPesan} pesan DM masuk`,
      curr: totKlik,
      prev: prevKlik,
      problem: totKlik === 0,
      targetId: ID.s3,
    },
  ];

  const execSummary = (
    <>
      {momJangkauan ? (
        <>Jangkauan {momJangkauan}</>
      ) : (
        <>
          <strong>{fmtNum(totJangkauan)} akun terjangkau</strong>
        </>
      )}
      , namun <strong>{fmtNum(totKunjungan)} kunjungan profil</strong> hanya menghasilkan{" "}
      <strong>{totKlik} klik bio</strong> dan{" "}
      <SignedNode val={tp.netPengikut} prefix="Net " suffix=" pengikut" /> — prioritas:{" "}
      <strong>pasang link WhatsApp di bio & Stories</strong>.
    </>
  );

  /* ---------- Bagian 4 (hanya bila data kumulatif tersedia) ---------- */
  const hasAudiens = !!d.demografi || !!d.potensial;
  let audiensIdx = 0;
  const nextAudiensNum = () => `4.${++audiensIdx}`;

  const navItems: NavItem[] = [
    { id: ID.ringkasan, label: "Ringkasan" },
    { id: ID.s1, label: "1 · Jangkauan" },
    { id: ID.s2, label: "2 · Konten & Interaksi" },
    { id: ID.s3, label: "3 · Konversi" },
    ...(hasAudiens ? [{ id: ID.s4, label: "4 · Audiens" }] : []),
    { id: ID.rencana, label: "Rencana 30 Hari" },
  ];

  return (
    <div className="space-y-6">
      <SectionNav items={navItems} />

      <FunnelSummary
        id={ID.ringkasan}
        title={`Corong Konversi Instagram — ${d.monthTitle}`}
        periodLabel={prev ? "Perbandingan vs bulan lalu" : "Periode pertama (tanpa pembanding)"}
        stages={stages}
        summary={execSummary}
      />

      {/* ============ BAGIAN 1 · JANGKAUAN ============ */}
      <ReportSection
        id={ID.s1}
        num="1"
        title="Jangkauan"
        summary={
          momJangkauan && momTayangan ? (
            <>
              Jangkauan {momJangkauan} menjadi <strong>{fmtNum(totJangkauan)} akun</strong>, sedangkan tayangan {momTayangan} menjadi <strong>{fmtNum(totTayangan)} tayangan</strong>.
            </>
          ) : (
            <>
              <strong>{fmtNum(totTayangan)} tayangan</strong> menjangkau{" "}
              <strong>{fmtNum(totJangkauan)} akun unik</strong> (<strong>{freqLabel}x tayangan/akun</strong>).
            </>
          )
        }
      >
        <ReportModule
          num="1.1"
          title="Tayangan & Jangkauan Harian"
          withRange
          insight={{
            fakta: (
              <>
                Puncak <strong>{shortDateID(pkTayangan.date)}</strong>:{" "}
                <strong>{fmtNum(pkTayangan.val)} tayangan</strong> &{" "}
                <strong>{fmtNum(pkJangkauan.val)} akun jangkauan</strong>.
              </>
            ),
            masalah: isOct ? (
              <>
                <strong>1 hari puncak</strong> menyumbang <strong>23,2% tayangan sebulan</strong>; hari tanpa Reels turun ke <strong>&lt;60 tayangan/hari</strong>.
              </>
            ) : (
              <>
                Frekuensi <strong>5,38x tayangan/akun</strong> bertumpu pada audiens lama; jangkauan baru hanya naik saat <strong>rilis Reels</strong>.
              </>
            ),
            aksi: (
              <>
                Rilis konsisten <strong>3x Reels/minggu (Selasa, Kamis, Minggu)</strong> agar jangkauan stabil <strong>&gt;100 akun/hari</strong>.
              </>
            ),
          }}
        >
          {(range) => {
            const t = sliceByRange(d.tayangan, range);
            const j = sliceByRange(d.jangkauan, range);
            return (
              <div className="h-72 w-full">
                <Line
                  data={{
                    labels: t.map((r) => shortDateID(r.date)),
                    datasets: [
                      {
                        label: "Tayangan",
                        data: t.map((r) => r.val),
                        borderColor: "#E11D48",
                        backgroundColor: "rgba(225, 29, 72, 0.08)",
                        fill: true,
                        tension: 0.3,
                      },
                      {
                        label: "Jangkauan",
                        data: j.map((r) => r.val),
                        borderColor: "#18181B",
                        fill: false,
                        tension: 0.3,
                      },
                    ],
                  }}
                  options={chartOpts({ Tayangan: "tayangan", Jangkauan: "akun" }) as never}
                />
              </div>
            );
          }}
        </ReportModule>
      </ReportSection>

      {/* ============ BAGIAN 2 · KONTEN & INTERAKSI ============ */}
      <ReportSection
        id={ID.s2}
        num="2"
        title="Konten & Interaksi"
        summary={
          <>
            <strong>{fmtNum(totInteraksi)} interaksi (ER {fmtPct(er, 2)})</strong> dan{" "}
            <strong>{fmtNum(totKunjungan)} kunjungan profil</strong>; Reels #1 menyumbang{" "}
            <strong>{fmtPct(top1Pct, 1)} tayangan Top 5</strong>.
          </>
        }
      >
        <ReportModule
          num="2.1"
          title="Interaksi vs Kunjungan Profil"
          withRange
          insight={{
            fakta: (
              <>
                Puncak interaksi{" "}
                <strong>
                  {shortDateID(pkInteraksi.date)} ({pkInteraksi.val} interaksi)
                </strong>{" "}
                memicu puncak cek profil <strong>({pkKunjungan.val} kunjungan)</strong>; rata-rata{" "}
                <strong>{avgVisitPerDay.toFixed(1).replace(".", ",")} kunjungan/hari</strong>.
              </>
            ),
            masalah: (
              <>
                <strong>Pengunjung profil ({fmtNum(totKunjungan)} kunjungan)</strong> lebih banyak dari pemberi interaksi <strong>({fmtNum(totInteraksi)} interaksi)</strong>, tetapi belum diarahkan ke <strong>Highlight kamar</strong>.
              </>
            ),
            aksi: (
              <>
                Tutup setiap Reels dengan CTA: <strong>“Cek Highlight [Kamar VIP] & [Lokasi] di profil @jogjalodge”</strong>.
              </>
            ),
          }}
        >
          {(range) => {
            const it = sliceByRange(d.interaksi, range);
            const kj = sliceByRange(d.kunjungan, range);
            return (
              <div className="h-72 w-full">
                <Bar
                  data={{
                    labels: it.map((r) => shortDateID(r.date)),
                    datasets: [
                      {
                        type: "bar" as const,
                        label: "Interaksi",
                        data: it.map((r) => r.val),
                        backgroundColor: "#E11D48",
                        borderRadius: 4,
                      },
                      {
                        type: "line" as const,
                        label: "Kunjungan Profil",
                        data: kj.map((r) => r.val),
                        borderColor: "#18181B",
                        borderWidth: 2,
                        tension: 0.3,
                      },
                    ] as never,
                  }}
                  options={
                    chartOpts({
                      Interaksi: "interaksi",
                      "Kunjungan Profil": "kunjungan",
                    }) as never
                  }
                />
              </div>
            );
          }}
        </ReportModule>

        <ReportModule
          num="2.2"
          title="Konten Populer (Top 5)"
          insight={{
            fakta: isOct ? (
              <>
                <strong>#1 “We just had to join the trend” (22 Okt 20:46 WIB)</strong> meraih{" "}
                <strong>1.600 tayangan (67,3% porsi Top 5)</strong>.
              </>
            ) : (
              <>
                <strong>#1 “biasanya cuma explore Jogja” (11 Sep 18:18 WIB)</strong> meraih{" "}
                <strong>9.700 tayangan (82,2% porsi Top 5)</strong>.
              </>
            ),
            masalah: isOct ? (
              <>
                Seluruh <strong>5 konten teratas Oktober</strong> mendapat <strong>0 komentar</strong>.
              </>
            ) : (
              <>
                Bergantung pada <strong>1 video viral</strong>; konten #2–#5 rata-rata{" "}
                <strong>di bawah 900 tayangan</strong>.
              </>
            ),
            aksi: (
              <>
                Pakai <strong>Hook POV relatable (3 detik awal)</strong> +{" "}
                <strong>visual fasilitas kamar</strong>, rilis pukul <strong>18:30–20:30 WIB</strong>.
              </>
            ),
          }}
        >
          <Tabs defaultValue="explore" className="w-full">
            <TabsList className="mb-4 h-9">
              <TabsTrigger value="explore" className="text-xs">
                Eksplorasi
              </TabsTrigger>
              <TabsTrigger value="table" className="text-xs">
                Tabel
              </TabsTrigger>
              <TabsTrigger value="chart" className="text-xs">
                Grafik
              </TabsTrigger>
            </TabsList>

            <TabsContent value="explore" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Daftar Reels */}
                <div className="lg:col-span-5 flex flex-col gap-1.5">
                  {d.kontenPopuler.map((post) => {
                    const isSel = post.rank === focusedPost.rank;
                    return (
                      <button
                        key={post.rank}
                        type="button"
                        onClick={() => setSelectedPostRank(post.rank)}
                        className={cn(
                          "w-full rounded-lg border p-3 text-left transition-colors cursor-pointer flex items-center justify-between gap-3",
                          isSel ? "border-zinc-400 bg-muted" : "border-border bg-card hover:bg-muted/50"
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={cn(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold tabular-nums",
                              isSel ? "bg-foreground text-background" : "bg-muted text-foreground"
                            )}
                          >
                            {post.rank}
                          </span>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-foreground truncate">
                              {post.title}
                            </div>
                            <div className="text-[11px] text-muted-foreground">{post.date} WIB</div>
                          </div>
                        </div>
                        <div className="shrink-0">
                          <CellUnit val={fmtNum(post.views)} unit="tayangan" bold />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Detail Reels terpilih */}
                <div className="lg:col-span-7 rounded-lg border border-border p-5 flex flex-col justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Badge variant="secondary">{focusedPost.pilar}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {focusedPost.date} WIB
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                      #{focusedPost.rank} · {focusedPost.title}
                    </h4>
                    <div className="rounded-md bg-muted/60 px-3.5 py-3">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                        Hook (3 detik pertama)
                      </div>
                      <div className="text-sm text-foreground italic">“{focusedPost.overlay}”</div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Porsi dari total Top 5 ({fmtNum(totalTop5Views)} tayangan)</span>
                        <span className="font-bold text-foreground tabular-nums">
                          {fmtPct((focusedPost.views / totalTop5Views) * 100, 1)} porsi
                        </span>
                      </div>
                      <Progress
                        value={Math.max(5, Math.round((focusedPost.views / maxPostViews) * 100))}
                        className="h-1.5"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-border pt-4">
                    {[
                      { icon: Eye, label: "Tayangan", val: focusedPost.views, unit: "tayangan" },
                      { icon: Heart, label: "Suka", val: focusedPost.likes, unit: "suka" },
                      {
                        icon: MessageCircle,
                        label: "Komentar",
                        val: focusedPost.comments,
                        unit: "komentar",
                      },
                      { icon: Share2, label: "Bagikan", val: focusedPost.shares, unit: "bagikan" },
                    ].map((m) => (
                      <div key={m.label} className="text-center">
                        <div className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
                          <m.icon className="h-3 w-3" /> {m.label}
                        </div>
                        <div className="mt-0.5 flex justify-center">
                          <MetricVal num={fmtNum(m.val)} unit={m.unit} size="md" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="table" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">#</TableHead>
                    <TableHead>Konten & Hook</TableHead>
                    <TableHead>Pilar</TableHead>
                    <TableHead className="text-right">Tayangan</TableHead>
                    <TableHead className="text-right">Suka</TableHead>
                    <TableHead className="text-right">Komentar</TableHead>
                    <TableHead className="text-right">Bagikan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {d.kontenPopuler.map((item) => (
                    <TableRow key={item.rank}>
                      <TableCell className="font-bold">#{item.rank}</TableCell>
                      <TableCell>
                        <div className="font-semibold text-foreground">{item.title}</div>
                        <div className="text-xs text-muted-foreground italic">“{item.overlay}”</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.pilar}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <CellUnit val={fmtNum(item.views)} unit="tayangan" bold />
                      </TableCell>
                      <TableCell className="text-right">
                        <CellUnit val={item.likes} unit="suka" />
                      </TableCell>
                      <TableCell className="text-right">
                        <CellUnit val={item.comments} unit="komentar" />
                      </TableCell>
                      <TableCell className="text-right">
                        <CellUnit val={item.shares} unit="bagikan" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="chart" className="mt-0">
              <div className="h-64 w-full">
                <Bar
                  data={{
                    labels: d.kontenPopuler.map(
                      (k) => `#${k.rank} · ${k.date.split(" ").slice(0, 2).join(" ")}`
                    ),
                    datasets: [
                      {
                        label: "Tayangan",
                        data: d.kontenPopuler.map((k) => k.views),
                        backgroundColor: "#E11D48",
                        borderRadius: 6,
                      },
                    ],
                  }}
                  options={chartOpts("tayangan", { indexAxis: "y" as const }) as never}
                />
              </div>
            </TabsContent>
          </Tabs>
        </ReportModule>
      </ReportSection>

      {/* ============ BAGIAN 3 · KONVERSI ============ */}
      <ReportSection
        id={ID.s3}
        num="3"
        title="Konversi"
        summary={
          <>
            <strong>{fmtNum(totKunjungan)} kunjungan profil</strong> menghasilkan{" "}
            <strong>{totKlik} klik bio</strong> dan <strong>{tp.kontakPesan} pesan DM</strong>, dengan pertumbuhan bersih <SignedNode val={tp.netPengikut} prefix="Net " suffix=" pengikut" />.
          </>
        }
      >
        <ReportModule
          num="3.1"
          title="Pengikut Baru Harian"
          withRange
          insight={{
            fakta: (
              <>
                <Up>+{totPengikut} pengikut baru</Up> dalam{" "}
                <strong>{d.pengikutActiveDays} hari aktif</strong>; konversi cek profil ke follow{" "}
                <strong>{fmtPct(totKunjungan ? (totPengikut / totKunjungan) * 100 : 0, 1)}</strong>.
              </>
            ),
            masalah: (
              <>
                <strong>
                  {d.pengikut.length - d.pengikutActiveDays} dari {d.pengikut.length} hari
                </strong>{" "}
                tercatat <strong>0 pengikut baru</strong>.
              </>
            ),
            aksi: (
              <>
                Pertegas bio: <strong>“Kost Eksklusif Campur Jogja · Full Furnished + AC + Water Heater · 5 Menit Pakuwon Mall”</strong>.
              </>
            ),
          }}
        >
          {(range) => {
            const p = sliceByRange(d.pengikut, range);
            return (
              <div className="h-64 w-full">
                <Bar
                  data={{
                    labels: p.map((r) => shortDateID(r.date)),
                    datasets: [
                      {
                        label: "Pengikut Baru",
                        data: p.map((r) => r.val),
                        backgroundColor: "#18181B",
                        borderRadius: 4,
                      },
                    ],
                  }}
                  options={
                    chartOpts("pengikut", {
                      scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
                    }) as never
                  }
                />
              </div>
            );
          }}
        </ReportModule>

        <ReportModule
          num="3.2"
          title="Klik Tautan Bio & DM"
          insight={{
            fakta: (
              <>
                <strong>{totKlik} klik bio</strong> selama <strong>{d.pengikut.length} hari</strong>, sementara <strong>{tp.kontakPesan} calon penghuni</strong> langsung mengirim <strong>pesan DM</strong>.
              </>
            ),
            masalah: (
              <>
                Pengunjung profil tidak menemukan <strong>link WhatsApp langsung</strong>, dan Stories belum memakai <strong>stiker tautan</strong>.
              </>
            ),
            aksi: (
              <>
                Pasang <strong>wa.me/6282136677730 di bio</strong> & wajibkan{" "}
                <strong>stiker tautan WA</strong> di setiap Story Room Tour.
              </>
            ),
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatTile
              label="Klik Tautan Bio"
              value={fmtNum(totKlik)}
              unit="klik"
              sub={`dari ${fmtNum(totKunjungan)} kunjungan profil`}
            />
            <StatTile
              label="Kontak Pesan (DM)"
              value={tp.kontakPesan}
              unit="pesan DM"
              sub={deltaLabelNode(tp.kontakDeltaLabel)}
            />
            <StatTile
              label="Pengunjung Tanpa Aksi"
              value={fmtNum(Math.max(0, totKunjungan - tp.kontakPesan - totKlik))}
              unit="kunjungan"
              sub="Potensi calon penghuni"
            />
          </div>
        </ReportModule>

        <ReportModule
          num="3.3"
          title="Retensi Pengikut"
          insight={{
            fakta: (
              <>
                <Up>+{tp.mengikuti} mengikuti</Up> vs{" "}
                <Down>-{tp.batalMengikuti} batal mengikuti</Down>, total kini{" "}
                <strong>{fmtNum(tp.totalPengikut)} pengikut</strong>.
              </>
            ),
            masalah: isOct ? (
              <>
                <Down>Unfollow naik +41,7%</Down> karena pengunjung dari konten tren tidak menemukan <strong>katalog kamar</strong>.
              </>
            ) : (
              <>
                <strong>12 dari 13 pengikut baru</strong> tergerus <Down>unfollow (-12 pengikut)</Down> sehingga <Up>Net +1 pengikut</Up>.
              </>
            ),
            aksi: (
              <>
                <strong>Pin 3 konten utama</strong> (Room Tour VIP, Pricelist/Lokasi, Testimoni) & aktifkan <strong>Auto-Reply DM</strong>.
              </>
            ),
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatTile
              label="Mengikuti"
              value={`+${tp.mengikuti}`}
              unit="pengikut"
              tone="up"
              sub={deltaLabelNode(tp.mengikutiDeltaLabel)}
            />
            <StatTile
              label="Batal Mengikuti"
              value={`-${tp.batalMengikuti}`}
              unit="pengikut"
              tone="down"
              sub={deltaLabelNode(tp.batalDeltaLabel, true)}
            />
            <StatTile
              label="Pertumbuhan Bersih"
              value={tp.netPengikut >= 0 ? `+${tp.netPengikut}` : `${tp.netPengikut}`}
              unit="pengikut"
              tone={tp.netPengikut > 0 ? "up" : tp.netPengikut < 0 ? "down" : "neutral"}
              sub={`Total ${fmtNum(tp.totalPengikut)} pengikut`}
            />
          </div>
        </ReportModule>
      </ReportSection>

      {/* ============ BAGIAN 4 · AUDIENS ============ */}
      {hasAudiens && (
        <ReportSection
          id={ID.s4}
          num="4"
          title="Audiens"
          summary={
            <>
              Pemirsa didominasi <strong>perempuan (63,2%)</strong> usia{" "}
              <strong>25–34 thn (40,3%)</strong>, sementara segmen{" "}
              <strong>mahasiswa 18–24 thn baru 11,5%</strong> dari <strong>potensi 19,6%</strong>.
            </>
          }
        >
          {d.demografi && (
            <ReportModule
              num={nextAudiensNum()}
              title="Demografi Pemirsa"
              badge={KUMULATIF_BADGE}
              insight={{
                fakta: (
                  <>
                    <strong>Perempuan 63,2%</strong>, usia <strong>25–34 thn 40,3%</strong>; kota teratas <strong>area Yogyakarta (6,5% pemirsa)</strong> dan{" "}
                    <strong>Jakarta (2,6% pemirsa)</strong>.
                  </>
                ),
                masalah: (
                  <>
                    <strong>Mahasiswa 18–24 thn baru 11,5%</strong>, dan ada residu pemirsa luar negeri <strong>(Vietnam 6,9% pemirsa)</strong> dari audio global.
                  </>
                ),
                aksi: (
                  <>
                    Tonjolkan <strong>keamanan CCTV 24 jam & kenyamanan wanita</strong>, serta selalu pasang <strong>geotag Sleman/Yogyakarta</strong>.
                  </>
                ),
              }}
            >
              <Tabs defaultValue="age" className="w-full">
                <TabsList className="mb-3 h-9">
                  <TabsTrigger value="age" className="text-xs">
                    Usia & Gender
                  </TabsTrigger>
                  <TabsTrigger value="cities" className="text-xs">
                    Kota
                  </TabsTrigger>
                  <TabsTrigger value="countries" className="text-xs">
                    Negara
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="age" className="mt-0 h-64">
                  <Bar
                    data={{
                      labels: d.demografi.age_gender.map((r) => `${r.age} thn`),
                      datasets: [
                        {
                          label: "Perempuan",
                          data: d.demografi.age_gender.map((r) => r.Perempuan),
                          backgroundColor: "#E11D48",
                          borderRadius: 4,
                        },
                        {
                          label: "Laki-laki",
                          data: d.demografi.age_gender.map((r) => r.Laki_laki),
                          backgroundColor: "#18181B",
                          borderRadius: 4,
                        },
                      ],
                    }}
                    options={chartOpts("% pemirsa") as never}
                  />
                </TabsContent>
                <TabsContent value="cities" className="mt-0 h-64">
                  <Bar
                    data={{
                      labels: d.demografi.cities.map((c) => c.name.split(",")[0]),
                      datasets: [
                        {
                          label: "Porsi Kota",
                          data: d.demografi.cities.map((c) => c.pct),
                          backgroundColor: "#18181B",
                          borderRadius: 4,
                        },
                      ],
                    }}
                    options={chartOpts("% pemirsa", { indexAxis: "y" as const }) as never}
                  />
                </TabsContent>
                <TabsContent value="countries" className="mt-0 h-64">
                  <Bar
                    data={{
                      labels: d.demografi.countries.map((c) => c.name),
                      datasets: [
                        {
                          label: "Porsi Negara",
                          data: d.demografi.countries.map((c) => c.pct),
                          backgroundColor: "#18181B",
                          borderRadius: 4,
                        },
                      ],
                    }}
                    options={chartOpts("% pemirsa", { indexAxis: "y" as const }) as never}
                  />
                </TabsContent>
              </Tabs>
            </ReportModule>
          )}

          {d.potensial && (
            <ReportModule
              num={nextAudiensNum()}
              title="Pemirsa Potensial"
              badge={KUMULATIF_BADGE}
              insight={{
                fakta: (
                  <>
                    <strong>100% Indonesia</strong> dengan usia <strong>25–34 thn (37,0%)</strong> dan <strong>mahasiswa 18–24 thn (19,6%)</strong>; kota terbesar{" "}
                    <strong>Jakarta (6,99% pemirsa potensial)</strong>.
                  </>
                ),
                masalah: (
                  <>
                    <strong>Perantau Jabodetabek & Bandung</strong> serta{" "}
                    <strong>segmen mahasiswa</strong> belum tergarap oleh konten saat ini.
                  </>
                ),
                aksi: (
                  <>
                    Buat konten <strong>“Pindah kuliah/kerja dari Jakarta & Bandung ke Jogja? Ini kost eksklusif rasa hotel”</strong>.
                  </>
                ),
              }}
            >
              <Tabs defaultValue="pot-age" className="w-full">
                <TabsList className="mb-3 h-9">
                  <TabsTrigger value="pot-age" className="text-xs">
                    Usia & Gender
                  </TabsTrigger>
                  <TabsTrigger value="pot-cities" className="text-xs">
                    Kota
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="pot-age" className="mt-0 h-64">
                  <Bar
                    data={{
                      labels: d.potensial.age_gender.map((r) => `${r.age} thn`),
                      datasets: [
                        {
                          label: "Perempuan",
                          data: d.potensial.age_gender.map((r) => r.Perempuan),
                          backgroundColor: "#E11D48",
                          borderRadius: 4,
                        },
                        {
                          label: "Laki-laki",
                          data: d.potensial.age_gender.map((r) => r.Laki_laki),
                          backgroundColor: "#18181B",
                          borderRadius: 4,
                        },
                      ],
                    }}
                    options={chartOpts("% pemirsa potensial") as never}
                  />
                </TabsContent>
                <TabsContent value="pot-cities" className="mt-0 h-64">
                  <Bar
                    data={{
                      labels: d.potensial.cities.map((c) => c.name.replace(", Indonesia", "")),
                      datasets: [
                        {
                          label: "Porsi Kota",
                          data: d.potensial.cities.map((c) => c.pct),
                          backgroundColor: "#18181B",
                          borderRadius: 4,
                        },
                      ],
                    }}
                    options={chartOpts("% pemirsa potensial", { indexAxis: "y" as const }) as never}
                  />
                </TabsContent>
              </Tabs>
            </ReportModule>
          )}
        </ReportSection>
      )}

      {/* ============ RENCANA 30 HARI ============ */}
      <ReportSection id={ID.rencana} title="Rencana 30 Hari">
        <InteractiveActionPlan
          storageKey={`jl-ig-tasks-${periodKey}`}
          tasks={[
            {
              id: "ig-t1",
              week: "Minggu 1 · Konversi Profil",
              title: "Pasang Tautan WhatsApp di Bio & 3 Konten Sematan",
              masalah: (
                <>
                  Ada <strong>{fmtNum(totKunjungan)} kunjungan profil</strong>, tetapi tautan di bio tercatat{" "}
                  <strong>{totKlik} klik</strong> dan baru menghasilkan{" "}
                  <strong>{tp?.kontakPesan ?? 0} pesan DM</strong> sehingga pengunjung profil tidak lanjut menghubungi WhatsApp.
                </>
              ),
              langkah: (
                <>
                  Pasang tautan WhatsApp langsung (<strong>wa.me/6282136677730</strong>) di bio profil dan sematkan{" "}
                  <strong>3 konten utama</strong> (kamar, fasilitas, daftar harga) di baris paling atas profil.
                </>
              ),
              target: (
                <>
                  Menghasilkan minimal <strong>15–25 klik tautan WhatsApp</strong> dan{" "}
                  <strong>&gt;10 pesan DM tanya kamar</strong> dalam 30 hari.
                </>
              ),
            },
            {
              id: "ig-t2",
              week: "Minggu 2–3 · Konsistensi Konten",
              title: "Jadwal Rutin 3x Reels/Minggu Pukul 18:30–20:30 WIB",
              masalah: (
                <>
                  Jangkauan harian anjlok ke <strong>&lt;60 tayangan/hari</strong> akibat jeda tidak mengunggah konten selama{" "}
                  <strong>12 hari berturut-turut</strong> (9–20 Okt).
                </>
              ),
              langkah: (
                <>
                  Unggah rutin <strong>3x Reels/minggu</strong> pada jam ramai (<strong>pukul 18:30–20:30 WIB</strong>) dengan{" "}
                  <strong>pembuka masalah anak kost</strong> dilanjutkan video fasilitas kamar.
                </>
              ),
              target: (
                <>
                  Menjaga jangkauan harian stabil di atas <strong>100 akun/hari</strong> dan tingkat interaksi{" "}
                  <strong>&gt;5% dari jangkauan</strong>.
                </>
              ),
            },
            {
              id: "ig-t3",
              week: "Minggu 4 · Perluasan Audiens",
              title: "Konten Khusus Calon Perantau Jakarta, Bandung & Surabaya",
              masalah: (
                <>
                  Porsi penonton usia mahasiswa (<strong>18–24 thn</strong>) baru mencapai{" "}
                  <strong>11,5% dari total pemirsa</strong>, jauh di bawah usia 25–34 thn (48,3% pemirsa).
                </>
              ),
              langkah: (
                <>
                  Buat konten panduan jarak kost ke kampus &amp; mal populer di Jogja khusus untuk calon perantau dari{" "}
                  <strong>Jakarta, Bandung, dan Surabaya</strong>.
                </>
              ),
              target: (
                <>
                  Menaikkan porsi pemirsa mahasiswa (<strong>18–24 thn</strong>) dari{" "}
                  <strong>11,5% pemirsa</strong> menjadi <strong>&gt;18% pemirsa</strong>.
                </>
              ),
            },
          ]}
        />
      </ReportSection>
    </div>
  );
}
