import VideoBg from './VideoBg';
import { useTranslation } from 'next-i18next';

const VideoLoading = ({progress}) => {
  const { t } = useTranslation('common');
  return (
    <>
      <div dangerouslySetInnerHTML={VideoBg('', 'output2.mp4', false, 'videoForm')}></div>
      <div className='percentageVideo'>
        <div className='boxPercentage'>
          <div className='iconPercentage'></div>
          <div className='numberPercentage'>{`${progress}%`}</div>
          <div className='linePercentage'>
            <div className='percentage' style={{ width: 100 }}></div>
            <div className='percentage' style={{ width: 50 }}></div>
          </div>
          <div className='timePercentage'>{t("VideoLoading.timePercentage")}</div>
          <div className='secondPercentage'>000 000 166</div>
        </div>
      </div>
    </>
  );
};

export default VideoLoading;
