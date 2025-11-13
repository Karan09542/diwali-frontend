import { useEffect, useRef, useState } from "react";
import { isLoggedIn } from "../../utils/utilFn";
import axios from "axios";

const useOutSideClose = ({ setState, ref }) => {
  return useEffect(() => {
    const handleClose = (e) => {
      if (ref?.current && !ref.current.contains(e.target)) {
        setState(false);
      }
    };
    document.addEventListener("mousedown", handleClose);
    return () => document.removeEventListener("mousedown", handleClose);
  }, [setState]);
};
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  function handleLogout() {
    axios
      .post("/api/v1/user/logout", {}, { withCredentials: true })
      .then((res) => {
        if (res.statusText === "OK" && res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  }
  useOutSideClose({ setState: setShowMenu, ref: menuRef });
  return (
    <div className="px-3 py-2 rounded-xl bg-white/10  shadow-[0_2px_0px_4px_theme(colors.yellow.200)] flex justify-between items-center">
      <p className="relative bg-white shadow-[inset_0px_2px_0px_4px_theme(colors.yellow.50)] p-2 rounded-xl font-light first-letter:text-2xl first-letter:text-rose-500 scale-95">
        Deepawali
        <img
          className="absolute right-3 -top-3 h-14 contrast-200 drop-shadow-2xl"
          src="/deepwali.png"
          alt="deepwali"
        />
      </p>
      {!isLoggedIn() && (
        <button className="border border-white px-8 py-2 text-white font-medium rounded-xl cursor-pointer active:scale-95">
          Login
        </button>
      )}
      {isLoggedIn() && (
        <div className="relative">
          <img
            onClick={() => setShowMenu(true)}
            className="w-10 border-3 rounded-full border-white cursor-pointer"
            src="/userLogo.png"
            alt="user-icon"
          />
          {showMenu && (
            <div
              ref={menuRef}
              className="right-0 z-10 top-12 absolute bg-sky-600/80 h-40 w-30 px-5 py-2 rounded-xl border border-white/40 text-white"
            >
              <button
                onClick={handleLogout}
                className="w-full text-left border-b border-b-white py-2 cursor-pointer active:scale-95"
              >
                logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
