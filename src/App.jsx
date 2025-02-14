import './App.css'
import './index.css'
import 'animate.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import SearchPage from './SearchPage'

function App () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/search' element={<SearchPage />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <SearchPage /> */}
    </>
  )
}

export default App
