import './App.css';
import { Container } from '@material-ui/core'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'

const App = () => {
  
  return (
    <Container maxwidth='lg'>
      <Navbar />
      <Routes>
        <Route path='/Memories-App-Client' element={<Home /> } />
        <Route path='/Memories-App-Client/auth' element={<Auth /> } />
      </Routes>
    </Container>
  );
}

export default App;
