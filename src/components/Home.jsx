import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home ({ OnSearch }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredResults, setFilteredResults] = useState([])

  useEffect(() => {
    fetch('./complete.json')
      .then(data => data.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredResults([])
      return
    }

    const results = data
      .filter(
        item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !item.instrument_key.startsWith('NSE_FO')
      )
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 5)

    setFilteredResults(results)
  }, [searchQuery, data])

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(query)
    }, 300)

    return () => clearTimeout(handler)
  }, [query])

  return (
    <>
      <div className='h-[calc(100vh-7.5rem)] md:h-[calc(100vh-9rem)] bg-[#09090B] px-4 py-2 w-full flex flex-col items-center justify-center'>
        <div className='text-teal-500 font-bold text-3xl md:text-4xl'>
          CHARTAPP
        </div>
        <div className='text-sm md:text-lg text-teal-700 py-3 text-center'>
          Search, Learn, and Analyze your stocks.
        </div>
        <form className='pt-4 w-full max-w-lg relative'>
          <div className='relative w-full'>
            <input
              type='text'
              placeholder='Search for the stock...'
              value={query}
              onChange={e => setQuery(e.target.value)}
              className='bg-[#09090B] rounded-lg w-full h-12 md:h-14 text-white px-4 focus:outline-none border-2 border-teal-500 focus:border-white transition'
            />
            {filteredResults.length > 0 && (
              <ul className='absolute left-0 w-full bg-[#1a1a1d] border border-teal-500 rounded-lg mt-1 overflow-y-auto max-h-40 z-10 scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-transparent'>
                {filteredResults.map(item => (
                  <li
                    key={item.instrument_key}
                    className='px-4 py-2 text-white hover:bg-teal-500 cursor-pointer'
                    onClick={() => {
                      setQuery(item.name)
                      setSearchQuery('')
                      setFilteredResults([])
                      navigate(`/${item.instrument_key}`, { replace: false })
                    }}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </form>
      </div>
    </>
  )
}
