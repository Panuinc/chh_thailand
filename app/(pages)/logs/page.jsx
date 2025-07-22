"use client";
import React, { useEffect, useState, useRef } from "react";
import UILogViewer from "@/components/logs/UILogViewer";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" }));

  const logRef = useRef(null);

  useEffect(() => {
    fetch("/api/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data.logs || []));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const highlightLogLine = (line) => {
    if (/\[error\]/i.test(line)) return "text-red-600";
    if (/\[warn\]/i.test(line)) return "text-yellow-600";
    if (/\[info\]/i.test(line)) return "text-blue-600";
    return "text-gray-800";
  };

  const prettyJson = (text) => {
    return text.replace(/({[^}]+})/g, (match) => {
      try {
        const obj = JSON.parse(match);
        return JSON.stringify(obj, null, 2);
      } catch {
        return match;
      }
    });
  };

  const filteredLines =
    selected?.content
      ?.replace(/\\r\\n|\\n|\\r/g, "\n")
      .replace(/\\t/g, "    ")
      .split("\n")
      .filter((line) =>
        filter
          .toLowerCase()
          .split(" ")
          .every((term) => line.toLowerCase().includes(term))
      ) || [];

  const handleDownload = () => {
    const blob = new Blob([filteredLines.join("\n")], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = selected?.fileName.replace(".log", "") + "-filtered.txt";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <UILogViewer
      headerContent="Logging"
      logs={logs}
      selected={selected}
      setSelected={setSelected}
      filter={filter}
      setFilter={setFilter}
      filteredLines={filteredLines}
      highlightLogLine={highlightLogLine}
      prettyJson={prettyJson}
      handleDownload={handleDownload}
      logRef={logRef}
      currentTime={currentTime}
    />
  );
}
