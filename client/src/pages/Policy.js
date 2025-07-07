import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
  return (
    <Layout title={"privacy policy-LUXOTICA"}>
     <div className='row contactus'>
           <div className='img col-md-6'>
             <img src ='images/contactus.jpeg'
             alt='contactus'
             style={{width:"100%"}}
             />
              
           </div>
         <div className='col-md-5'> 
           <p classNametext="text-justify mt=2">We are committed to protecting your privacy. All personal information shared through our website is kept secure and is used only to assist you with your queries or orders. We do not share your data with any third party without your consent. For more details, please read our full Privacy Policy.</p>
           <p />
         </div>
          </div>
    </Layout>
  )
}

export default Policy
