import User from '../models/User.js'
import ErrorResponse from '../utils/errorResponse.js'
import sendEmail from '../utils/sendEmail.js'

export const register = async (req, res, next) => {
	const {firstName, lastName, email, password} = req.body

	try {
		const user = await User.create({
			firstName, lastName, email, password
		})

		sendToken(user, 201, res)
	} catch (error) {
		next(error)
	}
}

export const login = async (req, res, next) => {
	const {email, password} = req.body

	if(!email || !password) {	
		return next(new ErrorResponse("Please provide an email and password", 400))
	}

	try {
		const user = await User.findOne({ email }).select('+password')

		if(!user) {
			return next(new ErrorResponse('Invalid Credentials', 401))
		}

		const isMatch = await user.matchPasswords(password)

		if(!isMatch) {
			return next(new ErrorResponse('Invalid Credentials', 401))
		}

		sendToken(user, 200, res)
	} catch (error) {
		next(err)
	}
}

export const forgotPassword = async (req, res, next) => {
	// Send Email to email provided but first check if user exists
	const { email } = req.body;

	try {
	  const user = await User.findOne({ email });
  
	  if (!user) {
		return next(new ErrorResponse("No email could not be sent", 404));
	  }
  
	  // Reset Token Gen and add to database hashed (private) version of token
	  const resetToken = user.getResetPasswordToken();
  
	  await user.save();
  
	  // Create reset url to email to provided email
	  const resetUrl = `passwordreset/${resetToken}`;
  
	  // HTML Message
	  const message = `
		<h1>You have requested a password reset</h1>
		<p>Please make a put request to the following link:</p>
		<a href=${resetUrl} clicktracking=off>${resetUrl}</a>
	  `;
  
	  try {
		await sendEmail({
		  to: user.email,
		  subject: "Password Reset Request",
		  text: message,
		});
  
		res.status(200).json({ success: true, data: "Email Sent" });
	  } catch (err) {
		console.log(err);
  
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;
  
		await user.save();
  
		return next(new ErrorResponse("Email could not be sent", 500));
	  }
	} catch (err) {
	  next(err);
	}
}

export const resetPassword = async (req, res, next) => {

	const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
}

const sendToken = (user, statusCode, res) => {
	const token = user.getSignedToken()
	res.status(statusCode).json({
		success: true,
		token: token
	})
}