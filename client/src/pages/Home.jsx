import React from 'react'
import Header from '../component/Header'
import Steps from '../component/Steps'
import Discreption from '../component/Discreption'
import Testimonials from '../component/Testimonials'
import GenerateBtn from '../component/GenerateBtn'

const Home = () => {
  return (
    <div>
      <Header />
      <Steps />
      <Discreption />
      <Testimonials />
    <GenerateBtn/>
    </div>
  )
}

export default Home