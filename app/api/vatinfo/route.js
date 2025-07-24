import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { taxpayerId, companyName } = await req.json();

    if (!taxpayerId && !companyName) {
      return NextResponse.json(
        { error: "Missing taxpayer ID or company name" },
        { status: 400 }
      );
    }

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto("https://vsreg.rd.go.th/VATINFOWSWeb/jsp/V001.jsp", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    await page.waitForSelector("#formSearch", { timeout: 15000 });

    if (taxpayerId) {
      await page.click("#tinOpt1");
      await page.waitForSelector("#txtTin");
      await page.type("#txtTin", taxpayerId);
    } else if (companyName) {
      await page.click("#tinOpt2");
      await page.waitForSelector("#fname");
      await page.type("#fname", companyName);
    }

    await new Promise((r) => setTimeout(r, 500));

    await page.click("#btnSearch");

    await page.waitForSelector("table.table-scroll tbody", { timeout: 15000 });
    await new Promise((r) => setTimeout(r, 1000));

    const rawRows = await page.$$eval("table.table-scroll tbody tr", (rows) =>
      rows.map((row) => {
        const cells = Array.from(row.querySelectorAll("td"));
        return {
          index: cells[0]?.innerText.trim(),
          taxpayerId: cells[1]?.innerText.trim().replace(/\n/g, " "),
          companyName: cells[3]?.innerText.trim().replace(/\s+/g, " "),
          address: cells[4]?.innerText.trim().replace(/\s+/g, " "),
          postalCode: cells[5]?.innerText.trim(),
        };
      })
    );

    console.log("✅ Scraped raw rows:", rawRows);

    const results = rawRows
      .filter((r) => r.index)
      .map(({ taxpayerId, companyName, address, postalCode }) => ({
        taxpayerId,
        companyName,
        address,
        postalCode,
      }));

    console.log("✅ Final filtered results:", results);

    await browser.close();
    return NextResponse.json({ results });
  } catch (err) {
    console.error("VATINFO scrape error →", err);
    return NextResponse.json(
      { error: "VATINFO scrape failed", message: err.message },
      { status: 500 }
    );
  }
}
