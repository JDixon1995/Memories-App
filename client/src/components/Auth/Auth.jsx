import { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from  '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Input from './Input'
import useStyles from './styles'


const Auth = () => {
	
	const [ authForm, setAuthForm ] = useState(
		{ 
		firstName: '', 
		lastName: '', 
		email: '', 
		password: '', 
		confirmPassword: '' 
	})
	const [ isSignUp, setIsSignUp] = useState(false)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const classes = useStyles()

	const [ showPassword, setShowPassword] = useState(false)
	const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isSignUp) {
		  dispatch();
		} else {
		  dispatch();
		}
	}

	const handleChange = (e) => setAuthForm({ ...authForm, [e.target.name]: e.target.value })

	const switchMode = () => {
		setAuthForm(authForm)
		setIsSignUp((prevIsSignUp) => !prevIsSignUp)
		handleShowPassword(false)
	}
	
  return (
	<Container component='main' maxWidth='xs'>
		<Paper className={classes.paper} elevation={3}>
			<Avatar className={classes.avatar}>
				
			</Avatar>
			<Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Log In'}</Typography>
			<form className={classes.form} onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					{
						isSignUp && (
							<>
								<Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              					<Input name="lastName" label="Last Name" handleChange={handleChange} half />
							</>
						)}
						<Input name='email' label="Email Address" type='email' handleChange={handleChange} autoFocus/>
						<Input name='password' label="Password" type={showPassword ? 'text' : 'password'} handleChange={handleChange} handleShowPassword={handleShowPassword} />
						{ isSignUp && <Input name='confirmPassword' label="Repeat Password" handleChange={handleChange} type='password' />}
				</Grid>
			<Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
				{isSignUp ? 'Sign Up' : 'Sign In'}
				</Button>
				<Grid container justifyContent='flex-end'>
					<Grid item>
						<Button onClick={switchMode}>
							{isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up." }
						</Button>
					</Grid>
				</Grid>
			</form>
		</Paper>
	</Container>
  )
}
export default Auth