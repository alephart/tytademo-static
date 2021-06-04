import Meta from './Meta';

const Layout = ({ children, pageTitle, description, ...props }) => {
  const meta = {
    pageTitle: 'Featuring You Lunay X Toyota',
    description: '',
    currentURL: 'https://tytademo.devmds.com/',
    previewImage: 'feature-you-toyota-lunay.png',
    siteName: 'Toyota Featuring You',
    videoName: 'featureYouToyota.mp4'
  };
  
  return (
    <>
      <Meta meta={meta} />
      <div className="startPage">
        {children}
      </div>
    </>
  )
};

export default Layout;