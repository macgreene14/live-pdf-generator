import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import createHTML from "./lib/templater.js";
import html2pdf from "./lib/html2pdf.js";
import uploadPDF2S3 from "./lib/S3.js";

// access .env variables
dotenv.config({ path: "./.env.local" });

const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const region = process.env.BUCKET_REGION;
const bucketName = process.env.BUCKET_NAME;

// create instance of express server
const app = express();
const port = 3000;

app.get("/api/generate", async (req, res) => {
  try {
    // access query string params
    const params = req.query;
    const context = {
      orientation: params.orientation,
      id: params.id,
      job: params.job,
      designer: params.designer,
      date: params.date,
    };
    console.log("context: ", context);

    // http://localhost:3000/api/generate?orientation=↑&id=AL-01&designer=Mac%20Greene&date="1-1-2024"

    // create HTML, PDF, add to S3 Bucket
    const htmlTemplateFilePath = "./views/template.html";
    const htmlString = fs.readFileSync(htmlTemplateFilePath, "utf8");
    const html = createHTML(htmlString, context);
    const pdfBuffer = await html2pdf(html);
    const pdfKey = "key";
    const response = await uploadPDF2S3(
      accessKeyId,
      secretAccessKey,
      region,
      bucketName,
      pdfKey,
      pdfBuffer
    );
    console.log(response);

    // create url of S3 Object
    const objectUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${pdfKey}`;

    res.send(objectUrl);
  } catch (e) {
    (e) => res.send(e);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
