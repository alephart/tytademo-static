import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyLink = () => {
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
            <p>TO PARTICIPATE YOU CAN:</p>
            <span>Search on the menu of your browser for the option “Open in browser“</span>
            <img className='' src='images/copyLink.png' alt='Instagram' />
            <span>Or you can copy this link:</span>
          </div>
        </div>

        <div className='copyLink'>
          <CopyToClipboard 
            text={state.value}
            onCopy={() => setState({copied: true})}
          >
            <Button className='linkVideo' variant='contained'>
              www.lunayxtoyota.com
            </Button>
          </CopyToClipboard>
        </div>

        {state.copied ? (
          <div className='copyThanks' style={ { animationDelay: '0.3s' } }>
            <div className='copyLunay'>And paste it on a different browser</div>
          </div>
        ) : (
          null
        )}
      </div>
    </div>
  );
};

export default CopyLink;