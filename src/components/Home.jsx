import search from '../assets/search-svgrepo-com.svg'

export default function Home () {
  return (
    <>
      <div className='h-screen bg-backgr px-4 py-2 w-full'>
        <div className='flex flex-col items-center gap-1 justify-center h-full'>
          <div className='text-teal-500 font-bold text-2xl md:text-3xl'>
            CHARTAPP
          </div>
          <div className='text-sm md:text-l text-teal-700 py-3'>
            Search, learn and Analyze your stock.
          </div>
          <form action='' className='pt-2 w-full justify-center flex'>
            <input
              type='text'
              placeholder='Search for the stock'
              className='bg-[#222937] pb-1 rounded w-72 h-12 md:w-1/2 md:h-14 text-white px-4'
            />
          </form>
          <div className='text-white pt-4'>Or anaylize</div>
        </div>
      </div>
    </>
  )
}
