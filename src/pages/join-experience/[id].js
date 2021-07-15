import React from 'react';
import Layout from '@/components/layouts/General';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ReactPlayer from 'react-player';

const JoinExperince = ({data}) => {
  const { urlVideo } = data;
    const { t } = useTranslation('common');

    return (
        <Layout className="especial">
            <div className="checkVideoFinal">
                <img className="logoToyota join" src="/images/logo-toyota.png" alt=""/>

                <ReactPlayer
                    className="react-player"
                    url={urlVideo}
                    controls={true}
                    playing={true}
                    width='100%'
                    height='100%'
                />

                <div className="copyJoin">
                    {t("join.copyJoin")}
                    <span>
                        {t("join.subCopyJoin")}
                    </span>
                </div>
                <Link href="/">
                    <Button className="buttonJoin" variant="contained">{t("join.buttonJoin")}</Button>
                </Link>
            </div>

            <div className="indexDesktop">
                <div className="boxItemsDesktop">
                    <div className="videoDesktop">
                        <ReactPlayer
                            className="react-player"
                            url={urlVideo}
                            controls={true}
                            playing={false}
                            width='100%'
                            height='100%'
                        />
                    </div>
                    <div className="copydesktop">
                        <img className="logoToyota" src="/images/logo-toyota.png" alt=""/>
                        <h2>
                        {t("indexDesktop.copyDesktop")}
                        </h2>
                        <p>
                        {t("indexDesktop.copyDesktopText")}
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps = async (context) => {
    const { params, locale } = context;
    const urlAdmin = process.env.NEXT_PUBLIC_TYTA_API;

    //Fetch data from external API
    const res = await fetch(`${urlAdmin}/participant/${params.id}`);
    const json = await res.json();
    console.log(json);

    const data = { success: true, urlVideo: json.url_video, id: params.id}

    // Pass data to the page via props
    return { props: { 
      ...await serverSideTranslations(locale, ['common']),
      data
    }, }
  };
  
export default JoinExperince;