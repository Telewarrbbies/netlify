import Sidebar from "./Sidebar";

const Layout = ({ children }) => {

  return (

    <div className="admin-layout">

      <Sidebar />

      <main className="admin-main">

        {children}

      </main>

    </div>

  );

};

export default Layout;