import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LOGS_DIR = path.join(process.cwd(), "logs");

export async function GET(request) {
  try {
    const files = fs.readdirSync(LOGS_DIR).filter(name => name.endsWith(".log"));
    const logData = files.map(fileName => {
      const filePath = path.join(LOGS_DIR, fileName);
      const content = fs.readFileSync(filePath, "utf8");
      return { fileName, content };
    });
    return NextResponse.json({ logs: logData });
  } catch (error) {
    return NextResponse.json({ error: "Failed to read log files." }, { status: 500 });
  }
}
