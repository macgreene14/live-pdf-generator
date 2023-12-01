import puppeteer from "puppeteer";

//pass html as string
export default async function html2pdf(html) {
  const browser = await puppeteer.launch({ headless: "new" });
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
