import { engine } from "express-handlebars";


export const hbsEngine = engine({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
    partials: "/public/views/partials"
})