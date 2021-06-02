import React from 'react';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const JoinExperince = () => {
    const { t } = useTranslation('common');
    return (
        <div className="checkVideoFinal">
            <img className="logoToyota" src="/images/logo-toyota.png" alt=""/>
            <div dangerouslySetInnerHTML={{ __html: `
                <video class="videoGeneral" controls="" playsinline="" id="">
                    <source
                        src="/videos/output2.mp4"
                        type="video/mp4"
                    />
                </video>` }}>
            </div>
            <div className="copyJoin">
                {t("join.copyJoin")}
                <span>
                    {t("join.subCopyJoin")}
                </span>
            </div>
            <Link href="/start">
                <Button className="buttonJoin" variant="contained">{t("join.buttonJoin")}</Button>
            </Link>
        </div>
    )
}

export const getStaticProps = async ({ locale }) => ({
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
  });
  
export default JoinExperince;