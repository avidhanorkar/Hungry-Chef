import About from '@/Components/Landing Page/About'
import Hero from '@/Components/Landing Page/Hero'
import Menu from '@/Components/Landing Page/Menu'
import ReserveTable from '@/Components/Landing Page/ReserveTable'
import Testimonials from '@/Components/Landing Page/Testimonials'
import React from 'react'

const LandingPage = () => {
  return (
    <div className='bg-[#131620]'>
        <Hero />
        <About />
        <Menu />
        <Testimonials />
        <ReserveTable />
    </div>
  )
}

export default LandingPage