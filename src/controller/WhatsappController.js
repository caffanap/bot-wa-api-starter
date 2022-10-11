import qrcode from "qrcode";
import fs from "fs";
import DefaultController from "./DefaultController.js";


async function WaOnMessage(message) {
    // Your Logic Here
    if (message.body == 'halo') {
        DefaultController.greeting(message)
    }
}

function WaOnQR(qr) {
    console.log("Generate QR Code...");
    qrcode.toDataURL(qr, (err, url) => {
        fs.writeFileSync("./src/qr/last.qr", url);
        console.log("QR Code Successfully Generated!");
    });
}

function WaOnAuthenticated() {
    console.log("Authenticated!");
    authed = true;
    try {
        fs.unlinkSync("./src/qr/last.qr");
    } catch (err) { }
}

function WaOnAuthFailure() {
    console.log("Closing Program");
    process.exit(0);
}

function WaOnReady() {
    console.log("Client Ready!");
}

function WaOnDisconnected() {
    console.log("disconnected");
    client.destroy();
    client.initialize();
}

export default {
    WaOnQR,
    WaOnAuthenticated,
    WaOnAuthFailure,
    WaOnReady,
    WaOnMessage,
    WaOnDisconnected
}