import Image from 'next/image';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

const Mailing = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const query = router.query;
  
  return (
    <div className="mailing">
      
      <div className="mailing__head"></div>
      
      <div style={{ marginBottom: '30px' }}>
        <a href={query.share} alt="">
          <Image
            src="https://devmds.com/toyota/hero.png"
            alt="Featuring You Lunay X Toyota"
            placeholder="blur"
            layout="responsive"
            width={620}
            height={355}
          />
        </a>
      </div>

      <div className="mailing__content">
        <Image
          src={t("mailing_title_youMadeIt")}
          alt={t("mailing_title_youMadeIt_text")}
          placeholder="blur"
          layout="fixed"
          width={248}
          height={18}
        />

        <p>{t("mailing_watchYouFullVideo")}</p>

        <a href={query.share} alt="">
          <Image
            src={t("mailing_btn_watchVideo")}
            alt={t("mailing_btn_watchVideo_text")}
            placeholder="blur"
            layout="fixed"
            width={233}
            height={38}
          />
        </a>

        <div style={{ marginTop: '20px', width: '100%', height: '30px', borderBottom: '1px solid #2F2F2F' }}></div>
      </div>

      <div className="mailing__content">
        <Image
          src="https://devmds.com/toyota/minilogo.png"
          alt="Toyota"
          placeholder="blur"
          layout="fixed"
          width={34}
          height={22}
        />
        
        <p style={{ fontSize: '12px'}}>{/*t("mailing_terms")*/}</p>
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
      `}</style>
    </div>
  )
};

export default Mailing;