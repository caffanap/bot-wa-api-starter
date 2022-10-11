import whatsapp from "whatsapp-web.js";
import WhatsappController from "../controller/WhatsappController.js";

process.title = "whatsapp-process"

global.client = new whatsapp.Client({
    authStrategy: new whatsapp.LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // <- this one doesn't works in Windows
            '--disable-gpu',
            '--use-gl=egl'
        ]
    },
    restartOnAuthFail: true,
});

global.authed = false;

export default function WhatsAppInitialize() {
    client.on("qr", (qr) => {
        WhatsappController.WaOnQR(qr)
    });

    client.on("authenticated", () => {
        WhatsappController.WaOnAuthenticated()
    });

    client.on("auth_failure", () => {
        WhatsappController.WaOnAuthFailure()
    });

    client.on("ready", () => {
        WhatsappController.WaOnReady()
    });

    client.on("message", (msg) => {
        WhatsappController.WaOnMessage(msg)
    })

    client.on("disconnected", () => {
        WhatsappController.WaOnDisconnected()
    });

    client.initialize();
}