import { useState, useEffect } from 'react';
import Layout from '@/components/layouts/StartPage';
import { Rules } from '@/components/DialogsTyta';
import { VideoBg } from '@/components/Anims';
import Button from '@material-ui/core/Button';
import { useLocation } from '@/components/hooks';
import CookieConsent from '@/components/CookieConsent';
import { geoIP } from '@/utils/geoIP';
import { useRouter } from 'next/router';
import useSWR from 'swr';

/// ::API::
// const fetcher = (url) => fetch(url).then((r) => r.json());

// const geoIPKey = process.env.NEXT_PUBLIC_GEODB_API_KEY;

const Home = () => {
  // const { data: cookie_consent, error: swr_error } = useSWR('/api/get_cookie', fetcher);
  // const { loading, location, error } = useLocation(geoIP(geoIPKey));
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [disabledExperience, setDisabledExperience] = useState(false);
  const [showCookie, setShowCookie] = useState(false);
  const [isActive, setActive] = useState(false);
  const router = useRouter();
  
  // useEffect(() => {
  //   if(!!cookie_consent) {
  //     setDisabledExperience(!!cookie_consent.TOYOTA_COOKIE_CONSENT ? false : true);
  //   }
  // }, [cookie_consent]);

  useEffect(() => {
    if(disabledExperience) {
      setTimeout(() => {
        setShowCookie(disabledExperience);
      }, 1800);
    }
  }, [disabledExperience]);

  // if(loading || !cookie_consent || swr_error) {
  //   return <><Layout /></>;
  // }

  // if(!location || !!error) {
  //   router.push('/not-available');
  // }

  const handleAdvance = () => {
    setActive(!isActive);
    setTimeout(() => {
      router.push('/select-character');
    }, 1200);
  };

  return (
    <Layout>
      <div className={isActive ? 'animationStart positionAbsolute': 'positionAbsolute'} dangerouslySetInnerHTML={VideoBg('video', 'video.mp4', false)}></div>
      <div className={isActive ? 'animationStart positionAbsolute': 'positionAbsolute'} dangerouslySetInnerHTML={VideoBg('video2', 'videoloop.mp4', true)}></div>
      <div className={isActive ? 'degrade animationStart': 'degrade'}></div>
        <div className={isActive ? 'containerSpecial animationExit': 'containerSpecial'}>
          <div>
            <div className="copyStart ">
              TAKE A SELFIE AND BE PART OF LUNAY’S VIDEO
              <span>
                Register and you could win a virtual  <br/>
                Meet & Greet with Lunay
              </span>
            </div>

              <Button
                disabled={disabledExperience}
                id='startExperience'
                onClick={handleAdvance}
                className="buttonStart"
                variant="contained">
                START
              </Button>
          
            <div className="copyFooter">
            By clicking you are accepting the <a id="termsAndConditions" onClick={() => setIsOpenDialog(!isOpenDialog)} role="button">Terms & Conditions.</a>
            </div>
            <Rules isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
          </div>
        </div>

        {(disabledExperience && showCookie) && <CookieConsent setDisabledExperience={setDisabledExperience} />}
    </Layout>
  )
}

export default Home;