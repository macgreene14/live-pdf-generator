import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";
//pass html as string

export default async function html2pdf(html) {
  browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.setContent(html); // Set any HTML content
  const pdf = await page.pdf({
    format: "A4",
    landscape: true,
    pageRanges: "1-1",
  }); //https://pptr.dev/api/puppeteer.pdfoptions
  await browser.close(); //finally
  return pdf;
}
