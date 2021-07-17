import Landscape from '@/components/Landscape';
import SEO from '../SEO';

const Layout = ({ children, ...props }) => {
  const { className = '' } = props;

  return (
    <>
      <SEO {...props} />
      <div className="startPage">
        {children}
        <Landscape />
      </div>
    </>
  )
};

export default Layout;