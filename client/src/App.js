import Landing from './components/Landing/Landing'
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import DogDetail from './components/DogDetail/DogDetail'
import CreateDog from './components/CreateDog/CreateDog'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/' element={<Nav/>}>
            <Route path='/home' element={<Home/>}/>
            <Route path='/dog/:id' element={<DogDetail/>}/>
            <Route path='/create' element={<CreateDog/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App