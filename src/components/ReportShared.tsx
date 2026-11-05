import * as React from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Circle,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn, fmtNum } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

export type RangeKey = "all" | "14" | "7";

export function sliceByRange<T>(arr: readonly T[], range: RangeKey): T[] {
  if (range === "7") return arr.slice(-7);
  if (range === "14") return arr.slice(-14);
  return [...arr];
}

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Teks bold hijau untuk kenaikan (+) dan merah untuk penurunan/dampak buruk (-). */
export function Up({ children }: { children: React.ReactNode }) {
  return <span className="font-bold text-emerald-600 tabular-nums">{children}</span>;
}

export function Down({ children }: { children: React.ReactNode }) {
  return <span className="font-bold text-rose-600 tabular-nums">{children}</span>;
}

export function SignedNode({
  val,
  prefix = "",
  suffix = "",
  inverseGood = false,
}: {
  val: number;
  prefix?: string;
  suffix?: string;
  inverseGood?: boolean;
}) {
  if (val === 0) {
    return (
      <strong className="tabular-nums">
        {prefix}0{suffix}
      </strong>
    );
  }
  const isUp = val > 0;
  const good = inverseGood ? !isUp : isUp;
  const text = `${prefix}${isUp ? `+${val}` : val}${suffix}`;
  return good ? <Up>{text}</Up> : <Down>{text}</Down>;
}

/** Node "naik +19,4%" (hijau) / "turun -27,7%" (merah) / null bila tidak ada pembanding. */
export function momNode(
  curr: number,
  prev: number | null | undefined,
  inverseGood = false
): React.ReactNode {
  if (prev === null || prev === undefined || prev === 0) return null;
  const diff = ((curr - prev) / Math.abs(prev)) * 100;
  const label = `${diff > 0 ? "+" : ""}${diff.toFixed(1).replace(".", ",")}%`;
  if (Math.abs(diff) < 0.05) return <strong>stabil (0%)</strong>;
  const isUp = diff > 0;
  const good = inverseGood ? !isUp : isUp;
  const text = isUp ? `naik ${label}` : `turun ${label}`;
  return good ? <Up>{text}</Up> : <Down>{text}</Down>;
}

/** Format label delta seperti "↑ 50,0% vs Sep" menjadi "+50,0% vs Sep" berwarna hijau/merah. */
export function deltaLabelNode(label: string, inverseGood = false): React.ReactNode {
  const trimmed = label.trim();
  if (trimmed.startsWith("↑")) {
    const text = `+${trimmed.slice(1).trim()}`;
    return inverseGood ? <Down>{text}</Down> : <Up>{text}</Up>;
  }
  if (trimmed.startsWith("↓")) {
    const text = `-${trimmed.slice(1).trim()}`;
    return inverseGood ? <Up>{text}</Up> : <Down>{text}</Down>;
  }
  return <span>{trimmed}</span>;
}

/** Angka utama tebal + kata satuan sedikit lebih kecil di sebelahnya. */
export function MetricVal({
  num,
  unit,
  tone = "neutral",
  size = "lg",
}: {
  num: React.ReactNode;
  unit?: string;
  tone?: "neutral" | "up" | "down";
  size?: "lg" | "md";
}) {
  const numColor =
    tone === "up"
      ? "text-emerald-600"
      : tone === "down"
      ? "text-rose-600"
      : "text-foreground";
  const unitColor =
    tone === "up"
      ? "text-emerald-600/85"
      : tone === "down"
      ? "text-rose-600/85"
      : "text-muted-foreground";
  return (
    <span className="inline-flex items-baseline gap-1.5 flex-wrap">
      <span
        className={cn(
          size === "lg" ? "text-xl sm:text-2xl" : "text-base sm:text-lg",
          "font-extrabold tabular-nums tracking-tight",
          numColor
        )}
      >
        {num}
      </span>
      {unit && <span className={cn("text-xs font-semibold", unitColor)}>{unit}</span>}
    </span>
  );
}

