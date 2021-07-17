import useTranslation from 'next-translate/useTranslation';
import Landscape from '@/components/Landscape';
import SEO from '../SEO';
import { isAndroid } from 'react-device-detect';

const Layout = ({ children, ...props }) => {
  const { className = '' } = props;
  const { t } = useTranslation('common');
  const siteURL = process.env.NEXT_PUBLIC_URL_SITE;
  
  const metaData = {
    siteURL,
    pageTitle: t("meta_tags_title"),
    description: t("meta_tags_description"),
    currentURL: siteURL,
    previewImage: `${siteURL}/toyota-lunay-feature-you.png`,
    siteName: t("meta_tags_title"),
    videoPath: `${siteURL}/videos/featureYouToyota.mp4`,
  };

  return (
    <>
      <SEO {...metaData} />
      <div className={`container ${isAndroid ? 'android' : ''} ${className}`}>
        {children}
        <Landscape />
      </div>
    </>
  )
};

export default Layout;
