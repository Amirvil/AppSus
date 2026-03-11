const { Link, NavLink } = ReactRouterDOM

export function NoteHeader() {

    return <header className="note-header">

        <div className="header-group search-bar">
            <button className="icon-btn search-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <input type="text" placeholder="Search" />
        </div>

        <div className="header-group right">
            <Link to="/note">
                <p className="header-title">Note</p>
            </Link>
            <Link to="/note">
                <img className="logo" src="assets/img/logo.png" />
            </Link>
            <img className="menu" src="assets/img/hamburger.png" />
        </div>
    </header>
}