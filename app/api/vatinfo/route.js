import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { taxpayerId, companyName } = await req.json();
    if (!taxpayerId && !companyName)
      return NextResponse.json(
        { error: "Missing taxpayer ID or company name" },
        { status: 400 }
      );

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

    const firstRow = await page.$eval("table.table-scroll tbody tr", (row) => {
      const cells = Array.from(row.querySelectorAll("td"));
      const rawTaxId = cells[1]?.innerText.trim() || "";
      const matchTaxId = rawTaxId.match(/(\d{13})$/);

      let rawCompanyName =
        cells[3]?.innerText.trim().replace(/\s+/g, " ") || "";

      const [firstName] = rawCompanyName.split(" / ");
      const companyName = firstName.trim();

      return {
        taxpayerId: matchTaxId ? matchTaxId[1] : rawTaxId,
        companyName,
        address: cells[4]?.innerText.trim().replace(/\s+/g, " "),
        postalCode: cells[5]?.innerText.trim(),
      };
    });

    await browser.close();

    if (!firstRow || !firstRow.taxpayerId) {
      return NextResponse.json(
        { error: "No Data Found (empty row)" },
        { status: 404 }
      );
    }

    const fullAddress = firstRow.postalCode
      ? `${firstRow.address} ${firstRow.postalCode}`
      : firstRow.address;

    return NextResponse.json({
      results: [
        {
          taxpayerId: firstRow.taxpayerId,
          companyName: firstRow.companyName,
          fullAddress,
        },
      ],
    });
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
