import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { motion, AnimatePresence } from 'framer-motion'

function Navbar () {
  const [open, setOpen] = useState(false)

  function handleClick () {
    setOpen(!open)
  }

  return (
    <>
      <div className='h-14 md:h-20 bg-sky-800 md:w-full p-6 flex justify-between items-center'>
        <div className='text-xl md:pl-16 md:text-2xl text-[#FFD700]'>
          <h1>ChartApp</h1>
        </div>
        <div className='hidden md:flex gap-8 pr-16'>
          <a href='#' className='text-[white] hover:text-[#FFD700]'>
            Home
          </a>
          <a href='#' className='text-[white] hover:text-[#FFD700]'>
            API Reference
          </a>
          <a href='#' className='text-[white] hover:text-[#FFD700]'>
            Contact
          </a>
        </div>

        <div className='md:hidden'>
          <button onClick={handleClick}>
            <GiHamburgerMenu className='md:hidden text-white' />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className='absolute top-16 right-5 w-40 bg-sky-800 flex flex-col items-center py-4 gap-2 z-50 rounded-lg shadow-lg'
              >
                <a href='#' className='text-white hover:text-[#FFD700] py-1'>
                  Home
                </a>
                <a href='#' className='text-white hover:text-[#FFD700] py-1'>
                  API Reference
                </a>
                <a href='#' className='text-white hover:text-[#FFD700] py-1'>
                  Contact
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

export default Navbar
