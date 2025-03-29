import github from '../assets/github.svg'
import linkedin from '../assets/linkedin.svg'

export default function Footer () {
  return (
    <div className='h-16 w-full bg-[#242634] flex items-center justify-center text-white'>
      <span>Made by Deepanshu</span>
      <a
        href='https://github.com/deepanshuhyb'
        target='_blank'
        rel='noopener noreferrer'
        className='ml-2'
      >
        <img
          src={github}
          alt='GitHub'
          className='w-6 h-6 hover:scale-125 transition-transform duration-300'
        />
      </a>
      <a
        href='https://www.linkedin.com/in/deepanshuhybr/'
        target='_blank'
        rel='noopener noreferrer'
        className='ml-2'
      >
        <img
          src={linkedin}
          alt='Linkedin'
          className='w-6 h-6 hover:scale-125 transition-transform duration-300'
        />
      </a>
    </div>
  )
}
