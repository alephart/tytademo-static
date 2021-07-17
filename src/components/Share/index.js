/** meta tags og in components/layouts/Meta.js **/
import { TwitterShareButton, FacebookShareButton } from "react-share";
import useTranslation from 'next-translate/useTranslation';

const shareStyle = {
  margin: '20px'
};

const Share = ({ url, setShare }) => {
  const { t } = useTranslation('common');

  const handleClick = () => {
    setShare(true);
  }
  
  const message = t("shareExperience_shareMessage");
  return (
    <div className='sharedSocial'>
      {t("shareExperience_sharedSocial")} <br />

      <div className='icons-social'>

        <FacebookShareButton
          id='shareFacebook'
          quote={`${message} ${url}`}
          url={url}
          hashtags={'#LunayXToyota'}
          className='share'
          style={shareStyle}
          onClick={handleClick}
        >
          <img src='/images/facebook.svg' alt='' />
        </FacebookShareButton>

        <TwitterShareButton
            id='shareTwitter'
            title={`${message}`}
            url={url}
            hashtags={['LunayXToyota']}
            className='share'
            style={shareStyle}
            onClick={handleClick}
          >
            <img src='/images/twitter.svg' alt='' />

          </TwitterShareButton>

      </div>
    </div>

  )
}

export default Share;

