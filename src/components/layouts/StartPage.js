import { LandscapeStartPage } from '../Landscape';
import { isMobile } from 'react-device-detect';
import SEO from '../SEO';
import { useTranslation } from 'next-i18next';

const Layout = ({ children }) => {
  console.log('isMobile', isMobile);
  
  const { t } = useTranslation('common');
  const siteURL = process.env.NEXT_PUBLIC_URL_SITE;

  const metaData = {
    siteURL,
    pageTitle: t("meta.tags.title"),
    description: t("meta.tags.description"),
    currentURL: siteURL,
    previewImage: `${siteURL}/toyota-lunay-feature-you.png`,
    siteName: t("meta.tags.title"),
    videoPath: `${siteURL}/videos/featureYouToyota.mp4`,
  };

  return (
    <>
      <SEO {...metaData} />
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