import Meta from './Meta';

const Layout = ({ children, pageTitle, description, ...props }) => {
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