import React from 'react';
import Layout from '@/components/layouts/General';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ReactPlayer from 'react-player';

const JoinExperince = ({data}) => {
  console.log(data);
  const { urlVideo } = data;
    const { t } = useTranslation('common');

    return (
        <>
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
            <div  className="indexDesktop">
                <div className="boxItemsDesktop">
                    <div className="videoDesktop">
                        <div dangerouslySetInnerHTML={{ __html: `
                            <video playsinline="" autoplay=""  muted=""  id="">
                                <source
                                    src="/videos/output1.mp4"
                                    type="video/mp4"
                                />
                            </video>` }}>
                        </div>
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
        </>
    )
}

export const getServerSideProps = async (context) => {
    const { params, locale } = context;
    // Fetch data from external API
    //const res = await fetch(`https://.../data`)
    //const data = await res.json()

    const urlVideo = 'https://mds-tyta.s3.amazonaws.com/videos/video-ckow41n6g0000bdnxgrzb6wsv_final.mp4';

    const data = { success: true, urlVideo, id: params.id}

    // Pass data to the page via props
    return { props: { 
      ...await serverSideTranslations(locale, ['common']),
      data
    }, }
  };
  
export default JoinExperince;