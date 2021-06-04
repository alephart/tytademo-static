import { isAndroid } from 'react-device-detect';

const Layout = ({ children }) => {
  return (
    <div className={`container ${isAndroid ? 'android' : ''}`}>
      {children}
      {/* aqui va version desktop */}
      <div className='portrait'>
          <div className="notAvailable">
              <div className="boxItemsNotAvailable">
                  <div className="copyNotAvailable">
                      <img className="logoToyota" src="/images/logo-toyota.png" alt=""/>
                      <h2>
                          gira tu celular para seguir con la experiencia
                      </h2>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
};

export default Layout;
