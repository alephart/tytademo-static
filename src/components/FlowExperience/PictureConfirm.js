import React from 'react';
import Button from '@material-ui/core/Button';
import { PROCESS_ENUM } from '@/utils/globals';
import { useTranslation } from 'react-i18next';
import '../../i18n';

const PictureConfirm = ({ imgSrc, setProcess }) => {
  const { t } = useTranslation();
  return (
    <div className='likePicture'>
      <div className='boxPhoto'>
        <img src={imgSrc} />
      </div>
      <div className='paddingCanvas' />
      <div className='bgdegrade' />
      <div
        className='boxIframe'
        dangerouslySetInnerHTML={{
          __html: "<iframe src='/face/new-vectors.html' />",
        }}
      />
      <div className='copyLike'>{t("pictureConfirm.copyLike")}</div>
      <Button 
        className='yesContinue'
        variant='contained'
        onClick={() => setProcess(PROCESS_ENUM.register)}
      >
        {t("pictureConfirm.yesContinue")}
      </Button>
      <Button 
        className='againPhoto' 
        variant='contained'
        onClick={() => setProcess(PROCESS_ENUM.character)}
      >
        {t("pictureConfirm.againPhoto")}
      </Button>
    </div>
  );
};

export default PictureConfirm;
