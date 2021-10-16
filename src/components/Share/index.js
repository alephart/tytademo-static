/** meta tags og in components/SEO.js **/
import { TwitterShareButton, FacebookShareButton } from "react-share";

const shareStyle = {
  margin: '20px'
};

const Share = ({ url, setShare }) => {

  const handleClick = () => {
    setShare(true);
  }
  
  const message = "I'm one of the protagonists of Lunay's new music video, “Todo o Nada”, with the Corolla Apex. Check it out and create yours here:";
  return (
    <div className='sharedSocial'>
      SHARE VIDEO <br />

      <div className='icons-social'>

        <FacebookShareButton
          id='shareFacebook'
          quote={`${message} ${url} #LunayXToyota`}
          url={url}
          hashtag={'#LunayXToyota'}
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

