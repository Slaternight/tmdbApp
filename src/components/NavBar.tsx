import { supabase } from "../supabase/client";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <a className="navbar-brand" href="#">
        <img src="assets\logoQuickbet.png" alt="logotypeQuickbet" />
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
          src="assets/userWhite.png"
          alt="userLogoutProfile"
        />
      </div>
    </nav>
  );
}

export default NavBar;
