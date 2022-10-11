import fs from "fs";

function checkAuth(req, res) {
    client
        .getState()
        .then((data) => {
            if (data) {
                res.json({
                    connected: true,
                    message: data
                })
            } else {
                res.json({
                    connected: false,
                    message: "Service is booting up!"
                })
            }
        })
        .catch((err) => {
            if (err) {
                res.json({
                    connected: false,
                    message: "Service is Disconnected!"
                })
            }
        });
}

function loginQr(req, res) {
    client
        .getState()
        .then((data) => {
            if (data) {
                res.json({
                    message: "Sudah terkoneksi!",
                })
            } else {
                fs.readFile("./src/qr/last.qr", "utf8", (err, last_qr) => {
                    if (last_qr) {
                        res.json({
                            message: 'Scan Here...',
                            data: last_qr
                        })
                    } else {
                        res.json({
                            message: 'QR not ready!'
                        })
                    }
                });
            };
        })
        .catch(() => {
            fs.readFile("./src/qr/last.qr", "utf8", (err, last_qr) => {
                if (last_qr) {
                    res.json({
                        message: 'Scan Here...',
                        data: last_qr
                    })
                } else {
                    res.json({
                        message: 'QR not ready!'
                    })
                }
            });
        });
}

function logout(req, res) {
    client.logout()
    return res.json({
        message: "Logout Successfully"
    })
}


export default {
    checkAuth,
    loginQr,
    logout
}