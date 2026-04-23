import { Outlet } from "react-router-dom";
// import Navbar from "@/components/Navbar";

const MainLayout = () => {
  return (
    <div className="app-container">
      {/* <Navbar /> */}
      <main>
        <Outlet />  {/* Sahifalar aynan shu yerda almashadi */}
      </main>
    </div>
  );
};

export default MainLayout;
