import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { AppBar, Typography, Avatar, Toolbar, Button } from '@material-ui/core'
import useStyles from './styles'
import memories from '../../images/memories.png'

const Navbar = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const logout = () => {
		dispatch({ type: 'LOGOUT' })
		navigate('/')
	}

	const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')))

	console.log(user)

	useEffect(() => {
		const token = user?.token


	}, [])
  return (
	<div>
		<AppBar className={classes.appBar} position='static' color='inherit'>
        <div className={classes.brandContainer}>
		<Typography component={Link} to='/Memories-App-Client' className={classes.header} variant='h2' align='center'>Memories</Typography>
        <img className={classes.image} src={memories} alt='memories' height='100' />
		</div>
		<Toolbar className={classes.toolbar}>
		{user ? (
			<div className={classes.profile}>
				<Avatar 
				className={classes.purple}
				alt={user.result.name}
				src={user.result.imageUrl}
				>{user.result.name.charAt(0)}</Avatar>
				<Typography className={classes.userName} variant='h6'>
					{user.result.name}
				</Typography>
				<Button variant='contained' className={classes.logout} color='secondary'>Logout</Button>
			</div>
		) : (
			<Button component={Link} to='/Memories-App-Client/auth' variant='contained' color='primary'>Login</Button>
		)}
		</Toolbar>
      </AppBar>
	</div>
  )
}
export default Navbar