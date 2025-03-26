import React, { useState, useEffect, useRef } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FiSearch } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const NavbarwithSearch = () => {
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchData, setSearchData] = useState([])
  const [filteredResults, setFilteredResults] = useState([])
  const menuRef = useRef(null)

  useEffect(() => {
    fetch('/complete.json')
      .then(res => res.json())
      .then(data => setSearchData(data))
      .catch(err => console.error('Error loading JSON:', err))
  }, [])

  useEffect(() => {
    function handleOutsideClick (e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredResults([])
      return
    }

    const results = searchData
      .filter(
        item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !item.instrument_key.startsWith('NSE_FO') // ❌ Ignore NSE_FO items
      )
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 10)

    setFilteredResults(results)
  }, [searchQuery, searchData])

  function handleClick () {
    setOpen(!open)
  }

  function handleSearch (e) {
    if (e.key === 'Enter' || e.type === 'click') {
      nav(`/${searchQuery}`)
    }
  }

  function handleSelectItem (item) {
    setSearchQuery(item.name)
    nav(`/${item.instrument_key}`)
    setFilteredResults([])
    setSearchQuery('')
  }

  return (
    <div className='h-14 md:h-20 bg-[#09090B] md:w-full px-6 flex justify-between items-center shadow-lg border-b border-white'>
      <h1 className='text-xl md:pl-16 md:text-2xl text-[#FFD700]'>
        <a href='/' target='_blank' rel='noopener noreferrer'>
          ChartApp
        </a>
      </h1>

      <div className='relative w-full max-w-md mx-4'>
        <input
          type='text'
          placeholder='Search for the stock...'
          className='bg-[#222937] rounded-lg w-full h-10 md:h-12 text-white px-10 focus:outline-none border-2 border-transparent focus:border-teal-500 transition'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
        <FiSearch
          className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl cursor-pointer'
          onClick={handleSearch}
        />

        {filteredResults.length > 0 && (
          <ul className='absolute left-0 right-0 mt-2 bg-[#222937] border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50'>
            {filteredResults.map((item, index) => (
              <li
                key={index}
                className='p-3 hover:bg-[#333A47] text-white cursor-pointer'
                onClick={() => handleSelectItem(item)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className='md:hidden relative' ref={menuRef}>
        <button onClick={handleClick} className='text-white'>
          <GiHamburgerMenu className='text-2xl' />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className='absolute top-12 right-0 w-44 bg-[#222228] flex flex-col items-center py-4 gap-2 z-50 rounded-lg shadow-lg'
            >
              <a
                href='#'
                className='text-white hover:text-[#FFD700] py-2 w-full text-center transition'
              >
                Home
              </a>
              <a
                href='#'
                className='text-white hover:text-[#FFD700] py-2 w-full text-center transition'
              >
                API Reference
              </a>
              <a
                href='#'
                className='text-white hover:text-[#FFD700] py-2 w-full text-center transition'
              >
                Contact
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default NavbarwithSearch
