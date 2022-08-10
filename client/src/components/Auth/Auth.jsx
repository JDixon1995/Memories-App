import { Avatar, Button, Paper, Grid, Typography, Container } from  '@material-ui/core'
import Input from './Input'
import useStyles from './styles'

const Auth = () => {
	const classes = useStyles()

	const isSignUp = false

	const handleSubmit = () => {
		console.log('clicked')
	}

	const handleChange = () => {
		console.log('changed')
	}

  return (
	<Container component='main' maxWidth='xs'>
		<Paper className={classes.paper} elevation={3}>
			<Avatar className={classes.avatar}>
				
			</Avatar>
			<Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Login In'}</Typography>
			<form className={classes.form} onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					{
						isSignUp && (
							<>
								<Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              					<Input name="lastName" label="Last Name" handleChange={handleChange} half />
							</>
						)
					}
				</Grid>
			</form>
		</Paper>
	</Container>
  )
}
export default Auth