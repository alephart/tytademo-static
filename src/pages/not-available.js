import Layout from '@/components/layouts/Desktop';

const NotAvailable = () => {

  const metaData = {
    pageTitle: 'Experience - not available',
  };
  return (
    <Layout {...metaData}>
      <div className='landscape not'>
        <div className="notAvailable">
            <div className="boxItemsNotAvailable">
                <div className="copyNotAvailable">
                    <img className="logoToyota" src="/images/logo-toyota.png" alt=""/>
                    <h2 className="desktopNot">
                      SORRY, THIS EXPERIENCE IS NOT AVAILABLE IN YOUR COUNTRY.
                    </h2>
                    <h2 className="mobile">
                      SORRY, THIS EXPERIENCE IS NOT AVAILABLE IN YOUR COUNTRY.
                    </h2>
                    <p>
                      Learn more about the New Corolla Apex:{' '}
                      <a href="https://www.toyota.com/corolla/">www.toyota.com/corolla/</a>
                    </p>
                </div>
            </div>
        </div>
      </div>
  </Layout>
  );
};

export default NotAvailable;
