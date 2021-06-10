import Meta from './Meta';
import { useTranslation } from 'next-i18next';

const Layout = ({ children, ...props }) => {
  console.log('Layout Home', props)
  const { t } = useTranslation('common');
  return (
    <>
      <Meta {...props} />
      <div className="startPage">
        {children}
        <div className='landscape'>
            <div className="notAvailable">
                <div className="boxItemsNotAvailable">
                    <div className="copyNotAvailable">
                        <img className="logoToyota" src="/images/logo-toyota.png" alt=""/>
                        <h2 className="desktop">
                          {t("desktop")}
                        </h2>
                        <h2 className="mobile">
                          {t("landscape")}
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