/** meta tags og in components/layouts/Meta.js **/
import { TwitterShareButton, FacebookShareButton } from "react-share";
import { useTranslation } from 'next-i18next';

const shareStyle = {
  margin: '20px'
};

const Share = ({ url }) => {
  const { t } = useTranslation('common');
  
  const message = t("shareExperience.shareMessage");
  return (
    <div className='sharedSocial'>
      {t("shareExperience.sharedSocial")} <br />

      <div className='icons-social'>

        <FacebookShareButton
          quote={`${message} #LunayXToyota`}
          url={url}
          hashtags='#LunayXToyota'
          className='share'
          style={shareStyle}
        >
          <img src='/images/facebook.svg' alt='' />
        </FacebookShareButton>

        <TwitterShareButton
            title={`${message}`}
            url={url}
            hashtags={['LunayXToyota']}
            className='share'
            style={shareStyle}
          >
            <img src='/images/twitter.svg' alt='' />

          </TwitterShareButton>

      </div>
    </div>

  )
}

export default Share;

