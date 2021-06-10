import Layout from '@/components/layouts/General';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const NotAvailable = () => {
  const { t } = useTranslation('common');
  return (
    <Layout>
      <div className='notAvailable'>
        <div className='boxItemsNotAvailable'>
          <div className='copyNotAvailable'>
            <img className='logoToyota' src='/images/logo-toyota.png' alt='' />
            <h2>{t("notAvailable.copyNotAvailable")}</h2>
            <p>
              {t("notAvailable.copyNotAvailableParagrah")}:{' '}
              <a href='https://www.toyota.com/corolla/'>www.toyota.com/corolla</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
    // <div  className="indexDesktop">
    //     <div className="boxItemsDesktop">
    //         <div className="videoDesktop">
    //             <div dangerouslySetInnerHTML={{ __html: `
    //                 <video playsinline="" autoplay=""  muted=""  id="">
    //                     <source
    //                         src="/videos/output1.mp4"
    //                         type="video/mp4"
    //                     />
    //                 </video>` }}>
    //             </div>
    //         </div>
    //         <div className="copydesktop">
    //             <img className="logoToyota" src="/images/logo-toyota.png" alt=""/>
    //             <h2>
    //               {t("indexDesktop.copyDesktop")}
    //             </h2>
    //             <p>
    //               {t("indexDesktop.copyDesktopText")}
    //             </p>
    //         </div>
    //     </div>
    // </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
});

export default NotAvailable;
