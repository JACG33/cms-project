import { Outlet } from "react-router-dom";
import AsideNavBar from "../components/AsideNav/AsideNavBar";

export const PrivateLayout = () => {
  return (
    <div className="admin__layout">
      <AsideNavBar />
      <main className="main">{<Outlet/>}</main>
    </div>
  );
};
