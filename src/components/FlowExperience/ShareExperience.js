import { useState, useContext, useEffect } from 'react';
import { ExperienceContext } from '@/components/Context';
import Share from '@/components/Share';
import ReactPlayer from 'react-player';
import { isMobile } from 'react-device-detect';

const ShareExperience = () => {
  const { setProcess, swap } = useContext(ExperienceContext);
  const [download, setDownload] = useState(false);
  const siteURL = process.env.NEXT_PUBLIC_URL_SITE;

  useEffect(() => {
    localStorage.setItem('character', null);
  }, []);
  
  return (
    <>
    <div className='sharedExperience'>
      <img className='logoToyota gif' src='/images/giflogo.gif' alt='lunayxtoyota.com' />

      <ReactPlayer
        className="react-player"
        url={swap.urlVideo}
        controls={true}
        playing={isMobile ? true : false}
        width='100%'
        height='100%'
      />

      <div className='copyThanks'>
        <div className='copyLunay'>You’re now a part of “Todo O Nada”!</div>
        <span>
          Now share it with the world and you could win a virtual Meet & Greet with Lunay.
        </span>
      </div>

      <Share url={swap.urlJoin} setShare={setDownload} />

      {download && (
        <a
          id='downloadVideoExperience'
          className='buttonThanks'
          href={`${siteURL}/api/download_video?filename=${swap.urlVideo}`}>
            DOWNLOAD VIDEO
        </a>
      )}
      <div className='copyThanks'>
        <span>
        Click here to see{' '}<a href="https://lunayxtoyota.com/rules/terms.html" target="_blank">Terms & Conditions.</a>
        </span>
      </div>
      <div className='copyThanks'>
        <span>
        Per{' '}<a href="https://www.toyota.com/support/privacy-rights/" target="_blank"> Privacy Policy</a>, Toyota will not share user videos on social media. Video to be purged after 90 days.
        </span>
      </div>
    </div>
    <div className="indexDesktop">
        <div className="boxItemsDesktop">
            <div className="videoDesktop">
                <ReactPlayer
                    className="react-player"
                    url={swap.urlVideo}
                    controls={true}
                    playing={isMobile ? false : true}
                    width='100%'
                    height='100%'
                />
            </div>
            <div className="copydesktop">
                <img className="logoToyota" src="/images/logo-toyota.png" alt=""/>
                <h2>
                  You’re now a part of “Todo O Nada”!
                </h2>
                <p>
                Now share it with the world and you could win a virtual Meet & Greet with Lunay.
                </p>
                <a
                  id='downloadVideoDesktop'
                  className='buttonThanks'
                  href={`${siteURL}/api/download_video?filename=${swap.urlVideo}`}>
                    DOWNLOAD VIDEO
                </a>
            </div>
        </div>
    </div>
    </>
  );
};

export default ShareExperience;
