import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

export const PublicLayout = () => {
  return (
    <div>
      <NavBar/>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
