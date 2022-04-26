import { sql_query } from '../../lib/db';

import Layout from '@/components/layouts/General';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import { isMobile } from 'react-device-detect';

const JoinExperince = ({data}) => {
  const { urlVideo, urlJoin } = data;

    const metaData = {
        pageTitle: 'Featuring You Lunay X Toyota - Join Experience',
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
                    CHECK OUT YOUR FRIEND´S VIDEO AND MAKE YOUR OWN.
                    <span>
                    Take a selfie and be part of “Todo o Nada” with Lunay and the Corolla Apex.
                    </span>
                </div>
                <Link href="/">
                    <Button className="buttonJoin" variant="contained">GET MY VIDEO!</Button>
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
                        CHECK OUT YOUR FRIEND´S VIDEO AND MAKE YOUR OWN.
                        </h2>
                        <p>
                            Take a selfie to be a part of LUNAY’s video.
                        </p>
                        <img className="QR desktop join" src="/images/DesktopHomeDemo.png" alt=""/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps = async (context) => {
    const { params, locale } = context;
    const urlSite = process.env.NEXT_PUBLIC_URL_SITE;

    const result = await sql_query(`
        SELECT url_video FROM participants
        WHERE participant_id = '${params.id}';
    `);

    const participant = JSON.parse(JSON.stringify(result));

    console.log('participant', participant);

    const urlVideo = participant.length > 0
        ? participant[0].url_video
        : 'https://mds-tyta.s3.amazonaws.com/videos/video-58349558309583490503_final.mp4';

    const pathLocale = locale === 'es' ? '/es/' : '/';
    const data = {
      success: true,
      urlVideo,
      urlJoin: `${urlSite}${pathLocale}join-experience/${params.id}`,
    };

    // Pass data to the page via props
    return { props: { 
      data
    }, }
  };
  
export default JoinExperince;