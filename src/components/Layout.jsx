import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main">

        <Header />

        <div className="content">
          {children}
        </div>

      </div>

    </div>
  );
}

export default Layout;