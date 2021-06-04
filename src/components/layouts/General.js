import { isAndroid } from 'react-device-detect';

const Layout = ({ children }) => {
  return (
    <div className={`container ${isAndroid ? 'android' : ''}`}>
      {children}
      {/* aqui va version desktop */}
    </div>
  )
};

export default Layout;
