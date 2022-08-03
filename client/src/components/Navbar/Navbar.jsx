import { AppBar, Typography } from '@material-ui/core'
import useStyles from './styles'
import memories from '../../images/memories.png'

const Navbar = () => {
	const classes = useStyles()
  return (
	<div>
		<AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.header} variant='h2' align='center'>Memories</Typography>
        <img className={classes.image} src={memories} alt='memories' height='100' />
      </AppBar>
	</div>
  )
}
export default Navbar