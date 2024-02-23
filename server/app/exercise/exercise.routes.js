import express from 'express'
import { createNewExercise, getExercises } from './exercise.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.route('/').post(protect, createNewExercise).get(protect, getExercises)

export default router
