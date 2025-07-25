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
      protocolTimeout: 60000,
    });

    const page = await browser.newPage();
    await page.goto("https://vsreg.rd.go.th/VATINFOWSWeb/jsp/V001.jsp", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    await page.waitForSelector("#formSearch", { timeout: 15000 });

    if (taxpayerId) {
      await page.click("#tinOpt1");
      await page.waitForSelector("#txtTin", { timeout: 5000 });
      await page.type("#txtTin", taxpayerId);
    } else {
      await page.click("#tinOpt2");
      await page.waitForSelector("#fname", { timeout: 5000 });
      await page.type("#fname", companyName);
    }

    await page.waitForFunction(
      () => {
        const btn = document.querySelector("#btnSearch");
        return btn && !btn.disabled;
      },
      { timeout: 10000 }
    );

    await page.evaluate(() => document.querySelector("#btnSearch").click());

    try {
      await page.waitForSelector("table.table-scroll tbody tr", {
        timeout: 10000,
      });
    } catch {
      await browser.close();
      return NextResponse.json(
        { error: "No Data Found (timeout)" },
        { status: 404 }
      );
    }

    const rows = await page.$$eval("table.table-scroll tbody tr", (trs) =>
      trs
        .map((row) => {
          const cells = Array.from(row.querySelectorAll("td"));
          const rawTaxId = cells[1]?.innerText.trim() || "";
          const matchTaxId = rawTaxId.match(/(\d{13})$/);
          const branchText = cells[2]?.innerText.trim() || "";
          let rawCompanyName =
            cells[3]?.innerText.trim().replace(/\s+/g, " ") || "";
          const [firstName] = rawCompanyName.split(" / ");
          const companyName = firstName.trim();
          const address = cells[4]?.innerText.trim().replace(/\s+/g, " ");
          const postalCode = cells[5]?.innerText.trim();

          return {
            taxpayerId: matchTaxId ? matchTaxId[1] : rawTaxId,
            companyName,
            customerBranch: branchText,
            fullAddress: postalCode ? `${address} ${postalCode}` : address,
          };
        })
        .filter((row) => row.taxpayerId && row.companyName && row.fullAddress)
    );

    await browser.close();

    if (!rows.length || !rows[0].taxpayerId) {
      return NextResponse.json(
        { error: "No Data Found (empty row)" },
        { status: 404 }
      );
    }

    return NextResponse.json({ results: rows });
  } catch (err) {
    return NextResponse.json(
      {
        error: "VATINFO scrape failed",
        message: err?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
