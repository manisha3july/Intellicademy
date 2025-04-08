import React from 'react'
import HeroImgTxt from './HeroImgTxt'
import GraphData from './GraphData'
import AboutSegments from './AboutSegments'


function About() {
  return (
    <>
     {/* <HeroInner bgimage={AboutImg} title='ABOUT' >    </HeroInner>  */}
      <HeroImgTxt  title='Why Intellacdemy?'   />
     <div className='container py-5'>
     <div className='row d-flex align-items-center justify-content-center'>
        <div className='col-sm-4'>
        <GraphData/>
        </div>
        <div className='col-sm-8'>
 
   <AboutSegments />

        </div>
      </div>
     </div>
    </>
  )
}

export default About