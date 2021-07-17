import { LandscapeGeneral } from '../Landscape';
import { isMobile, isAndroid } from 'react-device-detect';
import SEO from '../SEO';

const Layout = ({ children, ...props }) => {
  const { className = null } = props;

  return (
    <>
      <SEO />
      <div className={`container ${className && className} ${isAndroid ? 'android' : ''}`}>
        {isMobile ? (
          children
        ) : (
          <LandscapeGeneral />
        )}
      </div>
    </>
  )
};

export default Layout;
