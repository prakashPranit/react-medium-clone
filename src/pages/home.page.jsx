import React from 'react'
import AnimationWrapper from '../common/page-animation'
import InpageNavigation from '../components/inpage-navigation.component'
const HomePage = () => {
  return (
   <AnimationWrapper >
    <section  className='h-cover flex justify-center gap-10'>
        {/*Latest Blogs  */}

       <div className="w-full">
       <InpageNavigation routes={['Home','Trending']} defaultHidden={['']}  >

       <div>Home</div>
        <div>Trending</div>
       </InpageNavigation>
        
       </div>
        {/* Filters and trending blogs */}

    </section>
   </AnimationWrapper>
  )
}

export default HomePage