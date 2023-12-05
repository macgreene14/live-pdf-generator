import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import Handlebars from "handlebars";
import pdf from "html-pdf";
import uploadPDF2S3 from "./lib/S3.js";

// access .env variables
dotenv.config({ path: "./.env.local" });

const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const region = process.env.BUCKET_REGION;
const bucketName = process.env.BUCKET_NAME;

// compile template
const htmlTemplateFilePath = "./views/template.handlebars";
const htmlTemplate = fs.readFileSync(htmlTemplateFilePath, "utf8");
const template = Handlebars.compile(htmlTemplate);

// create instance of express server
const app = express();
const port = process.env.PORT || 3000; // Use Heroku's PORT or 3000 if local

app.get("/generate", async (req, res) => {
  try {
    // access query string params
    const params = req.query;
    let context = { items: null, logo: null, fontSize: "50px" };
    let pdfKey = "pdf";

    if (params.items) {
      context.items = params.items.split(",");
      pdfKey = context.items.join("_");
    }
    if (params.logo) {
      context.logo = params.logo;
    }
    if (params.fontSize) {
      context.fontSize = params.fontSize;
    }

    // create HTML, PDF, add to S3 Bucket
    const html = template(context);
    var options = {
      format: "letter",
      orientation: "landscape",
      childProcessOptions: { env: { OPENSSL_CONF: "/dev/null" } },
    };

    const pdfBuffer = await new Promise((resolve, reject) => {
      pdf.create(html, options).toBuffer(function (err, buffer) {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      });
    });

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
