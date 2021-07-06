import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
          src={t("mailing.title.youMadeIt")}
          alt=""
          placeholder="blur"
          layout="fixed"
          width={248}
          height={18}
        />

        <p>{t("mailing.watchYouFullVideo")}</p>

        <a href={query.share} alt="">
          <Image
            src={t("mailing.btn.watchVideo")}
            alt=""
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
          alt=""
          placeholder="blur"
          layout="fixed"
          width={34}
          height={22}
        />
        
        <p style={{ fontSize: '12px'}}>{t("mailing.terms")}</p>
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

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Mailing;