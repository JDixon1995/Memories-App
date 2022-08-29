import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "Please enter your name"],
	},
	lastName: {
		type: String,
		required: [true, "Please enter your name"],
	},
	email: {
	  type: String,
	  required: [true, "Please provide email address"],
	  unique: true,
	  match: [
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		"Please provide a valid email",
	  ],
	},
	password: {
	  type: String,
	  required: [true, "Please add a password"],
	  minlength: 6,
	  select: false,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
  });

// hash the password
UserSchema.pre('save', async function(next) {
	if(!this.isModified('password')){
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
	next()
})

UserSchema.methods.matchPasswords = async function(password) {
	return await bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", UserSchema);

export default User