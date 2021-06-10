import React from 'react';
import Layout from '@/components/layouts/General';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ReactPlayer from 'react-player';

const JoinExperince = () => {
    const { t } = useTranslation('common');
    const urlVideo = 'https://mds-tyta.s3.amazonaws.com/videos/video-ckow41n6g0000bdnxgrzb6wsv_final.mp4';
    return (
        <Layout>
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
        </Layout>
    )
}

export const getStaticProps = async ({ locale }) => ({
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
  });
  
export default JoinExperince;