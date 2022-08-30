import User from '../models/User.js'
import ErrorResponse from '../utils/errorResponse.js'

export const register = async (req, res, next) => {
	const {firstName, lastName, email, password} = req.body

	try {
		const user = await User.create({
			firstName, lastName, email, password
		})

		res.status(201).json({
			success: true,
			user: user
		})
	} catch (error) {
		next(error)
	}
}

export const login = async (req, res, next) => {
	const {email, password} = req.body

	if(!email || !password) {	
		return next(new ErrorResponse("Please provide an email and password"))
	}

	try {
		const user = await User.findOne({ email }).select('+password')

		if(!user) {
			res.status(404).json({
				success: false,
				error: 'Invalid Credentials'
			})
		}

		const isMatch = await user.matchPasswords(password)

		if(!isMatch) {
			res.status(404).json({
				success: false,
				error: 'Invalid Credentials'
			})
		}

		res.status(200).json({
			success: true,
			token: "12121234"
		})
	} catch (error) {
		next(err)
	}
}

export const forgotPassword = (req, res, next) => {
	res.send('Forgot Password Route')
}

export const resetPassword = (req, res, next) => {
	res.send('Reset Password Route')
}