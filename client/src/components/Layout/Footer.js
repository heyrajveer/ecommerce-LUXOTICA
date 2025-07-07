import { Link } from "react-router-dom"
const Footer = () => {
  return (
  
 <div className="footer bg-dark text-light p-3 fixed-bottom">
      <h4 className="text-center">All Right Reserved &copy; Technifoyt</h4>
<p className="footer text-center mt-1">
  <Link to="/about" className="footer-link">About</Link>
  <span className="separator">|</span>
  <Link to="/contact" className="footer-link">Contact</Link>
  <span className="separator">|</span>
  <Link to="/policy" className="footer-link">Policy</Link>
</p>

 </div>
     
  )
}

export default Footer
