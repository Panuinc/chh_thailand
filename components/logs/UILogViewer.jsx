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
        <div className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 border_custom overflow-auto">
          <div className="flex items-center justify-between w-full p-2 gap-2 border_custom">
            <div className="flex items-center justify-center h-full p-2 gap-2 border_custom">
              <LogIn />
              Log Viewer
            </div>
            <span className="font-semibold">{currentTime}</span>
          </div>

          <div className="flex items-start justify-center w-full h-full p-2 gap-2 border_custom">
            <aside className="flex items-start justify-center h-full p-2 gap-2 border_custom">
              <ul className="flex flex-col items-center justify-start w-full h-full p-2 gap-2 border_custom overflow-auto">
                {logs.map((log, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        setSelected(log);
                        setFilter("");
                      }}
                      className={`flex items-center justify-center w-full h-full p-2 gap-2 border_custom ${
                        selected?.fileName === log.fileName ? "" : ""
                      }`}
                    >
                      <FileText />
                      <span className="truncate">{log.fileName}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <main className="flex flex-col items-start justify-start w-full h-full p-2 gap-2 border_custom overflow-auto">
              {selected ? (
                <>
                  <div className="flex flex-row items-center justify-center w-full p-2 gap-2 border_custom">
                    <div className="flex items-center justify-start w-full h-full p-2 gap-2 border_custom">
                      <Eye />
                      {selected.fileName}
                    </div>

                    <button
                      onClick={handleDownload}
                      className="flex items-center justify-end w-full h-full p-2 gap-2 border_custom"
                    >
                      <Download />
                      Download
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center w-full p-2 gap-2 border_custom">
                    <Filter />
                    <input
                      type="text"
                      placeholder="Filter by keyword (space-separated)"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="flex items-center justify-end w-full h-full p-2 gap-2 border_custom"
                    />
                  </div>

                  <div className="w-full" ref={logRef}>
                    {filteredLines.length > 0 ? (
                      <pre className="flex flex-col items-start justify-center w-full h-full p-2 gap-2 border_custom">
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
                      <span className="flex items-center justify-center w-full h-full p-2 gap-2 border_custom">No matching log entries</span>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-start justify-start w-full h-full p-2 gap-2 border_custom">
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
