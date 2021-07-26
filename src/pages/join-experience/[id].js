import Layout from '@/components/layouts/General';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import ReactPlayer from 'react-player';
import { isMobile } from 'react-device-detect';

const JoinExperince = ({data}) => {
  const { urlVideo, urlJoin } = data;
    const { t } = useTranslation('common');

    const metaData = {
        pageTitle: `${t("meta_tags_title")} - Join Experience`,
        videoPath: urlVideo,
        currentURL: urlJoin,
    };

    return (
        <Layout className="especial" {...metaData}>
            <div className="checkVideoFinal">
                <img className="logoToyota join" src="/images/logo-toyota.png" alt=""/>

                <ReactPlayer
                    className="react-player"
                    url={urlVideo}
                    controls={true}
                    playing={isMobile ? true : false}
                    width='100%'
                    height='100%'
                />

                <div className="copyJoin">
                    {t("join_copyJoin")}
                    <span>
                        {t("join_subCopyJoin")}
                    </span>
                </div>
                <Link href="/">
                    <Button className="buttonJoin" variant="contained">{t("join_buttonJoin")}</Button>
                </Link>
            </div>

            <div className="indexDesktop">
                <div className="boxItemsDesktop">
                    <div className="videoDesktop">
                        <ReactPlayer
                            className="react-player"
                            url={urlVideo}
                            controls={true}
                            playing={isMobile ? false : true}
                            width='100%'
                            height='100%'
                        />
                    </div>
                    <div className="copydesktop">
                        <img className="logoToyota" src="/images/logo-toyota.png" alt=""/>
                        <h2>
                        {t("indexDesktop_copyDesktop")}
                        </h2>
                        <p>
                        {t("indexDesktop_copyDesktopText")}
                        </p>
                        <img className="QR desktop join" src="/images/DesktopHome.png" alt=""/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps = async (context) => {
    const { params, locale } = context;
    const urlAdmin = process.env.NEXT_PUBLIC_TYTA_API;
    const urlSite = process.env.NEXT_PUBLIC_URL_SITE;

    //Fetch data from external API
    const res = await fetch(`${urlAdmin}/participant/${params.id}`);
    const json = await res.json();

    const pathLocale = locale === 'es' ? '/es/' : '/';
    const data = {
      success: true,
      urlVideo: json.url_video,
      urlJoin: `${urlSite}${pathLocale}join-experience/${params.id}`,
    };

    // Pass data to the page via props
    return { props: { 
      data
    }, }
  };
  
export default JoinExperince;