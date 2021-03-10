import { TwitterShareButton } from "react-share";
import { TwitterIcon } from "react-share";

const shareStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '10px'
};

const Share = () => {
  return (
    <TwitterShareButton
      title={"tyta-test"}
      url={"https://tytademo.devmds.com/"}
      hashtags={["hashtag1", "hashtag2"]}
      className="share"
      style={shareStyle}
    >
      <TwitterIcon size={32} round />
      {' '}<span> Twitter Share</span>
    </TwitterShareButton>
  )
}

export default Share;