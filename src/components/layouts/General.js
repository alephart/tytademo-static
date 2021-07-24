import { isAndroid } from 'react-device-detect';
import Landscape from '@/components/Landscape';
import SEO from '../SEO';

const Layout = ({ children, ...props }) => {
  console.log(props);
  const { className = '' } = props;

  return (
    <>
      <SEO {...props} />
      <div className={`container ${isAndroid ? 'android' : ''} ${className}`}>
        {children}
        <Landscape />
      </div>
    </>
  )
};

export default Layout;
