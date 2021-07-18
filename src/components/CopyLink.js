import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Button from '@material-ui/core/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyLink = () => {
  const { t } = useTranslation('common');
  const [state, setState] = useState({
    value: process.env.NEXT_PUBLIC_URL_SITE,
    copied: false,
  });

  return (
    <div className='boxLink'>
      <div className='copyLink'>
        <img className='logoToyota' src='images/logo-toyota.png' alt='' />
        <div className='copyThanks'>
          <div className='copyLinkText'>
            <p>{t('instagram_Title')}</p>
            <span>{t('instagram_Text1')}</span>
            <img className='' src='images/copyLink.png' alt='Instagram' />
            <span>{t('instagram_Text2')}</span>
          </div>
        </div>

        <div className='copyLink'>
          <CopyToClipboard 
            text={state.value}
            onCopy={() => setState({copied: true})}
          >
            <Button className='linkVideo' variant='contained'>
              {t('instagram_Button')}
            </Button>
          </CopyToClipboard>
        </div>

        {state.copied ? (
          <div className='copyThanks' style={ { animationDelay: '0.3s' } }>
            <div className='copyLunay'>{t('instagram_Copy')}</div>
          </div>
        ) : (
          null
        )}
      </div>
    </div>
  );
};

export default CopyLink;