/** Sel angka tabel dengan satuan ringkas di sebelahnya. */
export function CellUnit({
  val,
  unit,
  bold = false,
}: {
  val: React.ReactNode;
  unit: string;
  bold?: boolean;
}) {
  return (
    <span className="tabular-nums whitespace-nowrap">
      <span className={cn(bold ? "font-bold text-foreground" : "text-foreground")}>{val}</span>{" "}
      <span className="text-[11px] font-normal text-muted-foreground">{unit}</span>
    </span>
  );
}

/** Helper Chart.js options agar tooltip selalu menampilkan satuan. */
export function chartOpts(
  unitByDatasetOrDefault: string | Record<string, string>,
  extra: Record<string, unknown> = {}
): Record<string, unknown> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    ...extra,
    plugins: {
      ...(extra.plugins as Record<string, unknown> | undefined),
      tooltip: {
        callbacks: {
          label: (ctx: {
            dataset: { label?: string };
            parsed: number | { x?: number; y?: number };
            raw: unknown;
          }) => {
            const dsLabel = ctx.dataset.label ?? "";
            const unit =
              typeof unitByDatasetOrDefault === "string"
                ? unitByDatasetOrDefault
                : unitByDatasetOrDefault[dsLabel] ?? "";
            const rawNum =
              typeof ctx.raw === "number"
                ? ctx.raw
                : typeof ctx.parsed === "number"
                ? ctx.parsed
                : ctx.parsed?.y ?? 0;
            const formatted = Number.isInteger(rawNum)
              ? fmtNum(rawNum)
              : rawNum.toFixed(1).replace(".", ",");
            return dsLabel ? `${dsLabel}: ${formatted} ${unit}` : `${formatted} ${unit}`;
          },
        },
      },
    },
  };
}

/* ------------------------------------------------------------------ */
/* MoM badge                                                          */
/* ------------------------------------------------------------------ */

