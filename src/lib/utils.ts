import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fmtNum(n: number | null | undefined): string {
  if (n === null || n === undefined || Number.isNaN(n)) return "-";
  return Number(n).toLocaleString("id-ID");
}

export function fmtPct(n: number | null | undefined, digits = 1): string {
  if (n === null || n === undefined || Number.isNaN(n)) return "-";
  return `${Number(n).toFixed(digits).replace(".", ",")}%`;
}

export function shortDateID(isoOrText: string): string {
  if (!isoOrText) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(isoOrText)) {
    const [, m, d] = isoOrText.split("-").map(Number);
    const months = ["", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
    return `${d} ${months[m]}`;
  }
  return (
    isoOrText.replace("October ", "").replace("November ", "Nov ").replace("September ", "") +
    (isoOrText.startsWith("October") ? " Okt" : "")
  );
}

export function sumBy<T>(arr: readonly T[], fn: (item: T) => number): number {
  return arr.reduce((acc, item) => acc + fn(item), 0);
}

export function maxBy<T>(arr: readonly T[], fn: (item: T) => number): T {
  return arr.reduce((best, item) => (fn(item) > fn(best) ? item : best), arr[0]);
}
