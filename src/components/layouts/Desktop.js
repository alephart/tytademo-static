import Landscape from '@/components/Landscape';
import SEO from '../SEO';

const Layout = ({ children, ...props }) => {

  return (
    <>
      <SEO {...props} />
      <div className="container">
        {children}
        <Landscape />
      </div>
    </>
  )
};

export default Layout;