export function MoMBadge({
  curr,
  prev,
  inverseGood = false,
}: {
  curr: number | null | undefined;
  prev: number | null | undefined;
  inverseGood?: boolean;
}) {
  if (prev === null || prev === undefined || curr === null || curr === undefined) return null;
  if (prev === 0) {
    if (curr === 0) {
      return (
        <Badge variant="secondary" className="tabular-nums text-[10px] px-1.5 py-0 font-medium">
          <Minus className="h-2.5 w-2.5" /> 0%
        </Badge>
      );
    }
    return (
      <Badge variant="success" className="tabular-nums text-[10px] px-1.5 py-0">
        <TrendingUp className="h-2.5 w-2.5" /> Baru
      </Badge>
    );
  }
  const diffPct = ((curr - prev) / Math.abs(prev)) * 100;
  if (Math.abs(diffPct) < 0.05) {
    return (
      <Badge variant="secondary" className="tabular-nums text-[10px] px-1.5 py-0 font-medium">
        <Minus className="h-2.5 w-2.5" /> 0%
      </Badge>
    );
  }
  const isUp = diffPct > 0;
  const good = inverseGood ? !isUp : isUp;
  return (
    <Badge variant={good ? "success" : "danger"} className="tabular-nums text-[10px] px-1.5 py-0">
      {isUp ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
      {isUp ? "+" : ""}
      {diffPct.toFixed(1).replace(".", ",")}%
    </Badge>
  );
}

/* ------------------------------------------------------------------ */
/* Sticky daftar isi dengan penanda bagian yang sedang dibaca          */
/* ------------------------------------------------------------------ */

export interface NavItem {
  id: string;
  label: string;
}

export function SectionNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = React.useState(items[0]?.id);
  const key = items.map((i) => i.id).join("|");

  React.useEffect(() => {
    let frame = 0;
    const compute = () => {
      let current = items[0]?.id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= 140) current = it.id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && items.length) current = items[items.length - 1].id;
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (
    <nav className="sticky top-14 z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-6 bg-background/95 backdrop-blur-md border-b border-border no-print">
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
        {items.map((it) => {
          const isActive = it.id === active;
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => scrollToId(it.id)}
              className={cn(
                "shrink-0 px-3 py-2 text-xs sm:text-sm border-b-2 -mb-px transition-colors cursor-pointer whitespace-nowrap",
                isActive
                  ? "border-primary text-foreground font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {it.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Ringkasan: satu baris Corong Konversi + 1 kalimat                  */
/* ------------------------------------------------------------------ */

export interface FunnelStage {
  label: string;
  value: React.ReactNode;
  unit?: string;
  tone?: "neutral" | "up" | "down";
  sub: React.ReactNode;
  curr?: number;
  prev?: number | null;
  problem?: boolean;
  targetId: string;
}

export function FunnelSummary({
  id,
  title,
  periodLabel,
  stages,
  summary,
}: {
  id: string;
  title: string;
  periodLabel: string;
  stages: FunnelStage[];
  summary: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">{title}</h2>
        <span className="text-xs text-muted-foreground">{periodLabel}</span>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div
            className={cn(
              "grid grid-cols-2 gap-2.5",
              stages.length === 5 ? "sm:grid-cols-3 lg:grid-cols-5" : "sm:grid-cols-4"
            )}
          >
            {stages.map((st, idx) => (
              <button
                key={st.label}
                type="button"
                onClick={() => scrollToId(st.targetId)}
                className={cn(
                  "relative rounded-lg border bg-card p-3.5 text-left transition-colors cursor-pointer hover:bg-muted/50",
                  st.problem ? "border-amber-300" : "border-border"
                )}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {idx + 1}. {st.label}
                    {st.problem && <AlertTriangle className="h-3 w-3 text-amber-500" />}
                  </span>
                  <MoMBadge curr={st.curr} prev={st.prev} />
                </div>
                <div className="mt-0.5">
                  <MetricVal num={st.value} unit={st.unit} tone={st.tone} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{st.sub}</div>
                {idx < stages.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40 z-10" />
                )}
              </button>
            ))}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-3 [&_strong]:font-bold [&_strong]:text-foreground">
            {summary}
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Bagian Laporan & Modul Analisis                                    */
/* ------------------------------------------------------------------ */

export function ReportSection({
  id,
  num,
  title,
  summary,
  children,
}: {
  id: string;
  num?: string;
  title: string;
  summary?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 space-y-3 pt-4">
      <div className="space-y-1">
        <h2 className="flex items-center gap-2.5 text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
          {num && (
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background text-sm tabular-nums">
              {num}
            </span>
          )}
          {title}
        </h2>
        {summary && (
          <p className="text-sm text-muted-foreground leading-relaxed [&_strong]:font-bold [&_strong]:text-foreground">
            {summary}
          </p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export interface ConciseInsight {
  fakta: React.ReactNode;
  masalah: React.ReactNode;
  aksi: React.ReactNode;
}

export function InsightRow({ insight }: { insight: ConciseInsight }) {
  const cols: { label: string; text: React.ReactNode }[] = [
    { label: "Fakta", text: insight.fakta },
    { label: "Masalah", text: insight.masalah },
    { label: "Aksi", text: insight.aksi },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 border-t border-border divide-y md:divide-y-0 md:divide-x divide-border">
      {cols.map((c) => (
        <div key={c.label} className="px-5 py-3.5 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {c.label}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed [&_strong]:font-bold [&_strong]:text-foreground">
            {c.text}
          </p>
        </div>
      ))}
    </div>
  );
}

export function RangeFilterPills({
  value,
  onChange,
}: {
  value: RangeKey;
  onChange: (v: RangeKey) => void;
}) {
  const opts: { k: RangeKey; label: string }[] = [
    { k: "all", label: "Semua" },
    { k: "14", label: "14 Hari" },
    { k: "7", label: "7 Hari" },
  ];
  return (
    <div className="inline-flex items-center rounded-md bg-muted p-0.5">
      {opts.map((o) => (
        <button
          key={o.k}
          type="button"
          onClick={() => onChange(o.k)}
          className={cn(
            "px-2.5 py-1 rounded text-xs transition-colors cursor-pointer",
            value === o.k
              ? "bg-card text-foreground shadow-2xs font-semibold"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function ReportModule({
  num,
  title,
  badge,
  withRange = false,
  insight,
  children,
}: {
  num: string;
  title: string;
  badge?: React.ReactNode;
  withRange?: boolean;
  insight: ConciseInsight;
  children: React.ReactNode | ((range: RangeKey) => React.ReactNode);
}) {
  const [range, setRange] = React.useState<RangeKey>("all");
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5 border-b border-border">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold tabular-nums text-muted-foreground">{num}</span>
          <h3 className="text-base font-bold text-foreground">{title}</h3>
          {badge}
        </div>
        {withRange && <RangeFilterPills value={range} onChange={setRange} />}
      </div>
      <div className="p-5">{typeof children === "function" ? children(range) : children}</div>
      <InsightRow insight={insight} />
    </Card>
  );
}

/** Kotak angka netral dengan satuan eksplisit. */
export function StatTile({
  label,
  value,
  unit,
  tone = "neutral",
  sub,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  unit?: string;
  tone?: "neutral" | "up" | "down";
  sub?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <span>{label}</span>
        {icon}
      </div>
      <div className="mt-1">
        <MetricVal num={value} unit={unit} tone={tone} />
      </div>
      {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Checklist Rencana 30 Hari                                          */
/* ------------------------------------------------------------------ */

export type ActionPlanTask = {
  id: string;
  week: string;
  title: string;
  masalah: React.ReactNode;
  langkah: React.ReactNode;
  target: React.ReactNode;
};

export function InteractiveActionPlan({
  storageKey,
  tasks,
}: {
  storageKey: string;
  tasks: ActionPlanTask[];
}) {
  const read = React.useCallback((): Record<string, boolean> => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  }, [storageKey]);

  const [doneMap, setDoneMap] = React.useState<Record<string, boolean>>(read);

  React.useEffect(() => {
    setDoneMap(read());
  }, [read]);

  const toggleTask = (id: string) => {
    setDoneMap((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        /* abaikan */
      }
      return next;
    });
  };

  const doneCount = tasks.filter((t) => doneMap[t.id]).length;
  const pct = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center gap-3">
          <Progress value={pct} className="h-2" />
          <span className="text-xs font-bold tabular-nums text-muted-foreground shrink-0">
            {doneCount}/{tasks.length} tugas selesai ({pct}%)
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tasks.map((t) => {
            const checked = !!doneMap[t.id];
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => toggleTask(t.id)}
                className={cn(
                  "rounded-lg border p-4 text-left transition-colors cursor-pointer flex flex-col justify-between gap-3",
                  checked ? "border-border bg-muted/40" : "border-border bg-card hover:bg-muted/30"
                )}
              >
                <div className="space-y-3 w-full">
                  <div className="flex items-start gap-2.5">
                    {checked ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground/50 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        {t.week}
                      </div>
                      <div
                        className={cn(
                          "text-sm font-bold text-foreground leading-snug",
                          checked && "line-through text-muted-foreground"
                        )}
                      >
                        {t.title}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-border/70 text-xs leading-relaxed">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-rose-600 mb-0.5">
                        Masalah Saat Ini
                      </div>
                      <div className="text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground">
                        {t.masalah}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-foreground mb-0.5">
                        Langkah Kerja
                      </div>
                      <div className="text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground">
                        {t.langkah}
                      </div>
                    </div>

                    <div className="rounded-md bg-emerald-50/70 border border-emerald-200/70 px-2.5 py-2">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-0.5">
                        Target Hasil (30 Hari)
                      </div>
                      <div className="text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground">
                        {t.target}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
