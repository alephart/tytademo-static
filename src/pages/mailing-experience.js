import { useRouter } from 'next/router';

const Mailing = () => {
  const router = useRouter();
  const query = router.query;
  
  return (
    <div className="mailing">
      
      <div className="mailing__head"></div>
      
      <div style={{ marginBottom: '30px' }}>
        <a href={query.share} alt="">
          <img
            src="https://devmds.com/toyota/hero.png"
            alt="Featuring You Lunay X Toyota"
            width="620"
            height="355"
          />
        </a>
      </div>

      <div className="mailing__content">
        <img
          src="https://devmds.com/toyota/title.png"
          alt="YOU MADE IT!"
          width="248"
          height="18"
        />

        <p>You already are the star of “Todo o Nada”. Click to watch your full video featuring you with Lunay.</p>

        <a href={query.share} alt="">
          <img
            src="https://devmds.com/toyota/watch-video.png"
            alt="WATCH VIDEO"
            width="233"
            height="38"
          />
        </a>

        <div style={{ marginTop: '20px', width: '100%', height: '30px', borderBottom: '1px solid #2F2F2F' }}></div>
      </div>

      <div className="mailing__content">
        <img
          src="https://devmds.com/toyota/minilogo.png"
          alt="Toyota"
          width="34"
          height="22"
        />
        
        <p style={{ fontSize: '12px'}}></p>
      </div>
      <style jsx>{`
        .mailing {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: stretch;
          max-width: 620px;
          max-height: 100%;
          margin: 0 auto;
          background-color: #1D1D1D;
          font-family: Helvetica Neue, Arial, sans-serif;
        }

        .mailing__head {
          background-color: #5A2CFB;
          height: 26px;
        }
      
        .mailing__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }
      
        .mailing__content p {
          padding: 20px 0;
        }

        img {
          width: inherit;
        }
      `}</style>
    </div>
  )
};

export default Mailing;