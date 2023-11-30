import Handlebars from "handlebars";

export default function createHTML(htmlTemplate, context) {
  try {
    const template = Handlebars.compile(htmlTemplate);
    const html = template(context);
    return html;
  } catch (error) {
    (error) => console.log(error);
  }
}
