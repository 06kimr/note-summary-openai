import { Outlet } from "react-router-dom";
import { NoteDetail } from "./NoteDetail";

const Main = () => {
  return (
    <div className=" grow py-[70px]">
      <Outlet />
    </div>
  );
};

export default Main;
