import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import Handlebars from "handlebars";
import html2pdf from "./lib/html2pdf.js";
import uploadPDF2S3 from "./lib/S3.js";

// access .env variables
dotenv.config({ path: "./.env.local" });

const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const region = process.env.BUCKET_REGION;
const bucketName = process.env.BUCKET_NAME;

// compile template
const htmlTemplateFilePath = "./views/template.html";
const htmlTemplate = fs.readFileSync(htmlTemplateFilePath, "utf8");
const template = Handlebars.compile(htmlTemplate);

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

    // http://localhost:3000/api/generate?orientation=↑&id=AL-01&designer=Mac%20Greene&date="1-1-2024"

    // create HTML, PDF, add to S3 Bucket
    const html = template(context);
    const pdfBuffer = await html2pdf(html);
    const pdfKey = "key";

    const url = await uploadPDF2S3(
      accessKeyId,
      secretAccessKey,
      region,
      bucketName,
      pdfKey,
      pdfBuffer
    );

    res.status(200).send(url);
  } catch (e) {
    (e) => res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`PDF Generator listening on port ${port}`);
});
