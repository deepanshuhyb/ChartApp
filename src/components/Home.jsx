import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home ({ OnSearch }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  function handleClick (e) {
    if (e.key === 'Enter' || e.type === 'click') {
      if (query.trim() !== '') navigate(`/${query}`, { replace: false })
    }
  }
  return (
    <>
      <div className='h-screen bg-[#09090B] px-4 py-2 w-full flex flex-col items-center justify-center'>
        <div className='text-teal-500 font-bold text-3xl md:text-4xl'>
          CHARTAPP
        </div>
        <div className='text-sm md:text-lg text-teal-700 py-3 text-center'>
          Search, Learn, and Analyze your stocks.
        </div>
        <form className='pt-4 w-full max-w-lg flex items-center gap-2'>
          <input
            type='text'
            placeholder='Search for the stock...'
            value={query}
            onChange={e => setQuery(e.target.value)}
            className='bg-[#09090B] rounded-lg w-full h-12 md:h-14 text-white px-4 focus:outline-none border-2 border-teal-500 focus:border-white transition'
            onKeyDown={handleClick}
          />
          <button
            className='bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition'
            onClick={handleClick}
          >
            Search
          </button>
        </form>
        <div className='text-white pt-4 text-lg'>Or Analyze</div>
      </div>
    </>
  )
}
