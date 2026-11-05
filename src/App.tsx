import * as React from "react";
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import {
  BarChart3,
  Calendar,
  CalendarDays,
  Check,
  ChevronsUpDown,
  ExternalLink,
  Printer,
} from "lucide-react";
import { SiInstagram, SiTiktok } from "react-icons/si";
import { ContentScheduleView } from "@/components/ContentScheduleView";
import { InstagramTab } from "@/components/InstagramTab";
import { TikTokTab } from "@/components/TikTokTab";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarCloseButton,
} from "@/components/ui/sidebar";
import { type PeriodKey, REPORT_DATA } from "@/data/reportData";
import { cn } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  LineController,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

type PlatformKey = "instagram" | "tiktok";

export function App() {
  const [periodKey, setPeriodKey] = React.useState<PeriodKey>(REPORT_DATA.defaultPeriod);
  const [platform, setPlatform] = React.useState<PlatformKey>("instagram");
  const [activeView, setActiveView] = React.useState<"report" | "schedule">("report");
  const [platformOpen, setPlatformOpen] = React.useState(false);
  const [periodOpen, setPeriodOpen] = React.useState(false);

  const igData = REPORT_DATA.instagram[periodKey];
  const ttData = REPORT_DATA.tiktok[periodKey];

  const activePeriodMeta =
    REPORT_DATA.periods.find((p) => p.key === periodKey) ?? REPORT_DATA.periods[0];

  const platformOptions: {
    key: PlatformKey;
    label: string;
    handle: string;
    available: boolean;
    icon: React.ReactNode;
  }[] = [
    {
      key: "instagram",
      label: "Instagram",
      handle: "@jogjalodge",
      available: true,
      icon: <SiInstagram className="h-4 w-4 text-[#E4405F] shrink-0" />,
    },
    {
      key: "tiktok",
      label: "TikTok",
      handle: "@jogjalodge",
      available: ttData.available,
      icon: <SiTiktok className="h-4 w-4 text-zinc-900 shrink-0" />,
    },
  ];

  const activePlatformMeta =
    platformOptions.find((p) => p.key === platform) ?? platformOptions[0];

  return (
    <SidebarProvider defaultOpen={true}>
      {/* SHADCN SIDEBAR */}
      <Sidebar collapsible="offcanvas" className="no-print">
        {/* SIDEBAR HEADER: LOGO & BRAND */}
        <SidebarHeader className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 px-2 rounded-xl border border-border bg-muted/40 flex items-center justify-center shrink-0">
                <img
                  src="/logo.png"
                  alt="Jogja Lodge Kost"
                  className="h-7 w-auto object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-extrabold tracking-tight text-foreground truncate">
                  JOGJA LODGE KOST
                </div>
                <Badge variant="brand" className="text-[9px] px-1.5 py-0 mt-0.5 font-bold">
                  Eksklusif Campur
                </Badge>
              </div>
            </div>
            <SidebarCloseButton className="shrink-0" />
          </div>
        </SidebarHeader>

        {/* SIDEBAR CONTENT: NAVIGATION MENU */}
        <SidebarContent className="p-3 space-y-4">
          <SidebarGroup>
            <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 mb-1">
              Navigasi Halaman
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* MENU 1: LAPORAN ANALISIS */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeView === "report"}
                    onClick={() => setActiveView("report")}
                    className="h-11 px-3 font-semibold cursor-pointer"
                  >
                    <BarChart3 className="h-4 w-4 shrink-0 text-foreground" />
                    <div className="flex flex-col text-left min-w-0">
                      <span className="text-xs sm:text-sm font-bold truncate">
                        Laporan Analisis
                      </span>
                      <span className="text-[10px] text-muted-foreground font-normal truncate">
                        Corong konversi IG &amp; TikTok
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* MENU 2: JADWAL KONTEN */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activeView === "schedule"}
                    onClick={() => setActiveView("schedule")}
                    className="h-11 px-3 font-semibold cursor-pointer"
                  >
                    <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
                    <div className="flex flex-col text-left min-w-0">
                      <span className="text-xs sm:text-sm font-bold truncate">
                        Jadwal Konten
                      </span>
                      <span className="text-[10px] text-muted-foreground font-normal truncate">
                        Kalender Publikasi
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* SIDEBAR FOOTER */}
        <SidebarFooter className="p-3 border-t border-border mt-auto bg-card text-[11px] text-muted-foreground">
          <div className="flex items-center justify-between">
            <span className="font-medium">Jogja Lodge Kost</span>
            <span className="font-bold text-foreground">v1.2</span>
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* MAIN INSET CONTENT */}
      <SidebarInset className="min-w-0 flex flex-col bg-background">
        {/* SLIM, TIDY TOP HEADER (NO MORE CLUTTER!) */}
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-card/95 backdrop-blur-xs px-4 sm:px-6 no-print">
          {/* LEFT: SIDEBAR TOGGLE + BREADCRUMB CONTEXT */}
          <div className="flex items-center gap-3 min-w-0">
            <SidebarTrigger />
            <div className="h-4 w-px bg-border hidden sm:block shrink-0" />
            <div className="flex items-center gap-2 text-xs sm:text-sm min-w-0">
              {activeView === "report" ? (
                <>
                  <span className="text-muted-foreground hidden sm:inline truncate">
                    Laporan Analisis
                  </span>
                  <span className="text-muted-foreground hidden sm:inline">/</span>
                  <span className="font-bold text-foreground capitalize flex items-center gap-1.5 shrink-0">
                    {platform === "instagram" ? (
                      <SiInstagram className="h-3.5 w-3.5 text-[#E4405F]" />
                    ) : (
                      <SiTiktok className="h-3.5 w-3.5 text-zinc-900" />
                    )}
                    {activePlatformMeta.label}
                  </span>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-medium shrink-0">
                    {igData.monthTitle}
                  </Badge>
                </>
              ) : (
                <>
                  <span className="text-muted-foreground hidden sm:inline truncate">
                    Perencanaan Konten
                  </span>
                  <span className="text-muted-foreground hidden sm:inline">/</span>
                  <span className="font-bold text-foreground shrink-0">
                    Jadwal Konten
                  </span>
                  <Badge variant="brand" className="text-[10px] px-1.5 py-0 font-medium shrink-0">
                    November 2026
                  </Badge>
                </>
              )}
            </div>
          </div>

          {/* RIGHT: PLATFORM POPOVER + PERIOD POPOVER (only in report mode) + PRINT */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {activeView === "report" && (
              <>
                {/* POPOVER 1: PLATFORM SELECTOR */}
                <Popover open={platformOpen} onOpenChange={setPlatformOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={platformOpen}
                      className="h-8 sm:h-9 px-2 sm:px-3 justify-between gap-1.5 sm:gap-2 bg-card hover:bg-muted/60 border-border text-xs sm:text-sm font-medium cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5 sm:gap-2">
                        {platform === "instagram" ? (
                          <SiInstagram className="h-3.5 w-3.5 text-[#E4405F] shrink-0" />
                        ) : (
                          <SiTiktok className="h-3.5 w-3.5 text-zinc-900 shrink-0" />
                        )}
                        <span className="text-muted-foreground hidden lg:inline">Platform:</span>
                        <span className="font-bold text-foreground">{activePlatformMeta.label}</span>
                        {!activePlatformMeta.available && (
                          <Badge variant="secondary" className="text-[9px] px-1 py-0 font-medium hidden sm:inline">
                            Kosong
                          </Badge>
                        )}
                      </span>
                      <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground shrink-0 opacity-70" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent align="end" className="w-72 p-2">
                    <div className="px-2.5 py-1.5 border-b border-border mb-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Pilih Platform
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        Periode aktif: {igData.monthTitle}
                      </div>
                    </div>

                    <div className="space-y-1">
                      {platformOptions.map((item) => {
                        const isSelected = item.key === platform;
                        return (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => {
                              setPlatform(item.key);
                              setPlatformOpen(false);
                            }}
                            className={cn(
                              "w-full flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left transition-colors cursor-pointer",
                              isSelected
                                ? "bg-accent text-accent-foreground"
                                : "hover:bg-muted/70 text-foreground"
                            )}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
                                {item.icon}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs sm:text-sm font-bold">{item.label}</span>
                                  <span className="text-[11px] text-muted-foreground">{item.handle}</span>
                                </div>
                                <div className="pt-0.5">
                                  <Badge
                                    variant={item.available ? "success" : "secondary"}
                                    className="text-[10px] px-1.5 py-0"
                                  >
                                    {item.available ? "Data Tersedia" : "Kosong di periode ini"}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div
                              className={cn(
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                                isSelected ? "bg-primary text-white" : "text-transparent"
                              )}
                            >
                              <Check className="h-3 w-3" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>

                {/* POPOVER 2: PERIOD SELECTOR */}
                <Popover open={periodOpen} onOpenChange={setPeriodOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={periodOpen}
                      className="h-8 sm:h-9 px-2 sm:px-3 justify-between gap-1.5 sm:gap-2 bg-card hover:bg-muted/60 border-border text-xs sm:text-sm font-medium cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5 sm:gap-2">
                        <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="text-muted-foreground hidden lg:inline">Periode:</span>
                        <span className="font-bold text-foreground truncate max-w-[85px] sm:max-w-none">
                          {activePeriodMeta.label}
                        </span>
                      </span>
                      <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground shrink-0 opacity-70" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent align="end" className="w-80 p-2">
                    <div className="px-2.5 py-1.5 border-b border-border mb-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Pilih Periode Laporan
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        Mengatur data untuk Instagram &amp; TikTok
                      </div>
                    </div>

                    <div className="space-y-1">
                      {REPORT_DATA.periods.map((p) => {
                        const isSelected = p.key === periodKey;
                        return (
                          <button
                            key={p.key}
                            type="button"
                            onClick={() => {
                              setPeriodKey(p.key);
                              setPeriodOpen(false);
                            }}
                            className={cn(
                              "w-full flex items-start justify-between gap-2 rounded-lg px-2.5 py-2 text-left transition-colors cursor-pointer",
                              isSelected
                                ? "bg-accent text-accent-foreground"
                                : "hover:bg-muted/70 text-foreground"
                            )}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs sm:text-sm font-bold">{p.label}</span>
                                {p.key === REPORT_DATA.defaultPeriod && (
                                  <Badge variant="brand" className="text-[10px] px-1.5 py-0">
                                    Terbaru
                                  </Badge>
                                )}
                              </div>
                              <div className="text-[11px] text-muted-foreground">{p.sub}</div>
                              <div className="flex items-center gap-1.5 pt-0.5">
                                <Badge variant="success" className="text-[10px] px-1.5 py-0 gap-1">
                                  <SiInstagram className="h-2.5 w-2.5" /> IG Tersedia
                                </Badge>
                                <Badge
                                  variant={p.hasTT ? "success" : "secondary"}
                                  className="text-[10px] px-1.5 py-0 gap-1"
                                >
                                  <SiTiktok className="h-2.5 w-2.5" />{" "}
                                  {p.hasTT ? "TikTok Tersedia" : "TikTok Kosong"}
                                </Badge>
                              </div>
                            </div>

                            <div
                              className={cn(
                                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                                isSelected ? "bg-primary text-white" : "text-transparent"
                              )}
                            >
                              <Check className="h-3 w-3" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            )}

            {/* PRINT PDF BUTTON */}
            <Button
              size="sm"
              onClick={() => window.print()}
              className="h-8 sm:h-9 px-2.5 sm:px-3 text-xs gap-1.5 cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Cetak PDF</span>
            </Button>
          </div>
        </header>

        {/* MAIN BODY CONTAINER */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-12 flex-1 w-full">
          {activeView === "schedule" ? (
            <ContentScheduleView onBackToReport={() => setActiveView("report")} />
          ) : platform === "instagram" ? (
            <InstagramTab periodKey={periodKey} />
          ) : (
            <TikTokTab periodKey={periodKey} onSwitchPeriod={setPeriodKey} />
          )}
        </main>

        {/* FOOTER */}
        <footer className="border-t border-border bg-card py-5 mt-auto no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <div>
              <strong className="text-foreground">Jogja Lodge Kost</strong> — Laporan Performa Media Sosial &amp; Corong Konversi
            </div>

            {/* DYNAMIC DATA SOURCE LINKS */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
              <span className="text-muted-foreground font-medium">Sumber:</span>

              {/* INSTAGRAM SOURCE */}
              {(activeView === "schedule" || platform === "instagram") && (
                <a
                  href="https://business.facebook.com/latest/insights/overview?business_id=2049241912089830&asset_id=108529568964197&time_range=%257B%2522end%2522%253A%25222026-10-31%2522%252C%2522start%2522%253A%25222026-10-01%2522%257D&audience_tab=potential_audience"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-foreground hover:text-primary hover:underline transition-colors cursor-pointer"
                  title="Buka dashboard resmi Meta Business Suite Insights (Instagram)"
                >
                  <SiInstagram className="h-3.5 w-3.5 text-[#E4405F]" />
                  <span>Instagram Insights</span>
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              )}

              {/* SEPARATOR IF BOTH ARE SHOWN */}
              {activeView === "schedule" && (
                <span className="text-muted-foreground/50">·</span>
              )}

              {/* TIKTOK SOURCE */}
              {(activeView === "schedule" || platform === "tiktok") && (
                <a
                  href="https://www.tiktok.com/tiktokstudio/analytics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-foreground hover:text-primary hover:underline transition-colors cursor-pointer"
                  title="Buka dashboard resmi TikTok Studio Analytics"
                >
                  <SiTiktok className="h-3.5 w-3.5 text-zinc-900" />
                  <span>TikTok Analytics</span>
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              )}
            </div>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
