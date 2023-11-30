# README.md for Live-PDF-Generate

## Overview

`live-pdf-generate` is a Node.js application designed to automate the creation of bay labels for warehouse management. It exposes an endpoint to retrieve data, uses Handlebars for templating documents, Puppeteer for generating PDFs from HTML, Amazon S3 for storing and retrieving PDFs with live URLs, and Express for handling HTTP requests.

## Features

- **Dynamic PDF Generation**: Create custom PDFs dynamically based on template and context provided via HTTP GET requests.
- **Handlebars Templating**: Utilize Handlebars for flexible HTML templating.
- **Puppeteer PDF Creation**: Convert HTML templates into PDFs using Puppeteer.
- **S3 Integration**: Automatically upload generated PDFs to Amazon S3 for reliable storage and easy access.
- **Express Server**: A robust server setup using Express to handle incoming requests.
- **Airtable Integration**: Seamlessly integrate with Airtable for fetching necessary data for bay labels.

## Requirements

- Node.js
- An AWS account with S3 access
- Access to an environment where you can run Node.js applications (local, server, AWS Lambda, etc.)

## Configuration

1. Set up your `.env` file with the necessary credentials:
   ```
   BUCKET_NAME="s3-bucket-name"
   BUCKET_REGION="s3-bucket-region"
   ACCESS_KEY="s3-user-access-key"
   SECRET_ACCESS_KEY="s3-user-secret-key"
   NODE_ENV="development"
   ```
2. Customize the Handlebars template in the `templates` directory as needed. Modify the context object when parsing query string params to match the template.

## License

Specify the license under which the project is available. Common licenses for open-source projects include MIT, GPL, and Apache 2.0.
