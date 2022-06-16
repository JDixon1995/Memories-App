import Post from './Post/Post';
import { useSelector } from 'react-redux'
import useStyles from './styles'

const Posts = () => {
  const posts = useSelector((state) => state.posts)
  const classes = useStyles()

  return (
    <>
      <h2>Posts</h2>
      <Post />
      <Post />
    </>
	
  )
}
export default Posts