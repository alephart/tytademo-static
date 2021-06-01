import React from 'react';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '../i18n';

const JoinExperince = () => {
    const { t } = useTranslation();
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
    
export default JoinExperince;