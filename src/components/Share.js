import { TwitterShareButton } from "react-share";
import { TwitterIcon } from "react-share";

const Share = () => {
  return (
    <TwitterShareButton
      title={"tyta-test"}
      url={"https://tytademo.devmds.com/"}
      hashtags={["hashtag1", "hashtag2"]}
      className="share"
    >
      <TwitterIcon size={32} round />{' '}
      <span> Twitter Share</span>
      <style jsx>{`
        .share {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </TwitterShareButton>
  )
}

export default Share;