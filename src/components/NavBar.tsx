import { supabase } from "../supabase/client";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <a className="navbar-brand" href="#">
        <img src=".\src\assets\logoQuickbet.png" alt="" />
      </a>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Popular
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Favorites
            </a>
          </li>
        </ul>
      </div>
      <div className="userImg">
        <img
          onClick={() => supabase.auth.signOut()}
          src="./src/assets/userWhite.png"
          alt=""
        />
      </div>
    </nav>
  );
}

export default NavBar;
