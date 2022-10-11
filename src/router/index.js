import { Router } from "express";
import AuthController from "../controller/AuthController.js";
import DefaultController from "../controller/DefaultController.js";

const router = Router()


router.get('/', DefaultController.index)

router.get('/api/auth/login', AuthController.loginQr)
router.get('/api/auth/logout', AuthController.logout)
router.get('/api/auth/check', AuthController.checkAuth)


router.post('/api/send/message', DefaultController.sendMessage)
router.post('/api/send/broadcast', DefaultController.sendBroadcast)


export default router