import { Navbar, Home, Footer } from './components/'
import { useState } from 'react'
export default function HomePage () {
  const [query, setQuery] = useState('')
  console.log('Search Query:', query)

  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  )
}
