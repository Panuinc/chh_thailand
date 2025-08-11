"use client";

import React, { useMemo, useRef, useState, useCallback } from "react";
import UITopic from "@/components/topic/UITopic";
import { dateToThai } from "@/lib/date";

const CELL = 32;
const ZONE_W = 12;
const ZONE_H = 8;
const ZONE_GAP = 2;

const COLORS = {
  zoneFill: "#0ea5e91a",
  zoneStroke: "#0ea5e9",
  aisleFill: "#22c55e1a",
  aisleStroke: "#22c55e",
  rackFill: "#f59e0b1a",
  rackStroke: "#f59e0b",
  binFill: "#ef44441a",
  binStroke: "#ef4444",
  text: "#94a3b8",
};

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
function num(v, d = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
}

export default function UIStoreList({
  headerContent,
  stores: rawStores = [],
  isLoading,
}) {
  const stores = useMemo(() => {
    return (rawStores || []).map((r) => ({
      id: r.storeId,
      code: r.storeCode || "-",
      name: r.storeName || "-",
      desc: r.storeDescription || "-",
      createdBy:
        [r.createdBy?.userFirstName, r.createdBy?.userLastName]
          .filter(Boolean)
          .join(" ") || "-",
      createdAt: dateToThai(r.storeCreateAt),
      updatedBy:
        [r.updatedBy?.userFirstName, r.updatedBy?.userLastName]
          .filter(Boolean)
          .join(" ") || "-",
      updatedAt: dateToThai(r.storeUpdateAt),
      status: (r.storeStatus || "Enable").toLowerCase(),
      zones: r.storeZones || [],
    }));
  }, [rawStores]);

  const [selectedId, setSelectedId] = useState(() => stores[0]?.id ?? null);
  const selected = useMemo(
    () => stores.find((s) => s.id === selectedId) ?? stores[0],
    [stores, selectedId]
  );

  const [showAisles, setShowAisles] = useState(true);
  const [showRacks, setShowRacks] = useState(true);
  const [showBins, setShowBins] = useState(true);

  const [zoom, setZoom] = useState(0.9);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
  });

  const onWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((z) => clamp(Number((z + delta).toFixed(2)), 0.3, 2.5));
  }, []);

  const onMouseDown = (e) => {
    dragRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      baseX: pan.x,
      baseY: pan.y,
    };
  };
  const onMouseMove = (e) => {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPan({ x: dragRef.current.baseX + dx, y: dragRef.current.baseY + dy });
  };
  const onMouseUp = () => {
    dragRef.current.dragging = false;
  };

  const resetView = () => {
    setZoom(0.9);
    setPan({ x: 0, y: 0 });
  };

  const zoneSpacingX = (ZONE_W + ZONE_GAP) * CELL;
  const zoneSpacingY = (ZONE_H + ZONE_GAP) * CELL;

  const bounds = useMemo(() => {
    let maxX = 1,
      maxY = 1;
    for (const z of selected?.zones || []) {
      const zx = num(z.zonePosX, 0),
        zy = num(z.zonePosY, 0);
      maxX = Math.max(maxX, zx + 1);
      maxY = Math.max(maxY, zy + 1);
    }
    return {
      width: Math.max(800, maxX * zoneSpacingX + 200),
      height: Math.max(500, maxY * zoneSpacingY + 200),
    };
  }, [selected, zoneSpacingX, zoneSpacingY]);

  if (isLoading) {
    return (
      <>
        <UITopic Topic={headerContent} />
        <div className="p-6 text-sm text-slate-400">กำลังโหลดแผนผัง…</div>
      </>
    );
  }

  if (!selected) {
    return (
      <>
        <UITopic Topic={headerContent} />
        <div className="p-6 text-sm text-slate-400">ไม่มีข้อมูล Store</div>
      </>
    );
  }

  return (
    <>
      <UITopic Topic={headerContent} />

      <div className="w-full px-3 md:px-6">
        <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-slate-900/40 border border-slate-800 p-3">
          <select
            className="bg-slate-800 text-slate-200 rounded-xl px-3 py-2 outline-none"
            value={selected.id}
            onChange={(e) => setSelectedId(Number(e.target.value))}
          >
            {stores.map((s) => (
              <option key={s.id} value={s.id}>
                {s.code} — {s.name}
              </option>
            ))}
          </select>

          <div className="mx-2 hidden md:block h-6 w-px bg-slate-700" />

          <label className="flex items-center gap-2 text-slate-300 text-sm">
            <input
              type="checkbox"
              checked={showAisles}
              onChange={(e) => setShowAisles(e.target.checked)}
            />
            Aisles
          </label>
          <label className="flex items-center gap-2 text-slate-300 text-sm">
            <input
              type="checkbox"
              checked={showRacks}
              onChange={(e) => setShowRacks(e.target.checked)}
            />
            Racks
          </label>
          <label className="flex items-center gap-2 text-slate-300 text-sm">
            <input
              type="checkbox"
              checked={showBins}
              onChange={(e) => setShowBins(e.target.checked)}
            />
            Bins
          </label>

          <div className="mx-2 hidden md:block h-6 w-px bg-slate-700" />

          <div className="flex items-center gap-2">
            <button
              className="rounded-xl bg-slate-800 px-3 py-1.5 text-slate-200 text-sm border border-slate-700"
              onClick={() =>
                setZoom((z) => clamp(Number((z + 0.1).toFixed(2)), 0.3, 2.5))
              }
            >
              Zoom +
            </button>
            <button
              className="rounded-xl bg-slate-800 px-3 py-1.5 text-slate-200 text-sm border border-slate-700"
              onClick={() =>
                setZoom((z) => clamp(Number((z - 0.1).toFixed(2)), 0.3, 2.5))
              }
            >
              Zoom −
            </button>
            <button
              className="rounded-xl bg-slate-800 px-3 py-1.5 text-slate-200 text-sm border border-slate-700"
              onClick={resetView}
            >
              Reset
            </button>
            <div className="text-xs text-slate-400 ml-1">
              zoom {zoom.toFixed(2)}
            </div>
          </div>

          <div className="ml-auto text-xs text-slate-400">
            สถานะ: <span className="text-slate-200">{selected.status}</span> •
            อัปเดต {selected.updatedAt} โดย {selected.updatedBy}
          </div>
        </div>
      </div>

      <div className="w-full px-3 md:px-6 mt-3">
        <div className="flex flex-wrap gap-3 text-[12px] text-slate-300">
          <LegendItem
            colorFill={COLORS.zoneFill}
            colorStroke={COLORS.zoneStroke}
            label="Zone"
          />
          <LegendItem
            colorFill={COLORS.aisleFill}
            colorStroke={COLORS.aisleStroke}
            label="Aisle"
          />
          <LegendItem
            colorFill={COLORS.rackFill}
            colorStroke={COLORS.rackStroke}
            label="Rack"
          />
          <LegendItem
            colorFill={COLORS.binFill}
            colorStroke={COLORS.binStroke}
            label="Bin"
          />
        </div>
      </div>

      <div className="w-full px-3 md:px-6 py-3">
        <div
          className="relative w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
          style={{ height: Math.min(900, Math.max(520, bounds.height * 0.6)) }}
          onWheel={onWheel}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseUp}
          onMouseUp={onMouseUp}
        >
          <svg
            width={bounds.width}
            height={bounds.height}
            className="absolute top-0 left-0"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "0 0",
            }}
          >
            <defs>
              <pattern id="grid" width={CELL} height={CELL} patternUnits="userSpaceOnUse">
                <path
                  d={`M ${CELL} 0 L 0 0 0 ${CELL}`}
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect x="0" y="0" width={bounds.width} height={bounds.height} fill="url(#grid)" />

            {(selected.zones || []).map((z, zi) => {
              const zx = num(z.zonePosX, 0);
              const zy = num(z.zonePosY, 0);
              const x = zx * zoneSpacingX + 80;
              const y = zy * zoneSpacingY + 80;
              const w = ZONE_W * CELL;
              const h = ZONE_H * CELL;

              return (
                <g key={`zone-${zi}`} transform={`translate(${x}, ${y})`}>
                  <rect
                    x={0}
                    y={0}
                    width={w}
                    height={h}
                    fill={COLORS.zoneFill}
                    stroke={COLORS.zoneStroke}
                    strokeWidth={2}
                    rx={12}
                  />
                  <text x={8} y={20} fontSize={12} fill={COLORS.text}>
                    {z.zoneCode || z.zoneName || `Zone ${zi + 1}`}
                  </text>

                  {showAisles &&
                    (z.zoneAisles || []).map((a, ai) => {
                      const ax = clamp(num(a.aislePosX, 1), 0, ZONE_W - 1) * CELL + 12;
                      const ay = clamp(num(a.aislePosY, 1), 0, ZONE_H - 1) * CELL + 24;
                      const aw = CELL * 1.2;
                      const ah = CELL * 5.5;

                      return (
                        <g key={`aisle-${zi}-${ai}`} transform={`translate(${ax}, ${ay})`}>
                          <rect
                            x={0}
                            y={0}
                            width={aw}
                            height={ah}
                            fill={COLORS.aisleFill}
                            stroke={COLORS.aisleStroke}
                            strokeWidth={1.5}
                            rx={8}
                          />
                          <title>
                            {`Aisle: ${a.aisleCode || a.aisleName || ai + 1}`}
                          </title>

                          {showRacks &&
                            (a.aisleRacks || []).map((r, ri) => {
                              const rx = clamp(num(r.rackPosX, 1), 0, 10) * (CELL * 0.9);
                              const ry = clamp(num(r.rackPosY, 1), 0, 10) * (CELL * 0.9);
                              const rw = CELL * 1.7;
                              const rh = CELL * 1.7;
                              const levelCount = (r.rackLevels || []).length;

                              return (
                                <g key={`rack-${zi}-${ai}-${ri}`} transform={`translate(${rx}, ${ry})`}>
                                  <rect
                                    x={0}
                                    y={0}
                                    width={rw}
                                    height={rh}
                                    fill={COLORS.rackFill}
                                    stroke={COLORS.rackStroke}
                                    strokeWidth={1.2}
                                    rx={6}
                                  />
                                  <title>
                                    {`Rack: ${r.rackCode || r.rackName || ri + 1} • Levels: ${levelCount}`}
                                  </title>
                                  <text x={4} y={12} fontSize={10} fill={COLORS.text}>
                                    {r.rackCode || r.rackName || `Rack ${ri + 1}`}
                                  </text>
                                  <text x={4} y={24} fontSize={9} fill={COLORS.text}>
                                    L{levelCount || 0}
                                  </text>

                                  {showBins &&
                                    (r.rackLevels || []).map((lv, li) => {
                                      const rowY = 28 + li * (CELL * 0.7);
                                      return (
                                        <g key={`level-${zi}-${ai}-${ri}-${li}`} transform={`translate(2, ${rowY})`}>
                                          {(lv.levelBins || []).map((b, bi) => {
                                            const bw = num(b.binWidth, 1) * (CELL * 0.5);
                                            const bh = num(b.binHeight, 1) * (CELL * 0.5);
                                            const bx = num(b.binPosX, bi) * (CELL * 0.55);
                                            const by = num(b.binPosY, 0) * (CELL * 0.55);
                                            const occ = String(b.binOccupancy || "").toLowerCase();
                                            const fill = occ === "empty" ? COLORS.binFill : "#22d3ee22";
                                            const stroke = occ === "empty" ? COLORS.binStroke : "#22d3ee";

                                            return (
                                              <g key={`bin-${zi}-${ai}-${ri}-${li}-${bi}`} transform={`translate(${bx}, ${by})`}>
                                                <rect
                                                  x={0}
                                                  y={0}
                                                  width={bw}
                                                  height={bh}
                                                  fill={fill}
                                                  stroke={stroke}
                                                  strokeWidth={1}
                                                  rx={3}
                                                />
                                                <title>{`Bin: ${b.binCode || b.binName || bi + 1}
Row: ${b.binRow ?? "-"}
Type: ${b.binType ?? "-"}
Usage: ${b.binUsage ?? "-"}
Capacity: ${b.binCapacity ?? "-"}
RFID: ${b.binRfidTagId ?? "-"}
FillRate: ${b.binFillRate ?? "-"}
Occupancy: ${b.binOccupancy ?? "-"}
Status: ${b.binStatus ?? "-"}`}</title>
                                              </g>
                                            );
                                          })}
                                        </g>
                                      );
                                    })}
                                </g>
                              );
                            })}
                        </g>
                      );
                    })}
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-2 right-3 text-[11px] text-slate-400 bg-slate-900/60 backdrop-blur px-2 py-1 rounded-lg border border-slate-800">
            Drag = Pan • Wheel = Zoom
          </div>
        </div>
      </div>
    </>
  );
}

function LegendItem({ colorFill, colorStroke, label }) {
  return (
    <div className="flex items-center gap-2">
      <svg width="18" height="12">
        <rect
          x="1"
          y="1"
          width="16"
          height="10"
          fill={colorFill}
          stroke={colorStroke}
          strokeWidth="2"
          rx="3"
        />
      </svg>
      <span>{label}</span>
    </div>
  );
}
