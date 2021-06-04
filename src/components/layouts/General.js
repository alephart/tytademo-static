import Meta from './Meta';
import { isAndroid } from 'react-device-detect';

const Layout = ({ children }) => {
  const meta = {
    pageTitle: 'Featuring You Lunay X Toyota',
    description: '',
    currentURL: 'https://tytademo.devmds.com/',
    previewImage: 'feature-you-toyota-lunay.png',
    siteName: 'Toyota Featuring You',
    videoName: 'featureYouToyota.mp4',
  };
  return (
    <>
      <Meta meta={meta} />
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
    </>
  )
};

export default Layout;
