"use client";
import React from "react";
import Image from "next/image";
import UITopic from "@/components/topic/UITopic";
import { FileText, Eye, Filter, Download } from "lucide-react";
import { Button, Input } from "@heroui/react";

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
          <div className="flex items-start justify-center w-full h-full p-2">
            <aside className="flex items-start justify-center h-full gap-2">
              <ul className="flex flex-col items-center justify-start w-full h-full gap-2 border-r-1 border-default overflow-auto">
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

            <main className="flex flex-col items-start justify-start w-full h-full gap-2 overflow-auto">
              {selected ? (
                <>
                  <div className="flex flex-row items-center justify-center w-full p-2 gap-2">
                    <div className="flex items-center justify-start w-full h-full p-2 gap-2 font-semibold">
                      <Eye />
                      {selected.fileName}
                    </div>
                    <div className="flex items-center justify-end w-full h-full p-2 gap-2 font-semibold">
                      {currentTime}
                    </div>
                    <div className="flex items-center justify-center h-full p-2 gap-2 font-semibold">
                      <Button
                        onPress={handleDownload}
                        color="primary"
                        radius="full"
                        className="w-full h-full p-3 gap-2"
                      >
                        <Download />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-center w-full p-2 gap-2">
                    <Filter />
                    <Input
                      name="filter"
                      placeholder="Filter by keyword (space-separated)"
                      variant="bordered"
                      color="default"
                      radius="full"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
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
