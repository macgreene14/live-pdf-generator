import Handlebars from "handlebars";

export default function createHTML(htmlTemplate, context) {
  const template = Handlebars.compile(htmlTemplate);
  const html = template(context);
  return html;
}
