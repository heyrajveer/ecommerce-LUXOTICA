import Layout from "../components/Layout/Layout"

function About() {
  return (
   <Layout title={"About-LUXOTICA"}>
 
    
      <div className='row contactus'>
             <div className='img col-md-6'>
               <img src="images/about.jpeg" 
               alt='contactus'
               style={{width:"100%"}}
               />
                
             </div>
           <div className='col-md-5'> 
    
             <p classNametext="test-justify mt=2">The Contact page is a part of your React-based commerce application. It displays company contact information like email, phone number, and toll-free support using React Icons. The layout is split into two columns — one with a contact image and the other with text details. Flexbox and Bootstrap are used for responsive design and center alignment. It uses a shared Layout component for consistent structure. </p>
             <p />
         
           </div>
            </div>
   </Layout>
  )
}

export default About
