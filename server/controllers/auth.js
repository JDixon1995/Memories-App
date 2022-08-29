import User from '../models/User.js'

export const register = async (req, res, next) => {
	const {firstName, lastName, username, email, password} = req.body

	try {
		const user = await User.create({
			firstName, lastName, username, email, password
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

export const login = (req, res, next) => {
	res.send('Login Route')
}

export const forgotPassword = (req, res, next) => {
	res.send('Forgot Password Route')
}

export const resetPassword = (req, res, next) => {
	res.send('Reset Password Route')
}