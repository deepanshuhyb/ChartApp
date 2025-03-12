import React, { useState, useRef, useEffect } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FiSearch } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const NavbarwithSearch = ({ onSearch }) => {
  const nav = useNavigate()

  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const menuRef = useRef(null)

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

  function handleClick () {
    setOpen(!open)
  }

  function handleSearch (e) {
    if (e.key === 'Enter' || e.type === 'click') {
      onSearch(searchQuery)
      nav(`/${searchQuery}`)
    }
  }

  return (
    <div className='h-14 md:h-20 bg-[#09090B] md:w-full px-6 flex justify-between items-center shadow-lg border-b border-white'>
      <h1 className='text-xl md:pl-16 md:text-2xl text-[#FFD700]'>
        <a href='http://localhost:5173/' target='_blank'>
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
          className='absolute left-3 top-1/2 transform -translate-y-1/2  text-gray-400 text-xl cursor-pointer'
          onClick={handleSearch}
        />
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
              className='absolute top-12 right-0 w-44 bg-sky-800 flex flex-col items-center py-4 gap-2 z-50 rounded-lg shadow-lg'
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
