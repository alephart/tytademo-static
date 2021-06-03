import VideoBg from './VideoBg';
import { useTranslation } from 'next-i18next';
import { useCountUp } from 'react-countup';

const VideoLoading = ({progress}) => {
  const { t } = useTranslation('common');
  const { countUp } = useCountUp({ start: 0, end: 9999999999, delay: 1 });
  return (
    <>
      <div dangerouslySetInnerHTML={VideoBg('', 'output2.mp4', false, 'videoForm')}></div>
      <div className='percentageVideo'>
        <div className='boxPercentage'>
          <div className='iconPercentage'></div>
          <div className='numberPercentage'>{`${progress}%`}</div>
          <div className='linePercentage'>
            <div className='percentage' style={{ width: 100 }}></div>
            <div className='percentage' style={{ width: progress }}></div>
          </div>
          <div className='timePercentage'>{t("VideoLoading.timePercentage")}</div>
          <div className='secondPercentage'>{countUp}</div>
        </div>
      </div>
    </>
  );
};

export default VideoLoading;
