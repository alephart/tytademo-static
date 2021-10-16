const Landscape = () => {
  const siteURL = process.env.NEXT_PUBLIC_URL_SITE;
  return (
    <div className='landscape'>
        <div className="notAvailable">
            <div className="boxItemsNotAvailable">
                <div className="copyNotAvailable">
                    <img className="logoToyota desktop" src="/images/logo-toyota.png" alt=""/>
                    <hr className="desktop"/>
                    <img className="rotate mobile" src="/images/RotatedYourPhone.png" alt=""/>
                    <h2 className="desktop">
                      THIS IS A MOBILE ONLY EXPERIENCE
                    </h2>
                    <p className="desktop">
                      Scan the QR Code with your device or enter the URL in your mobile web browser.
                    </p>
                    <img className="QR desktop" src="/images/DesktopHome2.png" alt=""/>
                    <a className="desktop" href={siteURL}>lunayxtoyota.com</a>
                    <h2 className="mobile">
                      PLEASE ROTATE YOUR DEVICE
                    </h2>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Landscape;