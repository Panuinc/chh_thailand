"use client";
import React from "react";
import Image from "next/image";
import UITopic from "@/components/topic/UITopic";
import { FileText, LogIn, Eye, Filter, Download } from "lucide-react";

export default function UILogViewer({
  headerContent,
  logs,
  selected,
  setSelected,
  filter,
  setFilter,
  filteredLines,
  highlightLogLine,
  prettyJson,
  handleDownload,
  logRef,
  currentTime, // 👈 receive realtime clock
}) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-start w-full h-full gap-2 overflow-auto">
      <div className="lg:flex hidden flex-col items-center justify-center w-full lg:w-3/12 h-full p-2 gap-2 border_custom rounded-xl relative">
        <Image
          src="/picture/dashboard.jpg"
          alt="dashboard"
          fill
          style={{ objectFit: "cover", borderRadius: "0.75rem" }}
          priority
        />
      </div>

      <div className="flex flex-col items-center justify-start w-full lg:w-9/12 h-full p-2 gap-2 border_custom rounded-xl">
        <UITopic Topic={headerContent} />
        <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 border_custom overflow-auto rounded-lg">
          <div className="w-full flex items-center justify-between px-4 py-2 rounded-md border">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <LogIn />
              Log Viewer
            </div>
            <span className="text-sm">{currentTime}</span>
          </div>

          <div className="flex w-full h-[600px] rounded overflow-hidden border">
            <aside className="w-1/4 border-r bg-default overflow-y-auto">
              <ul className="divide-y">
                {logs.map((log, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        setSelected(log);
                        setFilter("");
                      }}
                      className={`w-full text-left px-4 py-3 flex items-center gap-2 hover:bg-primary hover:text-white ${
                        selected?.fileName === log.fileName
                          ? "bg-primary text-white font-semibold"
                          : ""
                      }`}
                    >
                      <FileText />
                      <span className="truncate">{log.fileName}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <main className="w-3/4 p-4 overflow-auto">
              {selected ? (
                <>
                  <div className="mb-3 flex items-center gap-2 font-bold">
                    <Eye className="w-5 h-5" />
                    {selected.fileName}
                    <button
                      onClick={handleDownload}
                      className="ml-auto flex items-center gap-1 text-sm px-3 py-2 rounded bg-primary hover:brightness-110 text-white"
                    >
                      <Download />
                      Download
                    </button>
                  </div>

                  <div className="mb-3 flex items-center gap-2">
                    <Filter />
                    <input
                      type="text"
                      placeholder="Filter by keyword (space-separated)"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded border focus:outline-none focus:ring focus:ring-primary/40"
                    />
                  </div>

                  <div ref={logRef}>
                    {filteredLines.length > 0 ? (
                      <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                        {filteredLines.map((line, i) => (
                          <div
                            key={i}
                            data-line={line}
                            className={`${highlightLogLine(line)} mb-1`}
                          >
                            {prettyJson(line)}
                          </div>
                        ))}
                      </pre>
                    ) : (
                      <span className=" italic">No matching log entries</span>
                    )}
                  </div>
                </>
              ) : (
                <div className=" italic">
                  ← Select a log file to view its content
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
