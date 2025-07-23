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
  currentTime,
}) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-start w-full h-full overflow-auto">
      <div className="lg:flex hidden flex-col items-center justify-center w-full lg:w-3/12 h-full p-2 gap-2 relative">
        <Image
          src="/picture/dashboard.jpg"
          alt="dashboard"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <div className="flex flex-col items-center justify-start w-full lg:w-9/12 h-full">
        <UITopic Topic={headerContent} />
        <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 overflow-auto">
          <div className="flex items-center justify-between w-full p-2 gap-2">
            <div className="flex items-center justify-center h-full p-2 gap-2">
              <LogIn />
              Log Viewer
            </div>
            <span className="font-semibold">{currentTime}</span>
          </div>

          <div className="flex items-start justify-center w-full h-full p-2">
            <aside className="flex items-start justify-center h-full gap-2">
              <ul className="flex flex-col items-center justify-start w-full h-full gap-2 bg-black overflow-auto">
                {logs.map((log, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        setSelected(log);
                        setFilter("");
                      }}
                      className={`flex items-center justify-center w-full h-full p-2 gap-2 hover:text-primary  ${
                        selected?.fileName === log.fileName
                          ? "text-primary font-semibold"
                          : "bg-black text-white"
                      }`}
                    >
                      <FileText />
                      <span className="truncate">{log.fileName}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <main className="flex flex-col items-start justify-start w-full h-full gap-2 overflow-auto">
              {selected ? (
                <>
                  <div className="flex flex-row items-center justify-center w-full p-2 gap-2">
                    <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold">
                      <Eye />
                      {selected.fileName}
                    </div>

                    <button
                      onClick={handleDownload}
                      className="flex items-center justify-center h-full p-2 gap-2 bg-black text-white rounded-full"
                    >
                      <Download />
                      Download
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center w-full p-2 gap-2">
                    <Filter />
                    <input
                      type="text"
                      placeholder="Filter by keyword (space-separated)"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="flex items-center justify-end w-full h-full p-2 gap-2 rounded-full"
                    />
                  </div>

                  <div className="w-full" ref={logRef}>
                    {filteredLines.length > 0 ? (
                      <pre className="flex flex-col items-start justify-center w-full h-full p-2 gap-2">
                        {filteredLines.map((line, i) => (
                          <div
                            key={i}
                            data-line={line}
                            className={`${highlightLogLine(line)}`}
                          >
                            {prettyJson(line)}
                          </div>
                        ))}
                      </pre>
                    ) : (
                      <span className="flex items-center justify-center w-full h-full p-2 gap-2">
                        No matching log entries
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-start justify-start w-full h-full p-2 gap-2">
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
