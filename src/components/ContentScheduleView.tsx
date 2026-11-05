import * as React from "react";
import {
  ArrowLeftRight,
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Clock,
  Eye,
  Layers,
  List,
  RotateCcw,
  Trash2,
  X,
} from "lucide-react";
import { SiInstagram, SiTiktok } from "react-icons/si";
import {
  CONTENT_IDEAS,
  type ContentIdea,
  DEFAULT_SCHEDULE_MAP,
  loadSchedule,
  saveSchedule,
} from "@/data/contentIdeas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const MONTH_NAMES_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const DAY_NAMES_SHORT = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const DAY_NAMES_FULL = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

export function ContentScheduleView({
  onBackToReport,
}: {
  onBackToReport: () => void;
}) {
  // Default to November 2026 (month index 10)
  const [currentYear, setCurrentYear] = React.useState(2026);
  const [currentMonth, setCurrentMonth] = React.useState(10); // 0-indexed: 10 = November
  const [viewMode, setViewMode] = React.useState<"calendar" | "table">("calendar");

  const [schedule, setSchedule] = React.useState<Record<string, number | null>>(loadSchedule);
  const [selectedIdeaDetail, setSelectedIdeaDetail] = React.useState<{
    idea: ContentIdea;
    dateStr: string;
  } | null>(null);
  const [resetConfirmOpen, setResetConfirmOpen] = React.useState(false);

  // Sync to localStorage
  const updateSchedule = React.useCallback(
    (updater: (prev: Record<string, number | null>) => Record<string, number | null>) => {
      setSchedule((prev) => {
        const next = updater(prev);
        saveSchedule(next);
        return next;
      });
    },
    []
  );

  const handleSetContent = (dateStr: string, ideaIdStr: string) => {
    const ideaId = ideaIdStr === "none" ? null : parseInt(ideaIdStr, 10);
    updateSchedule((prev) => ({
      ...prev,
      [dateStr]: ideaId,
    }));
  };

  const handleResetToDefault = () => {
    updateSchedule(() => ({ ...DEFAULT_SCHEDULE_MAP }));
    setResetConfirmOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  // Calendar math
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday
  // Convert to Monday=0, Sunday=6
  const startOffset = (firstDayOfWeek + 6) % 7;

  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  // Statistics for the currently selected month
  const monthPrefix = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`;
  const scheduledInThisMonth = Object.entries(schedule).filter(
    ([d, id]) => d.startsWith(monthPrefix) && id !== null
  );

  const igCount = scheduledInThisMonth.filter(([_, id]) => {
    const idea = CONTENT_IDEAS.find((i) => i.id === id);
    return idea?.platform === "instagram";
  }).length;

  const ttCount = scheduledInThisMonth.filter(([_, id]) => {
    const idea = CONTENT_IDEAS.find((i) => i.id === id);
    return idea?.platform === "tiktok";
  }).length;

  const isDefaultNovember = currentYear === 2026 && currentMonth === 10;

  return (
    <div className="space-y-6 pt-2 pb-12">
      {/* TOP HEADER CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border p-4 sm:p-5 rounded-2xl shadow-xs">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="brand" className="gap-1 font-bold">
              <CalendarIcon className="h-3 w-3" /> Jadwal Konten
            </Badge>
            <span className="text-xs text-muted-foreground">
              Berdasarkan Rencana 30 Hari &amp; Data IDE.md
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1 text-foreground">
            Kalender Publikasi Media Sosial
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Setiap tanggal dapat langsung diganti kontennya menggunakan Popover pilihan atau dikosongkan. Perubahan tersimpan otomatis.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* VIEW MODE TOGGLE (SHADCN TABS) */}
          <Tabs
            value={viewMode}
            onValueChange={(val) => setViewMode(val as "calendar" | "table")}
          >
            <TabsList className="h-8 p-0.5 bg-muted/60">
              <TabsTrigger
                value="calendar"
                className="h-7 px-3 text-xs gap-1.5 font-bold cursor-pointer"
              >
                <CalendarIcon className="h-3.5 w-3.5" /> Kalender
              </TabsTrigger>
              <TabsTrigger
                value="table"
                className="h-7 px-3 text-xs gap-1.5 font-bold cursor-pointer"
              >
                <List className="h-3.5 w-3.5" /> Tabel Daftar
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* RESET BUTTON */}
          <Popover open={resetConfirmOpen} onOpenChange={setResetConfirmOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset Default
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-72 p-3">
              <div className="text-xs font-bold text-foreground mb-1">
                Kembalikan ke Jadwal Default?
              </div>
              <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">
                Semua perubahan jadwal yang Anda lakukan akan direset kembali ke susunan awal jadwal IDE.md (10 konten per bulan, mayoritas Instagram).
              </p>
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs cursor-pointer"
                  onClick={() => setResetConfirmOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-7 text-xs font-bold cursor-pointer"
                  onClick={handleResetToDefault}
                >
                  Ya, Reset
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* MONTH NAVIGATOR & STATS BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/30 border border-border/80 px-4 py-3 rounded-xl">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevMonth}
            className="h-8 w-8 rounded-lg cursor-pointer"
            title="Bulan Sebelumnya"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="min-w-44 text-center">
            <span className="text-base font-extrabold text-foreground">
              {MONTH_NAMES_ID[currentMonth]} {currentYear}
            </span>
            {isDefaultNovember && (
              <Badge variant="brand" className="ml-2 text-[10px] px-1.5 py-0 font-bold">
                Jadwal Aktif
              </Badge>
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNextMonth}
            className="h-8 w-8 rounded-lg cursor-pointer"
            title="Bulan Berikutnya"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {!isDefaultNovember && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setCurrentYear(2026);
                setCurrentMonth(10);
              }}
              className="text-xs h-7 text-primary font-bold hover:underline cursor-pointer"
            >
              Ke Nov 2026
            </Button>
          )}
        </div>

        {/* STATS CHIPS */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
            <Layers className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Total Jadwal:</span>
            <span className="font-bold text-foreground">
              {scheduledInThisMonth.length} Konten
            </span>
          </div>

          <div className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
            <SiInstagram className="h-3.5 w-3.5 text-[#E4405F]" />
            <span className="text-muted-foreground">Instagram:</span>
            <span className="font-bold text-foreground">{igCount}</span>
          </div>

          <div className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
            <SiTiktok className="h-3.5 w-3.5 text-zinc-900" />
            <span className="text-muted-foreground">TikTok:</span>
            <span className="font-bold text-foreground">{ttCount}</span>
          </div>

          <div className="rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">Hari Bebas:</span>
            <span className="font-bold text-foreground">
              {Math.max(0, daysInMonth - scheduledInThisMonth.length)} Hari
            </span>
          </div>
        </div>
      </div>

      {/* VIEW: CALENDAR GRID */}
      {viewMode === "calendar" ? (
        <Card className="overflow-hidden border border-border">
          {/* MOBILE SWIPE AFFORDANCE HINT */}
          <div className="md:hidden flex items-center justify-between text-[11px] text-muted-foreground bg-muted/40 px-3 py-2 border-b border-border">
            <span className="flex items-center gap-1.5 font-medium">
              ↔ <span>Geser kalender ke samping</span>
            </span>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className="text-primary font-bold hover:underline cursor-pointer"
            >
              Lihat Mode Tabel →
            </button>
          </div>

          <CardContent className="p-0 overflow-x-auto">
            <div className="min-w-[720px] lg:min-w-0">
              {/* DAY HEADERS */}
              <div className="grid grid-cols-7 border-b border-border bg-muted/60 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground py-2.5">
              {DAY_NAMES_SHORT.map((day, idx) => (
                <div key={day} className={cn(idx >= 5 && "text-rose-600/90")}>
                  {day}
                </div>
              ))}
            </div>

            {/* CALENDAR CELLS */}
            <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-border bg-border/40">
              {/* PADDING PREVIOUS MONTH */}
              {Array.from({ length: startOffset }).map((_, i) => {
                const dayNum = prevMonthDays - startOffset + i + 1;
                return (
                  <div
                    key={`prev-${i}`}
                    className="min-h-36 bg-muted/20 p-2 text-muted-foreground/40 select-none"
                  >
                    <span className="text-xs font-medium">{dayNum}</span>
                  </div>
                );
              })}

              {/* CURRENT MONTH DAYS */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
                  2,
                  "0"
                )}-${String(dayNum).padStart(2, "0")}`;
                const ideaId = schedule[dateStr];
                const idea = ideaId ? CONTENT_IDEAS.find((item) => item.id === ideaId) : null;
                const dayOfWeek = (startOffset + i) % 7;
                const isWeekend = dayOfWeek >= 5;

                return (
                  <div
                    key={dateStr}
                    className={cn(
                      "min-h-40 bg-card p-2 flex flex-col justify-between transition-colors hover:bg-muted/15 relative group",
                      idea && "bg-muted/5"
                    )}
                  >
                    {/* DATE HEADER + DAY LABEL */}
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={cn(
                            "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                            idea
                              ? "bg-foreground text-background"
                              : isWeekend
                                ? "text-rose-600 bg-rose-50"
                                : "text-foreground"
                          )}
                        >
                          {dayNum}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-medium hidden sm:inline">
                          {DAY_NAMES_SHORT[dayOfWeek]}
                        </span>
                      </div>

                      {/* QUICK HEADER ACTIONS */}
                      {idea ? (
                        <div className="flex items-center gap-0.5">
                          {/* QUICK CHANGE BUTTON WITH POPOVER */}
                          <IdeaSelector
                            currentIdeaId={idea.id}
                            onSelectIdea={(id) => handleSetContent(dateStr, id)}
                            scheduleMap={schedule}
                            currentYear={currentYear}
                            currentMonth={currentMonth}
                            trigger={
                              <button
                                type="button"
                                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border border-border/80 bg-card text-[10px] font-bold text-foreground hover:bg-muted hover:border-foreground/30 transition-colors cursor-pointer shadow-2xs"
                                title="Ganti ide konten ini langsung lewat popover"
                              >
                                <ArrowLeftRight className="h-2.5 w-2.5 text-primary" />
                                <span>Ganti</span>
                              </button>
                            }
                          />

                          {/* QUICK DELETE BUTTON */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSetContent(dateStr, "none");
                            }}
                            className="p-1 rounded-md text-muted-foreground/60 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Hapus / kosongkan jadwal pada tanggal ini"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <IdeaSelector
                          currentIdeaId={null}
                          onSelectIdea={(id) => handleSetContent(dateStr, id)}
                          scheduleMap={schedule}
                          currentYear={currentYear}
                          currentMonth={currentMonth}
                          trigger={
                            <button
                              type="button"
                              className="text-[10px] font-semibold text-muted-foreground/60 hover:text-foreground transition-colors cursor-pointer px-1 py-0.5"
                              title="Pilih konten untuk tanggal ini"
                            >
                              + Jadwal
                            </button>
                          }
                        />
                      )}
                    </div>

                    {/* CONTENT BODY IF ASSIGNED */}
                    {idea ? (
                      <div
                        className={cn(
                          "rounded-xl border p-2 text-left transition-all hover:shadow-xs flex-1 flex flex-col justify-between gap-1.5",
                          idea.platform === "instagram"
                            ? "bg-rose-50/50 border-rose-200/90 hover:border-rose-300"
                            : "bg-zinc-100/70 border-zinc-300/90 hover:border-zinc-400"
                        )}
                      >
                        <div className="space-y-1">
                          {/* PLATFORM & PILAR */}
                          <div className="flex items-center justify-between gap-1">
                            <span className="flex items-center gap-1.5 text-[11px] font-bold">
                              {idea.platform === "instagram" ? (
                                <SiInstagram className="h-3.5 w-3.5 text-[#E4405F] shrink-0" />
                              ) : (
                                <SiTiktok className="h-3.5 w-3.5 text-zinc-900 shrink-0" />
                              )}
                              <span className="text-muted-foreground">#{idea.id}</span>
                            </span>
                            <Badge
                              variant="outline"
                              className="text-[9px] px-1.5 py-0 font-medium bg-card/90 shrink-0"
                            >
                              {idea.pilar}
                            </Badge>
                          </div>

                          {/* TITLE - CLICKABLE TO VIEW DETAIL */}
                          <div
                            onClick={() => setSelectedIdeaDetail({ idea, dateStr })}
                            className="text-xs font-bold text-foreground line-clamp-2 leading-snug cursor-pointer hover:text-primary transition-colors"
                            title="Klik untuk membaca naskah & hook lengkap"
                          >
                            {idea.title}
                          </div>
                        </div>

                        {/* CARD FOOTER: TIME & DETAIL LINK */}
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1.5 border-t border-border/50">
                          <span className="flex items-center gap-1">
                            <Clock className="h-2.5 w-2.5" /> {idea.time}
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedIdeaDetail({ idea, dateStr })}
                            className="text-primary font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            <Eye className="h-2.5 w-2.5" /> Detail
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* EMPTY CELL STATE */
                      <div className="flex-1 flex items-center justify-center border border-dashed border-border/60 rounded-xl p-2 text-center group-hover:border-border transition-colors">
                        <IdeaSelector
                          currentIdeaId={null}
                          onSelectIdea={(id) => handleSetContent(dateStr, id)}
                          scheduleMap={schedule}
                          currentYear={currentYear}
                          currentMonth={currentMonth}
                          trigger={
                            <button
                              type="button"
                              className="text-[11px] text-muted-foreground/70 hover:text-foreground hover:font-bold transition-colors cursor-pointer py-2 w-full"
                            >
                              + Jadwalkan Konten
                            </button>
                          }
                        />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* PADDING NEXT MONTH */}
              {Array.from({
                length: (7 - ((startOffset + daysInMonth) % 7)) % 7,
              }).map((_, i) => (
                <div
                  key={`next-${i}`}
                  className="min-h-36 bg-muted/20 p-2 text-muted-foreground/40 select-none"
                >
                  <span className="text-xs font-medium">{i + 1}</span>
                </div>
              ))}
            </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* VIEW: TABLE LIST */
        <Card className="border border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-40 font-bold">Tanggal</TableHead>
                  <TableHead className="w-32 font-bold">Platform</TableHead>
                  <TableHead className="w-64 font-bold">Konten (Select Popover)</TableHead>
                  <TableHead className="font-bold">Hook &amp; Alur Ringkas</TableHead>
                  <TableHead className="w-36 text-right font-bold">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
                    2,
                    "0"
                  )}-${String(dayNum).padStart(2, "0")}`;
                  const ideaId = schedule[dateStr];
                  const idea = ideaId ? CONTENT_IDEAS.find((item) => item.id === ideaId) : null;
                  const dayOfWeek = (startOffset + i) % 7;
                  const dayName = DAY_NAMES_FULL[new Date(currentYear, currentMonth, dayNum).getDay()];

                  return (
                    <TableRow
                      key={dateStr}
                      className={cn(
                        idea ? "bg-muted/10" : "hover:bg-muted/20",
                        dayOfWeek >= 5 && "border-l-2 border-l-rose-500/40"
                      )}
                    >
                      <TableCell className="font-medium">
                        <div className="font-bold text-foreground">
                          {dayName}, {dayNum} {MONTH_NAMES_ID[currentMonth]}
                        </div>
                        <div className="text-[11px] text-muted-foreground">{dateStr}</div>
                      </TableCell>

                      <TableCell>
                        {idea ? (
                          <div className="flex items-center gap-1.5">
                            {idea.platform === "instagram" ? (
                              <SiInstagram className="h-4 w-4 text-[#E4405F]" />
                            ) : (
                              <SiTiktok className="h-4 w-4 text-zinc-900" />
                            )}
                            <span className="text-xs font-semibold">
                              {idea.platform === "instagram" ? "Instagram" : "TikTok"}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground/60 italic">
                            Kosong
                          </span>
                        )}
                      </TableCell>

                      <TableCell>
                        <div className="w-72">
                          <IdeaSelector
                            currentIdeaId={ideaId ?? null}
                            onSelectIdea={(id) => handleSetContent(dateStr, id)}
                            scheduleMap={schedule}
                            currentYear={currentYear}
                            currentMonth={currentMonth}
                            trigger={
                              <button
                                type="button"
                                className="flex h-8 w-full items-center justify-between gap-2 rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium shadow-2xs hover:bg-muted/70 hover:border-foreground/30 transition-colors cursor-pointer text-left"
                              >
                                {idea ? (
                                  <span className="flex items-center gap-1.5 truncate min-w-0">
                                    {idea.platform === "instagram" ? (
                                      <SiInstagram className="h-3.5 w-3.5 text-[#E4405F] shrink-0" />
                                    ) : (
                                      <SiTiktok className="h-3.5 w-3.5 text-zinc-900 shrink-0" />
                                    )}
                                    <span className="font-bold shrink-0">#{idea.id}</span>
                                    <span className="truncate">{idea.title}</span>
                                  </span>
                                ) : (
                                  <span className="text-muted-foreground/60 italic">
                                    + Pilih ide konten...
                                  </span>
                                )}
                                <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground shrink-0 opacity-70 ml-auto" />
                              </button>
                            }
                          />
                        </div>
                      </TableCell>

                      <TableCell>
                        {idea ? (
                          <div className="space-y-0.5 text-xs max-w-lg">
                            <div className="font-semibold text-foreground">
                              {idea.hook}
                            </div>
                            <div className="text-muted-foreground text-[11px] line-clamp-1">
                              {idea.alur}
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground/60">
                            Belum ada materi tayang.
                          </span>
                        )}
                      </TableCell>

                      <TableCell className="text-right">
                        {idea && (
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedIdeaDetail({ idea, dateStr })}
                              className="h-7 px-2 text-xs text-primary font-bold cursor-pointer"
                            >
                              <Eye className="h-3.5 w-3.5" /> Detail
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleSetContent(dateStr, "none")}
                              className="h-7 w-7 text-muted-foreground hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                              title="Hapus jadwal"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* DETAIL MODAL / DRAWER */}
      {selectedIdeaDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-6 space-y-4 animate-in fade-in-0 zoom-in-95"
            role="dialog"
            aria-modal="true"
          >
            {/* MODAL HEADER */}
            <div className="flex items-start justify-between gap-3 border-b border-border pb-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className="gap-1.5 font-bold uppercase text-[10px]"
                  >
                    {selectedIdeaDetail.idea.platform === "instagram" ? (
                      <SiInstagram className="h-3 w-3 text-[#E4405F]" />
                    ) : (
                      <SiTiktok className="h-3 w-3 text-zinc-900" />
                    )}
                    {selectedIdeaDetail.idea.platform === "instagram"
                      ? "Instagram"
                      : "TikTok"}
                  </Badge>

                  <Badge variant="brand">{selectedIdeaDetail.idea.pilar}</Badge>

                  <span className="text-xs text-muted-foreground">
                    #{selectedIdeaDetail.idea.id} · {selectedIdeaDetail.idea.format}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-foreground">
                  {selectedIdeaDetail.idea.title}
                </h3>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedIdeaDetail(null)}
                className="h-8 w-8 rounded-full cursor-pointer"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* DETAIL ITEMS */}
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs bg-muted/40 p-2.5 rounded-lg border border-border">
                <div>
                  <span className="text-muted-foreground">Terjadwal Pada:</span>{" "}
                  <strong className="text-foreground">
                    {selectedIdeaDetail.dateStr}
                  </strong>
                </div>
                <div>
                  <span className="text-muted-foreground">Jam Tayang:</span>{" "}
                  <strong className="text-foreground">
                    {selectedIdeaDetail.idea.time}
                  </strong>
                </div>
                <div>
                  <span className="text-muted-foreground">Grup:</span>{" "}
                  <strong className="text-foreground">
                    {selectedIdeaDetail.idea.weekGroup}
                  </strong>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
                  1. Hook 3 Detik Pertama
                </div>
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 font-semibold text-foreground italic">
                  {selectedIdeaDetail.idea.hook}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  2. Alur Adegan / Visual
                </div>
                <div className="rounded-lg bg-card border border-border p-3 leading-relaxed text-foreground">
                  {selectedIdeaDetail.idea.alur}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 mb-1">
                  3. Call to Action (CTA)
                </div>
                <div className="rounded-lg bg-emerald-50/70 border border-emerald-200/80 p-3 font-semibold text-emerald-950">
                  {selectedIdeaDetail.idea.cta}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  4. Alasan Data dari Laporan (Oktober 2026)
                </div>
                <div className="rounded-lg bg-muted/30 border border-border p-3 text-muted-foreground text-xs leading-relaxed">
                  {selectedIdeaDetail.idea.dasarReport}
                </div>
              </div>

              {selectedIdeaDetail.idea.catatan && (
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-2.5 text-xs text-amber-900">
                  <strong>Catatan Khusus:</strong> {selectedIdeaDetail.idea.catatan}
                </div>
              )}
            </div>

            {/* MODAL FOOTER WITH GANTI & HAPUS */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between pt-3 border-t border-border gap-2.5">
              <Button
                variant="destructive"
                size="sm"
                className="w-full sm:w-auto text-xs gap-1.5 cursor-pointer justify-center"
                onClick={() => {
                  handleSetContent(selectedIdeaDetail.dateStr, "none");
                  setSelectedIdeaDetail(null);
                }}
              >
                <Trash2 className="h-3.5 w-3.5" /> Kosongkan Tanggal Ini
              </Button>

              <div className="flex items-center justify-end gap-2 w-full sm:w-auto">
                {/* GANTI BUTTON INSIDE MODAL */}
                <IdeaSelector
                  currentIdeaId={selectedIdeaDetail.idea.id}
                  onSelectIdea={(newIdStr) => {
                    handleSetContent(selectedIdeaDetail.dateStr, newIdStr);
                    if (newIdStr === "none") {
                      setSelectedIdeaDetail(null);
                    } else {
                      const newIdea = CONTENT_IDEAS.find((i) => i.id === parseInt(newIdStr, 10));
                      if (newIdea) {
                        setSelectedIdeaDetail({
                          idea: newIdea,
                          dateStr: selectedIdeaDetail.dateStr,
                        });
                      }
                    }
                  }}
                  scheduleMap={schedule}
                  currentYear={currentYear}
                  currentMonth={currentMonth}
                  trigger={
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs gap-1.5 cursor-pointer font-bold flex-1 sm:flex-none justify-center"
                    >
                      <ArrowLeftRight className="h-3.5 w-3.5 text-primary" /> Ganti Ide
                    </Button>
                  }
                />

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedIdeaDetail(null)}
                  className="cursor-pointer flex-1 sm:flex-none justify-center"
                >
                  Tutup
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Reusable Shadcn Popover/Selector for changing content on a date
 */
function IdeaSelector({
  currentIdeaId,
  onSelectIdea,
  trigger,
  scheduleMap,
  currentYear,
  currentMonth,
}: {
  currentIdeaId: number | null;
  onSelectIdea: (ideaIdStr: string) => void;
  trigger?: React.ReactNode;
  scheduleMap?: Record<string, number | null>;
  currentYear?: number;
  currentMonth?: number;
}) {
  const [open, setOpen] = React.useState(false);
  const [filterMode, setFilterMode] = React.useState<"all" | "unscheduled" | "scheduled">("all");

  // Calculate schedule dates in current month for each idea
  const currentMonthStr =
    currentYear !== undefined && currentMonth !== undefined
      ? `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`
      : null;

  const monthShort =
    currentMonth !== undefined ? MONTH_NAMES_ID[currentMonth].slice(0, 3) : "";

  // Map idea.id -> array of day numbers, e.g. [2, 9]
  const scheduledDaysMap = React.useMemo(() => {
    const map: Record<number, number[]> = {};
    if (!scheduleMap || !currentMonthStr) return map;

    Object.entries(scheduleMap).forEach(([dateStr, ideaId]) => {
      if (ideaId && dateStr.startsWith(currentMonthStr)) {
        const day = parseInt(dateStr.split("-")[2], 10);
        if (!map[ideaId]) map[ideaId] = [];
        map[ideaId].push(day);
      }
    });

    Object.keys(map).forEach((idStr) => {
      map[Number(idStr)].sort((a, b) => a - b);
    });

    return map;
  }, [scheduleMap, currentMonthStr]);

  const scheduledCount = React.useMemo(() => {
    return CONTENT_IDEAS.filter((i) => (scheduledDaysMap[i.id]?.length ?? 0) > 0).length;
  }, [scheduledDaysMap]);

  const unscheduledCount = CONTENT_IDEAS.length - scheduledCount;

  const filteredIdeas = React.useMemo(() => {
    if (filterMode === "unscheduled") {
      return CONTENT_IDEAS.filter((i) => (scheduledDaysMap[i.id]?.length ?? 0) === 0);
    }
    if (filterMode === "scheduled") {
      return CONTENT_IDEAS.filter((i) => (scheduledDaysMap[i.id]?.length ?? 0) > 0);
    }
    return CONTENT_IDEAS;
  }, [filterMode, scheduledDaysMap]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align="end" className="w-88 sm:w-96 p-2 max-h-96 overflow-y-auto">
        <div className="px-2 py-1.5 border-b border-border mb-2 space-y-2">
          <div>
            <div className="text-xs font-bold text-foreground">
              Pilih Ide untuk Tanggal Ini
            </div>
            <div className="text-[11px] text-muted-foreground">
              Pilihan ide dari IDE.md terhubung dengan laporan
            </div>
          </div>

          {/* FILTER CHIPS */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-muted/60 text-[11px]">
            <button
              type="button"
              onClick={() => setFilterMode("all")}
              className={cn(
                "flex-1 px-1.5 py-1 rounded-md text-center transition-colors cursor-pointer font-medium",
                filterMode === "all"
                  ? "bg-card text-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Semua ({CONTENT_IDEAS.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode("unscheduled")}
              className={cn(
                "flex-1 px-1.5 py-1 rounded-md text-center transition-colors cursor-pointer font-medium",
                filterMode === "unscheduled"
                  ? "bg-card text-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Belum ({unscheduledCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode("scheduled")}
              className={cn(
                "flex-1 px-1.5 py-1 rounded-md text-center transition-colors cursor-pointer font-medium",
                filterMode === "scheduled"
                  ? "bg-card text-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Terjadwal ({scheduledCount})
            </button>
          </div>
        </div>

        <div className="space-y-0.5">
          {filterMode === "all" && (
            <>
              <button
                type="button"
                onClick={() => {
                  onSelectIdea("none");
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors cursor-pointer text-left",
                  currentIdeaId === null
                    ? "bg-rose-50 text-rose-700 font-bold dark:bg-rose-950/40 dark:text-rose-300"
                    : "text-muted-foreground hover:bg-muted/60"
                )}
              >
                <span>(Kosongkan / Tidak Ada Konten)</span>
                {currentIdeaId === null && <Check className="h-3.5 w-3.5" />}
              </button>
              <div className="my-1 border-t border-border" />
            </>
          )}

          {filteredIdeas.length === 0 ? (
            <div className="text-center py-6 text-xs text-muted-foreground italic">
              Tidak ada konten pada kategori filter ini.
            </div>
          ) : (
            filteredIdeas.map((idea) => {
              const isSelected = currentIdeaId === idea.id;
              const days = scheduledDaysMap[idea.id] || [];
              const isScheduled = days.length > 0;

              return (
                <button
                  key={idea.id}
                  type="button"
                  onClick={() => {
                    onSelectIdea(String(idea.id));
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-start justify-between gap-2 px-2.5 py-2 rounded-md text-xs transition-colors cursor-pointer text-left",
                    isSelected
                      ? "bg-accent text-accent-foreground font-bold"
                      : "hover:bg-muted/60 text-foreground"
                  )}
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {idea.platform === "instagram" ? (
                        <SiInstagram className="h-3 w-3 text-[#E4405F] shrink-0" />
                      ) : (
                        <SiTiktok className="h-3 w-3 text-zinc-900 shrink-0" />
                      )}
                      <span className="font-bold text-[11px] shrink-0">#{idea.id}</span>
                      <span className="truncate font-semibold">{idea.title}</span>
                    </div>

                    <div className="flex items-center justify-between gap-1.5 pt-0.5">
                      <span className="text-[10px] text-muted-foreground truncate">
                        {idea.format} · {idea.time}
                      </span>

                      {/* BADGE PENANDA TERJADWAL ATAU BELUM */}
                      {isScheduled ? (
                        <Badge
                          variant="success"
                          className="text-[9px] px-1.5 py-0 font-bold shrink-0 bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300"
                        >
                          ✓ {days.length > 1 ? `${days.length}x: ` : ""}Tgl {days.join(", ")} {monthShort}
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-[9px] px-1.5 py-0 text-muted-foreground/80 font-medium shrink-0 border-border/80"
                        >
                          Belum Terjadwal
                        </Badge>
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5 ml-1" />
                  )}
                </button>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
