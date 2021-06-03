import Head from 'next/head';

const Layout = ({ children, pageTitle, description, ...props }) => {
  return (
    <>
      <div className="startPage">
        {children}
      </div>
    </>
  )
};

export default Layout;