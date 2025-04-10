import { Navbar, Home, Footer } from './components/'
import { BackgroundBeamsWithCollision } from './components/ui/background-beams-with-collision'
export default function HomePage () {
  return (
    <>
      <Navbar />
      <BackgroundBeamsWithCollision>
        <Home />
      </BackgroundBeamsWithCollision>
      <Footer />
    </>
  )
}
