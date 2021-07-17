import useTranslation from 'next-translate/useTranslation';
import Landscape from '@/components/Landscape';
import SEO from '../SEO';

const Layout = ({ children, ...props }) => {
  const { className = null } = props;
  const { t } = useTranslation('common');
  const siteURL = process.env.NEXT_PUBLIC_URL_SITE;

  const metaData = {
    siteURL,
    pageTitle: t("meta_tags_title"),
    description: t("meta_tags_description"),
    currentURL: siteURL,
    previewImage: `${siteURL}/toyota-lunay-feature-you.png`,
    siteName: t("meta.tags.title"),
    videoPath: `${siteURL}/videos/featureYouToyota.mp4`,
  };

  return (
    <>
      <SEO {...metaData} />
      <div className="startPage">
        {children}
        <Landscape />
      </div>
    </>
  )
};

export default Layout;