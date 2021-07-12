import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const setCookie = (consent) => {
  fetch('api/set_cookie', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({consent}),
  });
};

const CookieConsent = ({setDisabledExperience}) => {
  const { t } = useTranslation('common');
  const [cookie, setConsent] = useState({
    ofLegalAge: false,
    termsAndConditions: false,
  });
  const [btnCookiesHide, setBtnCookiesHide] = useState(true);
  const [acceptAllCookies, setAcceptAllCookies] = useState(false);
  
  useEffect(() => {
    setBtnCookiesHide(cookie.ofLegalAge && cookie.termsAndConditions ? false : true);
  }, [cookie]);

  const handleCheckedCookie = (event) => {
    const { name, checked } = event.target;
    setConsent({ ...cookie, [name]: checked });
  };

  const handleAcceptCookie = () => {
    if(cookie.ofLegalAge && cookie.termsAndConditions) {
      setCookie(cookie);
      setDisabledExperience(false);
      setAcceptAllCookies(true);
    }
  };

  return (
    <div 
      id="cookieConcent"
      className={acceptAllCookies ? 'cookieDisabled' : ''}
    >
    <p>
      {t('cookie.paragraph1')}
      <a href={t('cookie.link')} target="_blank" rel="noopener noreferrer"> {t('cookie.linkText')}</a>
      {t('cookie.paragragh2')}
    </p>

    <div className="textCheck">
        <Checkbox
            checked={cookie.ofLegalAge}
            name='ofLegalAge'
            onChange={handleCheckedCookie}
            inputProps={{ 'aria-label': '18 years old' }}
        /> <div className="copyCheckbox">{t('cookie.Check1')}</div> 
    </div>
    <div className="textCheck">
        <Checkbox
            checked={cookie.termsAndConditions}
            name='termsAndConditions'
            onChange={handleCheckedCookie}
            inputProps={{ 'aria-label': 'Terms And Conditions' }}
        /><div className="copyCheckbox"> {t('cookie.Check2')} <a href={t('cookie.Check2Link')} target="_blank">{t('cookie.Check2LinkText')}</a></div>
    </div>
    <center>
      <Button 
        className="buttonCookie" 
        disabled={btnCookiesHide}
        variant='contained'
        onClick={handleAcceptCookie}
      >{t('cookie.button')}</Button>
    </center>
  </div>
  )
};

export default CookieConsent;