function index(req, res) {
    res.json({
        author: "Choirul Affan Adi Putra",
        message: "Whatsapp BOT Starter Pack"
    })
}

async function greeting(message) {
    const text = `Haloo juga!`
    await message.reply(text)
}

function sendMessage(req, res) {
    const phone = req.body.phone
    const message = req.body.message

    client.sendMessage(phone + '@c.us', message)
    
    return res.json({
        message: "Successfully sent message to " + phone
    })
}

function sendBroadcast(req, res) {
    const message = req.body.message;
    const broadcast = req.body.broadcast || []

    if (broadcast.length > 0) {
        if (message) {
            broadcast.forEach(e => {
                client.sendMessage(e + '@c.us', message)
            });
            return res.json({ status: 'success', message: `Message Broadcast successfully sent to ${JSON.stringify(broadcast)}` })
        } else {
            return res.status(400).json({
                message: "Masukan Pesan!"
            })
        }
    } else {
        return res.status(400).json({
            message: "Nomor yang anda masukan salah!"
        })
    }
}

export default {
    index,
    greeting,
    sendMessage,
    sendBroadcast
}