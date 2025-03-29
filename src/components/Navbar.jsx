import React, { useState, useRef, useEffect } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [open, setOpen] = useState(false)
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

  return (
    <div className='h-14 md:h-20 bg-[#0C0C10] w-full px-6 flex justify-between items-center shadow-lg border-b border-white'>
      <h1 className='text-xl md:pl-16 md:text-2xl text-[#FFD700]'>ChartApp</h1>
      <div className='hidden md:flex gap-8 pr-16'>
        <a
          href='/'
          className='text-white hover:text-[#FFD700] transition-transform hover:scale-125 duration-300'
        >
          Home
        </a>
        <a
          href='/api'
          className='text-white hover:text-[#FFD700] transition-transform hover:scale-125 duration-300'
        >
          API Reference
        </a>
        <a
          href='/contact'
          className='text-white hover:text-[#FFD700] transition-transform hover:scale-125 duration-300'
        >
          Contact
        </a>
      </div>

      {/* Mobile Menu */}
      <div className='md:hidden relative' ref={menuRef}>
        <button
          onClick={handleClick}
          className='text-white'
          aria-label='Toggle Menu'
          aria-expanded={open}
          role='button'
        >
          <GiHamburgerMenu className='text-2xl' />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className='absolute top-12 right-0 w-52 bg-[#222228]/70 backdrop-blur-lg flex flex-col items-center py-4 gap-2 z-50 rounded-lg shadow-lg'
            >
              <a
                href='/'
                className='text-white hover:text-[#FFD700] py-2 w-full text-center transition'
              >
                Home
              </a>
              <a
                href='/api'
                className='text-white hover:text-[#FFD700] py-2 w-full text-center transition'
              >
                API Reference
              </a>
              <a
                href='/contact'
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

export default Navbar
