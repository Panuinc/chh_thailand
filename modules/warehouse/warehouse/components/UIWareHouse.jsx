"use client";

import React from "react";
import UITopic from "@/components/topic/UITopic";
import { useFetchStores } from "@/modules/warehouse/store/hooks";

export default function UIWarehouseLayout({ headerContent }) {
  const { stores, loading } = useFetchStores();

  if (loading) return <div className="p-4">Loading...</div>;

  const store = stores?.[0]; // แสดง Store แรก
  const zones = store?.storeZones || [];
  const aisles = store?.storeAisles || [];
  const racks = store?.storeRacks || [];
  const levels = store?.storeLevels || [];
  const bins = store?.storeBins || [];

  return (
    <>
      <UITopic Topic={headerContent} />
      <div className="p-4 space-y-6 bg-gray-100 rounded shadow-inner">
        {zones.map((zone) => (
          <div key={zone.zoneId} className="border border-gray-400 rounded p-4 bg-white shadow">
            <h2 className="text-xl font-bold text-indigo-700 mb-2">🗂 Zone: {zone.zoneName}</h2>

            {aisles
              .filter((a) => a.aisleZoneId === zone.zoneId)
              .map((aisle) => (
                <div
                  key={aisle.aisleId}
                  className="mb-6 border-l-4 border-indigo-300 pl-4 space-y-4"
                >
                  <h3 className="text-lg font-semibold text-gray-800">🚧 Aisle: {aisle.aisleName}</h3>

                  {racks
                    .filter((rack) => rack.rackAisleId === aisle.aisleId)
                    .map((rack) => (
                      <div key={rack.rackId}>
                        <h4 className="text-md font-medium text-blue-600 mb-2">📦 Rack: {rack.rackName}</h4>

                        <div className="grid grid-cols-4 gap-4">
                          {levels
                            .filter((level) => level.levelRackId === rack.rackId)
                            .map((level) => (
                              <div
                                key={level.levelId}
                                className="bg-blue-50 rounded p-2 border border-blue-200"
                              >
                                <div className="text-sm font-bold text-blue-800 mb-1">
                                  Level: {level.levelName}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {bins
                                    .filter((b) => b.binLevelId === level.levelId)
                                    .map((bin) => {
                                      const colorMap = {
                                        Empty: "bg-green-300",
                                        Partial: "bg-yellow-300",
                                        Full: "bg-red-400",
                                        Reserved: "bg-gray-400",
                                      };

                                      return (
                                        <div
                                          key={bin.binId}
                                          className={`text-[10px] text-center text-gray-800 rounded shadow ${colorMap[bin.binOccupancy] || "bg-white"}`}
                                          style={{
                                            width: `${bin.binWidth / 8}px`,
                                            height: `${bin.binHeight / 8}px`,
                                            minWidth: "40px",
                                            minHeight: "30px",
                                            padding: "2px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                          }}
                                        >
                                          {bin.binName}
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}
