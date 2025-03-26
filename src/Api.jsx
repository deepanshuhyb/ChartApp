import React from 'react'
import { BackgroundBeamsWithCollision } from './components/ui/background-beams-with-collision'

function Api () {
  return (
    <>
      <BackgroundBeamsWithCollision>
        <div className='h-[calc(100vh-7.5rem)] md:h-[calc(100vh-9rem)] bg-[#09090B] w-full flex '>
          <div className='md:text-5xl text-xl text-white pt-10 pl-16'>
            Stock Market Data Powered by{' '}
            <div className='text-7xl text-bold'>Upstox API</div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </>
  )
}

export default Api
