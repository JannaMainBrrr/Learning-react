/**
 * "DB-szerű" session rekord
 * Azért nincs minden mező kötelezőre véve, mert a mapping nem mindig talál mindent.
 */
export type SessionRecord = {
  id: string;
  gameId: string;

  name: string;

  uploadedAt: string; // ISO datetime
  startedAt?: string; // ISO datetime (opcionális)
  endedAt?: string; // ISO datetime (opcionális)
  durationMs?: number;

  status?: "processed" | "processing" | "failed";

  // Aggregated CPU
  cpuTempAvgC?: number;
  cpuTempMinC?: number;
  cpuTempMaxC?: number;

  cpuUsageAvgPercent?: number;
  cpuUsageMinPercent?: number;
  cpuUsageMaxPercent?: number;

  cpuClockAvgMhz?: number;
  cpuClockMinMhz?: number;
  cpuClockMaxMhz?: number;

  cpuPowerAvgW?: number;
  cpuPowerMinW?: number;
  cpuPowerMaxW?: number;

  // Aggregated GPU
  gpuTempAvgC?: number;
  gpuTempMinC?: number;
  gpuTempMaxC?: number;

  gpuHotspotTempAvgC?: number;
  gpuHotspotTempMinC?: number;
  gpuHotspotTempMaxC?: number;

  gpuUsageAvgPercent?: number;
  gpuUsageMinPercent?: number;
  gpuUsageMaxPercent?: number;

  gpuClockAvgMhz?: number;
  gpuClockMinMhz?: number;
  gpuClockMaxMhz?: number;

  gpuPowerAvgW?: number;
  gpuPowerMinW?: number;
  gpuPowerMaxW?: number;
  gpuPowerPercentTdpAvg?: number;

  // Aggregated FPS
  fpsAvg?: number;
  fpsMin?: number;
  fpsMax?: number;

  // Aggregated RAM
  ramUsedAvgMb?: number;
  ramUsedMaxMb?: number;
  ramUsageAvgPercent?: number;
  ramUsageMaxPercent?: number;

  // Import/meta (opcionális, de backendben hasznos lesz)
  sourceFilename?: string;
  sourceHash?: string;
  mappingVersion?: string;
};
