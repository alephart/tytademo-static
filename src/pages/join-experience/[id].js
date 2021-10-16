import Layout from '@/components/layouts/General';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import { isMobile } from 'react-device-detect';

const data = {
    success: true,
    urlVideo: 'https://mds-tyta.s3.amazonaws.com/videos/video-58349558309583490503_final.mp4',
    urlShare: `https://tytademo.devmds.com/share-experience/`,
    urlJoin: `https://tytademo.devmds.com/join-experience/`,
  };

const JoinExperince = () => {
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
                        <img className="QR desktop join" src="/images/DesktopHome.png" alt=""/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

// export const getServerSideProps = async (context) => {
//     const { params, locale } = context;
//     const urlAdmin = process.env.NEXT_PUBLIC_TYTA_API;
//     const urlSite = process.env.NEXT_PUBLIC_URL_SITE;

//     //Fetch data from external API
//     const res = await fetch(`${urlAdmin}/participant/${params.id}`);
//     const json = await res.json();

//     const pathLocale = locale === 'es' ? '/es/' : '/';
//     const data = {
//       success: true,
//       urlVideo: json.url_video,
//       urlJoin: `${urlSite}${pathLocale}join-experience/${params.id}`,
//     };

//     // Pass data to the page via props
//     return { props: { 
//       data
//     }, }
//   };
  
export default JoinExperince;