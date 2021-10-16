import { useState, useEffect } from 'react';
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
    FEATURING YOU utilizes cookies for basic functionality and performance and are always enabled. Please visit Toyota’s
      <a href="https://www.toyota.com/support/privacy-rights/" target="_blank" rel="noopener noreferrer"> Privacy Policy</a>
      for additional information.
    </p>

    <div className="textCheck">
        <Checkbox
            checked={cookie.ofLegalAge}
            id='ofLegalAge'
            name='ofLegalAge'
            onChange={handleCheckedCookie}
            inputProps={{ 'aria-label': '18 years old' }}
        /> <div className="copyCheckbox">I am at least 18 years of age, a legal U.S. resident residing in the 48 contiguous U.S. or D.C.</div> 
    </div>
    <div className="textCheck">
        <Checkbox
            checked={cookie.termsAndConditions}
            id='termsAndConditions'
            name='termsAndConditions'
            onChange={handleCheckedCookie}
            inputProps={{ 'aria-label': 'Terms And Conditions' }}
        /><div className="copyCheckbox"> I have read and agree to the <a href="https://lunayxtoyota.com/rules/terms.html" target="_blank">Terms & Conditions.</a></div>
    </div>
    <center>
      <Button
        id='acceptCookieConsent'
        className="buttonCookie" 
        disabled={btnCookiesHide}
        variant='contained'
        onClick={handleAcceptCookie}
      >OK</Button>
    </center>
  </div>
  )
};

export default CookieConsent;