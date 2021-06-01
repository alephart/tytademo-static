import VideoBg from './VideoBg';
import { useTranslation } from 'react-i18next';
import '../../i18n';

const VideoLoading = () => {
  const { t } = useTranslation();
  return (
    <>
      <div dangerouslySetInnerHTML={VideoBg('', '/output-2.mp4', false, 'videoForm')}></div>
      <div className='percentageVideo'>
        <div className='boxPercentage'>
          <div className='iconPercentage'></div>
          <div className='numberPercentage'>50%</div>
          <div className='linePercentage'>
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
