
import Layout from '../components/Layout/Layout'
import { BiMailSend,BiPhoneCall,BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact Us-LUXOTICA"}>
      <div className='row contactus'>
        <div className='img col-md-6'>
          <img src ='images/contactus.jpeg'
          alt='contactus'
          style={{width:"100%"}}
          />
           
        </div>
      <div className='col-md-4'> 
        <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
        <p classNametext="text-justify mt=2"> any query and infoabout product free to call anytime we 24*7 available </p>
        <p />
        <p className='mt-3'>
          <BiMailSend/>:www.help@commerceapp.com
        </p>
         <p className='mt-3'>
          <BiPhoneCall/>:012-3456789
        </p>

         <p className='mt-3'>
          <BiSupport/>: 1800-0000-0000 (toll free)
        </p>
      </div>
       </div>
       
    </Layout>
  )
}

export default Contact
