import { Navbar, Footer, StockChart, NavbarwithSearch } from './components'
import { useState } from 'react'

export default function SearchPage () {
  const [query, setQuery] = useState('')
  console.log('Search Query:', query)
  return (
    <>
      <NavbarwithSearch onSearch={query => setQuery(query)} />
      <StockChart />
      <Footer />
    </>
  )
}
