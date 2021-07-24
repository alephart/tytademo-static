import { useState, useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useCountUp } from 'react-countup';

const VideoLoading = ({progress}) => {
  const { t } = useTranslation('common');
  const endNumber = 9999999999;
  const percent = 20;
  const [rest, setRest] = useState(0);
  const { countUp } = useCountUp({ start: 0, end: endNumber, delay: 1, duration: 100 });
  
  useEffect(() => {
    if (rest < percent) {
      setRest(Math.round((countUp * percent) / endNumber));
    }
  }, [countUp]);
  
  return (
    <>
      <div className="registerVideoBG"><img src="/images/registerVideoBG.gif" alt="Toyota Experience Lunay" /></div>
      <div className='percentageVideo'>
        <div className='boxPercentage'>
          <div className='iconPercentage'></div>
          <div className='numberPercentage'>{`${progress + rest}%`}</div>
          <div className='linePercentage'>
            <div className='percentage gray' style={{ width: 100 }}></div>
            <div className='percentage' style={{ width: progress + rest }}></div>
          </div>
          <div className='timePercentage'>{t("VideoLoading_timePercentage")}</div>
          <div className='secondPercentage'>{countUp}</div>
        </div>
      </div>
    </>
  );
};

export default VideoLoading;
