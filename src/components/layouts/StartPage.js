import { LandscapeStartPage } from '../Landscape';
import { isMobile } from 'react-device-detect';

const Layout = ({ children }) => {
  return (
    <>
      <div className="startPage">
        {isMobile ? (
          children
        ) : (
          <LandscapeStartPage />
        )} 
      </div>
    </>
  )
};

export default Layout;