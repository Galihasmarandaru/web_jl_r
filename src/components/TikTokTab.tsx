import * as React from "react";
import { AlertTriangle, ArrowRight, ExternalLink } from "lucide-react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  CellUnit,
  chartOpts,
  Down,
  type FunnelStage,
  FunnelSummary,
  InteractiveActionPlan,
  type NavItem,
  ReportModule,
  ReportSection,
  SectionNav,
  SignedNode,
  sliceByRange,
  Up,
} from "@/components/ReportShared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
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
  ringkasan: "tt-ringkasan",
  s1: "tt-s1",
  s2: "tt-s2",
  s3: "tt-s3",
  s4: "tt-s4",
  rencana: "tt-rencana",
};

type TopPost = {
  title: string;
  link: string;
  videoId: string;
  postTime: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isCurrentMonth: boolean;
};

function PostTable({ posts }: { posts: readonly TopPost[] }) {
  const [expanded, setExpanded] = React.useState(false);
  const visible = expanded ? posts : posts.slice(0, 5);
  return (
    <div className="space-y-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">#</TableHead>
            <TableHead>Video</TableHead>
            <TableHead className="text-right">Tayangan</TableHead>
            <TableHead className="text-right">Suka</TableHead>
            <TableHead className="text-right">Komentar</TableHead>
            <TableHead className="text-right">Bagikan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visible.map((p, idx) => (
            <TableRow key={`${p.videoId}-${idx}`}>
              <TableCell className="font-bold tabular-nums">#{idx + 1}</TableCell>
              <TableCell className="max-w-md">
                <div className="font-medium text-foreground line-clamp-1">{p.title}</div>
                <div className="flex flex-wrap items-center gap-2 mt-0.5 text-[11px] text-muted-foreground">
                  <span>
                    {p.isCurrentMonth ? "Bulan ini" : "Evergreen"} · {p.postTime}
                  </span>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 font-semibold text-foreground hover:underline"
                  >
                    Buka <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <CellUnit val={fmtNum(p.views)} unit="tayangan" bold />
              </TableCell>
              <TableCell className="text-right">
                <CellUnit val={fmtNum(p.likes)} unit="suka" />
              </TableCell>
              <TableCell className="text-right">
                <CellUnit val={fmtNum(p.comments)} unit="komentar" />
              </TableCell>
              <TableCell className="text-right">
                <CellUnit val={fmtNum(p.shares)} unit="bagikan" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {posts.length > 5 && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Tampilkan 5 video teratas" : `Lihat semua (${posts.length} video)`}
        </Button>
      )}
    </div>
  );
}

export function TikTokTab({
  periodKey,
  onSwitchPeriod,
}: {
  periodKey: PeriodKey;
  onSwitchPeriod: (p: PeriodKey) => void;
}) {
  const d = REPORT_DATA.tiktok[periodKey];

  if (!d.available) {
    return (
      <Card className="p-8 sm:p-10 text-center space-y-3">
        <div className="flex justify-center">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
        </div>
        <CardTitle className="text-xl">Belum Ada Data TikTok — {d.monthTitle}</CardTitle>
        <CardDescription className="text-sm">Data TikTok tersedia mulai Oktober 2026.</CardDescription>
        <div className="pt-1">
          <Button size="sm" onClick={() => onSwitchPeriod("2026-10")}>
            Buka Oktober 2026 <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    );
  }

  /* ---------- Angka utama ---------- */
  const totViews = sumBy(d.overview, (r) => r.views);
  const totProfileViews = sumBy(d.overview, (r) => r.profileViews);
  const totLikes = sumBy(d.overview, (r) => r.likes);
  const totComments = sumBy(d.overview, (r) => r.comments);
  const totShares = sumBy(d.overview, (r) => r.shares);
  const totInteractions = totLikes + totComments + totShares;
  const pkViews = maxBy(d.overview, (r) => r.views);

  const totViewers = sumBy(d.viewers, (r) => r.total);
  const totNewViewers = sumBy(d.viewers, (r) => r.newViewers);
  const totReturning = sumBy(d.viewers, (r) => r.returning);
  const pkViewers = maxBy(d.viewers, (r) => r.total);
  const newViewersPct = totViewers ? (totNewViewers / totViewers) * 100 : 0;

  const grossNewFollowers = d.followersHistory.reduce((a, r) => a + (r.diff > 0 ? r.diff : 0), 0);
  const unfollows = d.followersHistory.reduce((a, r) => a + (r.diff < 0 ? Math.abs(r.diff) : 0), 0);
  const netFollowers = grossNewFollowers - unfollows;
  const startFollowers = d.followersHistory[0].followers;
  const endFollowers = d.followersHistory[d.followersHistory.length - 1].followers;

  const avgViewsPerDay = d.overview.length ? totViews / d.overview.length : 0;
  const profileVisitRate = totViews ? (totProfileViews / totViews) * 100 : 0;
  const erTikTok = totViews ? (totInteractions / totViews) * 100 : 0;
  const followConv = totProfileViews ? (grossNewFollowers / totProfileViews) * 100 : 0;

  /* ---------- Ringkasan: Corong Konversi ---------- */
  const stages: FunnelStage[] = [
    {
      label: "Tayangan Video",
      value: fmtNum(totViews),
      unit: "tayangan",
      sub: `${avgViewsPerDay.toFixed(1).replace(".", ",")} tayangan/hari`,
      targetId: ID.s1,
    },
    {
      label: "Kunjungan Profil",
      value: fmtNum(totProfileViews),
      unit: "kunjungan",
      sub: `${fmtPct(profileVisitRate, 2)} dari tayangan`,
      targetId: ID.s1,
    },
    {
      label: "Interaksi",
      value: fmtNum(totInteractions),
      unit: "interaksi",
      sub: `ER ${fmtPct(erTikTok, 2)} dari tayangan`,
      targetId: ID.s2,
    },
    {
      label: "Pengikut Baru",
      value: `+${grossNewFollowers}`,
      unit: "pengikut",
      tone: "up",
      sub: (
        <>
          {fmtPct(followConv, 2)} dari profil ·{" "}
          <SignedNode val={netFollowers} prefix="Net " suffix=" pengikut" />
        </>
      ),
      problem: followConv < 5,
      targetId: ID.s3,
    },
  ];

  const navItems: NavItem[] = [
    { id: ID.ringkasan, label: "Ringkasan" },
    { id: ID.s1, label: "1 · Jangkauan" },
    { id: ID.s2, label: "2 · Konten" },
    { id: ID.s3, label: "3 · Konversi" },
    { id: ID.s4, label: "4 · Audiens" },
    { id: ID.rencana, label: "Rencana 30 Hari" },
  ];

  return (
    <div className="space-y-6">
      <SectionNav items={navItems} />

      <FunnelSummary
        id={ID.ringkasan}
        title={`Corong Konversi TikTok — ${d.monthTitle}`}
        periodLabel={d.periodLabel}
        stages={stages}
        summary={
          <>
            Audiens TikTok sangat tepat sasaran (<strong>97,1% Indonesia</strong>,{" "}
            <strong>80,8% usia 18–34 thn</strong>), namun{" "}
            <strong>{fmtNum(totProfileViews)} kunjungan profil</strong> baru menghasilkan{" "}
            <Up>+{grossNewFollowers} pengikut</Up> — prioritas:{" "}
            <strong>TikTok SEO & CTA follow pukul 18:00 WIB</strong>.
          </>
        }
      />

      {/* ============ BAGIAN 1 · JANGKAUAN ============ */}
      <ReportSection
        id={ID.s1}
        num="1"
        title="Jangkauan"
        summary={
          <>
            <strong>{fmtNum(totViews)} tayangan video</strong>, dan{" "}
            <strong>77,9% tayangan</strong> datang dari{" "}
            <strong>Pencarian (42,0% tayangan)</strong> serta{" "}
            <strong>Profil (35,9% tayangan)</strong> — bukan dari FYP.
          </>
        }
      >
        <ReportModule
          num="1.1"
          title="Performa Harian"
          withRange
          insight={{
            fakta: (
              <>
                Puncak <strong>{shortDateID(pkViews.date)}</strong> dengan{" "}
                <strong>{fmtNum(pkViews.views)} tayangan</strong>; total{" "}
                <strong>{totLikes} suka</strong>, <strong>{totComments} komentar</strong>,{" "}
                <strong>{totShares} bagikan</strong>.
              </>
            ),
            masalah: (
              <>
                <strong>Bagikan tinggi ({totShares} bagikan)</strong> tetapi hanya{" "}
                <strong>{totComments} komentar dalam 28 hari</strong>, sehingga distribusi FYP tertahan.
              </>
            ),
            aksi: (
              <>
                Pasang <strong>Pinned Comment</strong>:{" "}
                <strong>“Pilih Kamar VIP (dapur pribadi) atau Deluxe? Komen biar Mimin spill pricelist!”</strong>
              </>
            ),
          }}
        >
          {(range) => {
            const o = sliceByRange(d.overview, range);
            return (
              <div className="h-72 w-full">
                <Bar
                  data={{
                    labels: o.map((r) => shortDateID(r.date)),
                    datasets: [
                      {
                        type: "line" as const,
                        label: "Tayangan Video",
                        data: o.map((r) => r.views),
                        borderColor: "#E11D48",
                        backgroundColor: "rgba(225, 29, 72, 0.08)",
                        fill: true,
                        tension: 0.3,
                        yAxisID: "y",
                      },
                      {
                        type: "bar" as const,
                        label: "Kunjungan Profil",
                        data: o.map((r) => r.profileViews),
                        backgroundColor: "#18181B",
                        borderRadius: 4,
                        yAxisID: "y1",
                      },
                      {
                        type: "bar" as const,
                        label: "Interaksi",
                        data: o.map((r) => r.interactions),
                        backgroundColor: "#A1A1AA",
                        borderRadius: 4,
                        yAxisID: "y1",
                      },
                    ] as never,
                  }}
                  options={
                    chartOpts(
                      {
                        "Tayangan Video": "tayangan",
                        "Kunjungan Profil": "kunjungan",
                        Interaksi: "interaksi",
                      },
                      {
                        scales: {
                          y: { type: "linear", position: "left" },
                          y1: {
                            type: "linear",
                            position: "right",
                            grid: { drawOnChartArea: false },
                          },
                        },
                      }
                    ) as never
                  }
                />
              </div>
            );
          }}
        </ReportModule>

        <ReportModule
          num="1.2"
          title="Sumber Trafik & Kata Kunci Pencarian"
          insight={{
            fakta: (
              <>
                <strong>Pencarian 42,0% tayangan</strong> dan{" "}
                <strong>Profil 35,9% tayangan</strong> mendominasi trafik, sementara{" "}
                <strong>FYP hanya 22,2% tayangan</strong>.
              </>
            ),
            masalah: (
              <>
                Calon penghuni aktif mencari <strong>kost eksklusif</strong>,{" "}
                <strong>kost dekat gym</strong>, dan memastikan <strong>kost bukan hoax</strong>.
              </>
            ),
            aksi: (
              <>
                Pakai <strong>5 kata kunci di bawah</strong> sebagai{" "}
                <strong>teks Hook di layar</strong> dan <strong>kalimat pertama caption</strong>.
              </>
            ),
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-5 space-y-3">
              {d.trafficSource.map((t) => (
                <div key={t.rawName} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground">{t.source}</span>
                    <CellUnit val={fmtPct(t.pct, 1)} unit="tayangan" bold />
                  </div>
                  <Progress value={t.pct} className="h-1.5" />
                </div>
              ))}
            </div>
            <div className="lg:col-span-7">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">#</TableHead>
                    <TableHead>Kata Kunci</TableHead>
                    <TableHead>Maksud Pencarian</TableHead>
                    <TableHead className="text-right">Porsi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {d.searchQueries.map((s, idx) => (
                    <TableRow key={s.query}>
                      <TableCell className="font-bold">#{idx + 1}</TableCell>
                      <TableCell className="font-medium text-foreground">“{s.query}”</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{s.intent}</TableCell>
                      <TableCell className="text-right">
                        <CellUnit val={fmtPct(s.pct, 1)} unit="pencarian" bold />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </ReportModule>
      </ReportSection>

      {/* ============ BAGIAN 2 · KONTEN ============ */}
      <ReportSection
        id={ID.s2}
        num="2"
        title="Konten"
        summary={
          <>
            <strong>Konten Oktober</strong> memimpin tayangan,{" "}
            <strong>konten evergreen (120.246 tayangan)</strong> masih membawa pengikut, dan pemirsa juga menonton <strong>kompetitor kost Jogja</strong>.
          </>
        }
      >
        <ReportModule
          num="2.1"
          title="Konten Terbaik"
          insight={{
            fakta: (
              <>
                Video evergreen{" "}
                <strong>“Kos eksklusif 5 Menit dari Pakuwon Mall” (120.246 tayangan)</strong> masih menyumbang <strong>pengikut baru</strong>.
              </>
            ),
            masalah: (
              <>
                Hanya <strong>{d.topPosts.new_followers.length} video</strong> yang menghasilkan{" "}
                <strong>pengikut baru</strong> selama periode ini.
              </>
            ),
            aksi: (
              <>
                Sematkan video <strong>patokan lokasi & perbandingan tipe kamar</strong> di{" "}
                <strong>3 Pin Profil TikTok</strong>.
              </>
            ),
          }}
        >
          <Tabs defaultValue="most_views" className="w-full">
            <TabsList className="mb-3 flex-wrap h-auto">
              <TabsTrigger value="most_views" className="text-xs">
                Tayangan ({d.topPosts.most_views.length} video)
              </TabsTrigger>
              <TabsTrigger value="most_new_viewers" className="text-xs">
                Pemirsa Baru ({d.topPosts.most_new_viewers.length} video)
              </TabsTrigger>
              <TabsTrigger value="most_likes" className="text-xs">
                Suka ({d.topPosts.most_likes.length} video)
              </TabsTrigger>
              <TabsTrigger value="new_followers" className="text-xs">
                Pengikut Baru ({d.topPosts.new_followers.length} video)
              </TabsTrigger>
            </TabsList>
            <TabsContent value="most_views" className="mt-0">
              <PostTable posts={d.topPosts.most_views} />
            </TabsContent>
            <TabsContent value="most_new_viewers" className="mt-0">
              <PostTable posts={d.topPosts.most_new_viewers} />
            </TabsContent>
            <TabsContent value="most_likes" className="mt-0">
              <PostTable posts={d.topPosts.most_likes} />
            </TabsContent>
            <TabsContent value="new_followers" className="mt-0">
              <PostTable posts={d.topPosts.new_followers} />
            </TabsContent>
          </Tabs>
        </ReportModule>

        <ReportModule
          num="2.2"
          title="Minat Pemirsa & Kompetitor"
          insight={{
            fakta: (
              <>
                Pemirsa juga menonton <strong>JOGJAKOSKU (37K pengikut)</strong>,{" "}
                <strong>travelio_id (22K pengikut)</strong>, dan{" "}
                <strong>Booking.com (5,4M pengikut)</strong>.
              </>
            ),
            masalah: (
              <>
                Video kompetitor <strong>“Full Furnished, Mezzanine, Dapur Pribadi”</strong> meraih{" "}
                <strong>2,1M tayangan</strong> di audiens yang sama.
              </>
            ),
            aksi: (
              <>
                Rilis video tandingan: <strong>“Full Furnished + Dapur Pribadi (VIP) + Gym & Kolam Renang 5–10 Menit dari Kost”</strong>.
              </>
            ),
          }}
        >
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="mb-3">
              <TabsTrigger value="posts" className="text-xs">
                Video ({d.competitorsAndInterests.posts.length} video)
              </TabsTrigger>
              <TabsTrigger value="creators" className="text-xs">
                Kreator ({d.competitorsAndInterests.creators.length} akun)
              </TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">#</TableHead>
                    <TableHead>Kreator</TableHead>
                    <TableHead>Judul Video</TableHead>
                    <TableHead className="text-right">Tayangan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {d.competitorsAndInterests.posts.map((p) => {
                    const numOnly = p.views.replace(/\s*views$/i, "");
                    return (
                      <TableRow key={p.rank} className={p.highlight ? "bg-muted/60" : ""}>
                        <TableCell className="font-bold">#{p.rank}</TableCell>
                        <TableCell className={cn(p.highlight && "font-semibold")}>
                          {p.creator}
                          {p.highlight && (
                            <Badge variant="secondary" className="ml-1.5 text-[10px]">
                              Kompetitor
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="line-clamp-1">{p.title}</TableCell>
                        <TableCell className="text-right">
                          <CellUnit val={numOnly} unit="tayangan" bold />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="creators" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {d.competitorsAndInterests.creators.map((c) => {
                  const numOnly = c.followers.replace(/\s*followers$/i, "");
                  return (
                    <div
                      key={c.name}
                      className={cn(
                        "rounded-lg border p-3.5 space-y-1",
                        c.highlight ? "border-zinc-400" : "border-border"
                      )}
                    >
                      <div className="font-bold text-sm text-foreground">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.category}</div>
                      <div>
                        <CellUnit val={numOnly} unit="pengikut" bold />
                      </div>
                    </div>
                  );
                })}
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
            <strong>{fmtNum(totProfileViews)} kunjungan profil</strong> menghasilkan{" "}
            <Up>+{grossNewFollowers} pengikut baru</Up> (<strong>{fmtPct(followConv, 2)} konversi</strong>), dengan pertumbuhan bersih{" "}
            <SignedNode val={netFollowers} prefix="Net " suffix=" pengikut" />.
          </>
        }
      >
        <ReportModule
          num="3.1"
          title="Pertumbuhan & Profil Pengikut"
          withRange
          insight={{
            fakta: (
              <>
                Pengikut bergerak dari{" "}
                <strong>
                  {fmtNum(startFollowers)} ke {fmtNum(endFollowers)} pengikut
                </strong>{" "}
                (<Up>+{grossNewFollowers} pengikut baru</Up>,{" "}
                <Down>-{unfollows} batal mengikuti</Down>); <strong>58% perempuan</strong>.
              </>
            ),
            masalah: (
              <>
                <strong>64,3% pengikut lama</strong> berasal dari luar Indonesia dan pasif, sehingga tab Following menyumbang <strong>0% tayangan</strong>.
              </>
            ),
            aksi: (
              <>
                Tambahkan CTA di akhir video: <strong>“Follow @jogjalodge untuk update kamar kosong & promo bulanan!”</strong>
              </>
            ),
          }}
        >
          {(range) => {
            const h = sliceByRange(d.followersHistory, range);
            return (
              <Tabs defaultValue="hist" className="w-full">
                <TabsList className="mb-3">
                  <TabsTrigger value="hist" className="text-xs">
                    Riwayat Harian
                  </TabsTrigger>
                  <TabsTrigger value="profile" className="text-xs">
                    Gender & Teritori
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="hist" className="mt-0">
                  <div className="h-64 w-full">
                    <Bar
                      data={{
                        labels: h.map((r) => shortDateID(r.date)),
                        datasets: [
                          {
                            type: "line" as const,
                            label: "Total Pengikut",
                            data: h.map((r) => r.followers),
                            borderColor: "#18181B",
                            tension: 0.2,
                            yAxisID: "y",
                          },
                          {
                            type: "bar" as const,
                            label: "Selisih Harian",
                            data: h.map((r) => r.diff),
                            backgroundColor: h.map((r) => (r.diff >= 0 ? "#A1A1AA" : "#E11D48")),
                            borderRadius: 4,
                            yAxisID: "y1",
                          },
                        ] as never,
                      }}
                      options={
                        chartOpts("pengikut", {
                          scales: {
                            y: {
                              type: "linear",
                              position: "left",
                              min: startFollowers - 2,
                              max: endFollowers + 3,
                            },
                            y1: {
                              type: "linear",
                              position: "right",
                              min: -2,
                              max: 2,
                              grid: { drawOnChartArea: false },
                            },
                          },
                        }) as never
                      }
                    />
                  </div>
                </TabsContent>
                <TabsContent value="profile" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                    <div className="h-56">
                      <Doughnut
                        data={{
                          labels: d.followersGender.map((g) => g.gender),
                          datasets: [
                            {
                              label: "Porsi Gender",
                              data: d.followersGender.map((g) => g.pct),
                              backgroundColor: ["#E11D48", "#18181B", "#D4D4D8"],
                            },
                          ],
                        }}
                        options={chartOpts("% pengikut") as never}
                      />
                    </div>
                    <div className="h-56">
                      <Bar
                        data={{
                          labels: d.followersTerritories.slice(0, 6).map((t) => t.code),
                          datasets: [
                            {
                              label: "Porsi Teritori",
                              data: d.followersTerritories.slice(0, 6).map((t) => t.pct),
                              backgroundColor: "#18181B",
                              borderRadius: 4,
                            },
                          ],
                        }}
                        options={chartOpts("% pengikut", { indexAxis: "y" as const }) as never}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            );
          }}
        </ReportModule>
      </ReportSection>

      {/* ============ BAGIAN 4 · AUDIENS ============ */}
      <ReportSection
        id={ID.s4}
        num="4"
        title="Audiens"
        summary={
          <>
            <strong>{fmtPct(newViewersPct, 1)} pemirsa</strong> adalah penonton baru,{" "}
            <strong>97,1% pemirsa berada di Indonesia</strong>, dan paling aktif pukul{" "}
            <strong>19:00–20:00 WIB (171 pengikut aktif)</strong>.
          </>
        }
      >
        <ReportModule
          num="4.1"
          title="Pemirsa Baru vs Kembali"
          withRange
          insight={{
            fakta: (
              <>
                <strong>{fmtNum(totNewViewers)} pemirsa baru</strong> vs{" "}
                <strong>{fmtNum(totReturning)} pemirsa kembali</strong>, dengan puncak{" "}
                <strong>{shortDateID(pkViewers.date)} ({fmtNum(pkViewers.total)} pemirsa)</strong>.
              </>
            ),
            masalah: (
              <>
                Penonton yang kembali di hari biasa hanya <strong>8–27 pemirsa/hari</strong>.
              </>
            ),
            aksi: (
              <>
                Buat <strong>konten berseri</strong> (Part 1 Kamar Deluxe, Part 2 Kamar VIP & Dapur Pribadi) agar <strong>pemirsa baru kembali</strong>.
              </>
            ),
          }}
        >
          {(range) => {
            const v = sliceByRange(d.viewers, range);
            return (
              <div className="h-64 w-full">
                <Bar
                  data={{
                    labels: v.map((r) => shortDateID(r.date)),
                    datasets: [
                      {
                        label: "Pemirsa Baru",
                        data: v.map((r) => r.newViewers),
                        backgroundColor: "#E11D48",
                        borderRadius: 3,
                      },
                      {
                        label: "Pemirsa Kembali",
                        data: v.map((r) => r.returning),
                        backgroundColor: "#18181B",
                        borderRadius: 3,
                      },
                    ],
                  }}
                  options={
                    chartOpts("pemirsa", {
                      scales: { x: { stacked: true }, y: { stacked: true } },
                    }) as never
                  }
                />
              </div>
            );
          }}
        </ReportModule>

        <ReportModule
          num="4.2"
          title="Demografi Pemirsa (30 Hari)"
          insight={{
            fakta: (
              <>
                <strong>Perempuan 68%</strong>; usia <strong>25–34 thn 54,6%</strong> dan{" "}
                <strong>18–24 thn 26,2%</strong>; <strong>97,1% pemirsa di Indonesia</strong>.
              </>
            ),
            masalah: (
              <>
                Porsi <strong>mahasiswa (26,2% pemirsa)</strong> dan{" "}
                <strong>perempuan (68% pemirsa)</strong> jauh lebih tinggi dari Instagram, tetapi pesan konten belum menyasar mereka.
              </>
            ),
            aksi: (
              <>
                Tonjolkan <strong>keamanan 24 jam</strong>, <strong>kebersihan</strong>,{" "}
                <strong>meja belajar/WFH</strong>, dan <strong>Wi-Fi cepat</strong> untuk mahasiswi & karyawati.
              </>
            ),
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="h-56">
              <Doughnut
                data={{
                  labels: d.viewersDemographics.gender.map((g) => g.label),
                  datasets: [
                    {
                      label: "Porsi Gender",
                      data: d.viewersDemographics.gender.map((g) => g.pct),
                      backgroundColor: ["#E11D48", "#18181B", "#D4D4D8"],
                    },
                  ],
                }}
                options={chartOpts("% pemirsa") as never}
              />
            </div>
            <div className="h-56">
              <Bar
                data={{
                  labels: d.viewersDemographics.age.map((a) => `${a.age} thn`),
                  datasets: [
                    {
                      label: "Porsi Usia",
                      data: d.viewersDemographics.age.map((a) => a.pct),
                      backgroundColor: "#18181B",
                      borderRadius: 4,
                    },
                  ],
                }}
                options={chartOpts("% pemirsa") as never}
              />
            </div>
          </div>
        </ReportModule>

        <ReportModule
          num="4.3"
          title="Waktu Aktif Pengikut"
          insight={{
            fakta: (
              <>
                Puncak pukul <strong>19:00–20:00 WIB (hingga 171 pengikut aktif)</strong>, puncak kedua pukul <strong>11:00–12:00 WIB (146 pengikut aktif)</strong>.
              </>
            ),
            masalah: (
              <>
                Unggahan <strong>di luar jam puncak</strong> kehilangan momentum indeksasi awal algoritma.
              </>
            ),
            aksi: (
              <>
                Tetapkan jam tayang <strong>18:00–18:30 WIB (utama)</strong> dan{" "}
                <strong>11:00 WIB (cadangan)</strong>.
              </>
            ),
          }}
        >
          <div className="h-64 w-full">
            <Bar
              data={{
                labels: d.followersActivity.hourlyAvg.map((h) => h.hour),
                datasets: [
                  {
                    label: "Rata-rata Aktif",
                    data: d.followersActivity.hourlyAvg.map((h) => h.avgActive),
                    backgroundColor: d.followersActivity.hourlyAvg.map((h) =>
                      h.avgActive >= 150 ? "#E11D48" : "#D4D4D8"
                    ),
                    borderRadius: 4,
                  },
                ],
              }}
              options={chartOpts("pengikut aktif") as never}
            />
          </div>
        </ReportModule>
      </ReportSection>

      {/* ============ RENCANA 30 HARI ============ */}
      <ReportSection id={ID.rencana} title="Rencana 30 Hari">
        <InteractiveActionPlan
          storageKey={`jl-tt-tasks-${periodKey}`}
          tasks={[
            {
              id: "tt-1",
              week: "Minggu 1 · Jangkauan Pencarian",
              title: "3 Video dengan Kata Kunci Pencarian TikTok (TikTok SEO)",
              masalah: (
                <>
                  <strong>Pencarian sudah menyumbang 42,0% tayangan</strong>, tetapi kata kunci yang dicari calon penghuni (
                  <strong>“perbedaan kost exclusive dan biasa”</strong>, <strong>“kos kosan jogja deket gym”</strong>,{" "}
                  <strong>“akun kost hoax jogja”</strong>) belum dijawab oleh video khusus.
                </>
              ),
              langkah: (
                <>
                  Unggah <strong>3 video</strong> yang menjawab masing-masing kata kunci tersebut, dan pakai kata kuncinya sebagai{" "}
                  <strong>teks layar 3 detik pertama</strong> serta <strong>kalimat pertama takarir</strong>.
                </>
              ),
              target: (
                <>
                  Menaikkan total tayangan dari <strong>{fmtNum(totViews)} tayangan</strong> menjadi{" "}
                  <strong>&gt;6.000 tayangan</strong> dengan porsi pencarian tetap <strong>&gt;40% tayangan</strong>.
                </>
              ),
            },
            {
              id: "tt-2",
              week: "Minggu 2–3 · Konsistensi Konten",
              title: "Video Tur Kamar Berseri (Deluxe → VIP) Pukul 18:00 WIB",
              masalah: (
                <>
                  Rata-rata baru <strong>{avgViewsPerDay.toFixed(1).replace(".", ",")} tayangan/hari</strong> dan penonton yang kembali di hari biasa hanya{" "}
                  <strong>8–27 pemirsa/hari</strong>.
                </>
              ),
              langkah: (
                <>
                  Unggah video tur kamar berseri (<strong>Part 1 Deluxe, Part 2 VIP + dapur pribadi</strong>) setiap{" "}
                  <strong>pukul 18:00 WIB</strong> dengan patokan lokasi <strong>“5 menit dari Pakuwon Mall”</strong>.
                </>
              ),
              target: (
                <>
                  Rata-rata di atas <strong>250 tayangan/hari</strong> dan penonton kembali{" "}
                  <strong>&gt;40 pemirsa/hari</strong>.
                </>
              ),
            },
            {
              id: "tt-3",
              week: "Minggu 4 · Konversi Pengikut & WA",
              title: "Sematkan Komentar Harga & Ajakan Hubungi WhatsApp",
              masalah: (
                <>
                  Ada <strong>{fmtNum(totProfileViews)} kunjungan profil</strong> dan{" "}
                  <strong>{totComments} komentar</strong> dalam 30 hari, tetapi baru menghasilkan{" "}
                  <Up>+{grossNewFollowers} pengikut baru</Up> ({fmtPct(followConv, 2)} dari kunjungan profil).
                </>
              ),
              langkah: (
                <>
                  Sematkan komentar berisi <strong>kisaran harga kamar + nomor WhatsApp (0821-3667-7730)</strong> di setiap video populer dan tambahkan ajakan mengikuti akun di akhir video.
                </>
              ),
              target: (
                <>
                  Meningkatkan konversi kunjungan profil menjadi minimal <strong>+25 pengikut baru/bulan</strong> dan{" "}
                  <strong>&gt;15 komentar tanya kamar</strong>.
                </>
              ),
            },
          ]}
        />
      </ReportSection>
    </div>
  );
}
