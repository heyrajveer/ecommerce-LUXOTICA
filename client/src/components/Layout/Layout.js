import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';
  
const Layout = ({ children ,title,description,keywords,author}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" /> 
          <meta name="description" content={description}/>
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author}/>
          <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
         <Toaster />
        {children}
        </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps={
  title:"LUXOTICA-Show Now",
  description:"all type luxury brand  clothes available",
  keywords:"online shopping, buy products online ,eCommerce website, secure checkout , online store,show now ,cash on delivery",
  author:"Rajveer Kumar"
}  
export default Layout;
