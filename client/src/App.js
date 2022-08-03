import './App.css';
import { useEffect, useState } from 'react'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { getPosts } from './actions/posts'
import Navbar from './components/Navbar/Navbar'
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'
import useStyles from './styles'

const App = () => {

  const [currentId, setCurrentId] = useState(null)
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch, currentId ])

  return (
    <Container maxwidth='lg'>
      <Navbar />
      <Grow in>
          <Container>
            <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}> 
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
      </Grow>
    </Container>
  );
}

export default App;
