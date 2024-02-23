import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { hash } from 'argon2'
import { generateToken } from './generate-token.js'
import { UserFields } from '../utils/user.utils.js'

// @desc 		Auth user
// @route 	POST /api/auth/login
// @access 	Public
export const authUser = asyncHandler(async (req, res) => {
	const user = await prisma.user.findMany()

	res.json(user)
})

// @desc 		Register user
// @route 	POST /api/auth/register
// @access 	Public
export const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const hasUser = await prisma.user.findUnique({
		where: {
			email
		}
	})

	if (hasUser) {
		res.status(400)
		throw new Error('User already exists')
	}

	const user = await prisma.user.create({
		data: {
			email,
			password: await hash(password),
			name: faker.name.fullName()
		},
		select: UserFields
	})

	const token = generateToken(user.id)

	res.json({ user, token })
})
