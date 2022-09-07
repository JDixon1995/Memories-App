import express from 'express'
const router = express.Router()
import { getPrivateData } from '../controllers/private.js'

router.route('/').get(getPrivateData)

export default router