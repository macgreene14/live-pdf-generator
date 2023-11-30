import Handlebars from "handlebars";

const htmlStr = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            width: 297mm;
            height: 210mm;
            margin: 0mm;
            padding: 0mm;
            page-break-after: always;
            background: white;
        }
        .container-col {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            height: 100%;
        }
        .container-row {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
        }
        .info {
            color: black;
            text-align: center;
            font-size: 40px;

        }
    </style>
</head>
<body>
    <div class="container-col">
        <div class="info">
            <div class="container-row">
                <p>{{bayOrientation}}</p>
                <h2>{{bayId}}</h2>
                <p>{{bayOrientation}}</p>
            </div>
            <p>{{designer}}</p>
            <p>{{dateIn}}</p>
        </div>
    </div>
</body>
</html>`;

export default function createHTML(htmlTemplate, context) {
  const template = Handlebars.compile(htmlTemplate);
  const html = template(context);
  return html;
}
