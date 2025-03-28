import React from 'react'
import { BackgroundBeamsWithCollision } from './ui/background-beams-with-collision'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

function ContactPage () {
  return (
    <BackgroundBeamsWithCollision>
      <div className='h-[calc(100vh-7.5rem)] md:h-[calc(100vh-9rem)] w-screen bg-[#09090B] flex flex-col gap-4 text-white items-center justify-center'>
        <div className='text-white text-4xl md:text-5xl mb-6 text-center'>
          Developed by:
        </div>
        <div className='flex justify-center w-full'>
          <div className='bg-[#1A1A1D] p-6 md:p-8 rounded-2xl shadow-lg flex flex-col items-center w-full max-w-sm transition-all duration-300 transform hover:scale-105'>
            <h2 className='text-3xl md:text-4xl font-bold mb-2'>Deepanshu</h2>
            <p className='text-gray-400 mb-4 text-sm md:text-base'>
              Frontend Developer
            </p>
            <div className='flex gap-6 mt-4'>
              <a
                href='https://github.com/deepanshuhyb'
                target='_blank'
                aria-label='GitHub Profile'
                role='button'
              >
                <FaGithub className='text-white text-2xl md:text-3xl hover:text-gray-400 transition-colors' />
              </a>
              <a
                href='https://www.linkedin.com/in/deepanshuhybr'
                target='_blank'
                aria-label='LinkedIn Profile'
                role='button'
              >
                <FaLinkedin className='text-white text-2xl md:text-3xl hover:text-gray-400 transition-colors' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  )
}

export default ContactPage
