/**
 * ms -> "m:ss" vagy "h:mm:ss"
 * - 0 esetén is működik
 * - undefined/null -> "—"
 */
export function formatDurationMs(ms?: number): string {
  if (ms === null || ms === undefined) return "—";
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");

  return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss.padStart(2, "0")}`;
}

export function formatNumber(n?: number, digits = 1): string {
  if (n === null || n === undefined) return "—";
  return n.toFixed(digits);
}
/**
 * ISO -> "Xs ago / Xm ago / Xh ago / Xd ago"
 * Táblázathoz jó (summary nézet).
 */
export function timeAgoFromIso(iso: string) {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffSec = Math.max(0, Math.floor((now - then) / 1000));

  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  return `${diffD}d ago`;
}

/**
 * ISO -> "YYYY-MM-DD HH:mm"
 * Modalhoz (detailed nézet).
 * - Ha invalid date -> "—"
 * - local time-ot mutat (nem UTC-t).
 */
export function formatIsoDateTime(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";

  const yyyy = d.getFullYear();
  //0 = January..
  //padStart -> string.padStart(targetLength, fillString) targetLenthh a minimum hossz, a fillString, hogy mivel töltse fel balról.
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}

/**
 * ISO range -> "start → end" (mindkettő formázva)
 * - ha bármelyik hiányzik -> "—"
 */
export function formatIsoRange(startIso?: string, endIso?: string): string {
  if (!startIso || !endIso) return "—";
  return `${formatIsoDateTime(startIso)} → ${formatIsoDateTime(endIso)}`;
}

/**
 * Kényelmi helper: érték + egység (pl. "72.3 °C")
 * - null/undefined -> "—"
 */
export function formatWithUnit(
  value?: number,
  unit?: string,
  digits = 1,
): string {
  const v = formatNumber(value, digits);
  if (v === "—") return "—";
  return unit ? `${v} ${unit}` : v;
}
