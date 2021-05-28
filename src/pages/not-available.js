const NotAvailable = () => {
  return (
    <div className='notAvailable'>
      <div className='boxItemsNotAvailable'>
        <div className='copyNotAvailable'>
          <img className='logoToyota' src='/images/logo-toyota.png' alt='' />
          <h2>Esta campaña no está disponible en tu país.</h2>
          <p>
            Conoce el nuevo Corolla Apex:{' '}
            <a href='https://www.toyota.com/corolla/'>www.toyota.com/corolla</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotAvailable;
