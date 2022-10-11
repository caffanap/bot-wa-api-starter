import bodyParser from "body-parser";
import express from "express";
import WhatsAppInitialize from "./src/library/whatsapp.js";
import Middleware from "./src/middleware/index.js";
import router from "./src/router/index.js";

const app = express()
const port = process.env.PORT || 5000
global.app = app

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router)

app.listen(port, () => {
    Middleware()
    WhatsAppInitialize()
    console.log("Server Running on port:" + port);
})