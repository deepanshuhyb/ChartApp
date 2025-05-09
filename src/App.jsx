import './App.css'
import './index.css'
import 'animate.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import SearchPage from './SearchPage'
import Apireference from './Apireference'
import Contact from './Contact'

function App () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/Api' element={<Apireference />}></Route>
          <Route path='/:id' element={<SearchPage />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <SearchPage /> */}
    </>
  )
}

export default App
