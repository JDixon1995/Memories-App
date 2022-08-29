import User from '../models/User.js'

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
		res.status(500).json({
			success: false,
			error: error.message
		})
	}
}

export const login = async (req, res, next) => {
	const {email, password} = req.body

	if(!email || !password) {	
		res.status(400).json({
			success: false,
			error: 'Please provide email and password.'
		})
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
		res.status(500).json({
			success: false,
			error: error.message
		})
	}
}

export const forgotPassword = (req, res, next) => {
	res.send('Forgot Password Route')
}

export const resetPassword = (req, res, next) => {
	res.send('Reset Password Route')
}