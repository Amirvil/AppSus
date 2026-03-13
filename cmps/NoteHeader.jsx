const { Link, NavLink } = ReactRouterDOM

export function NoteHeader() {

    return <header className="note-header">

        <div className="header-group left">
            <button>
                <img src="assets/img/listView.png" />
            </button>
            <button>
                <img src="assets/img/refresh.svg" />
            </button>
        </div>

        <div className="header-group center search-bar">
            <button>
                <img src="assets/img/search.svg" />
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
            <button>
                <img src="assets/img/menu.svg" />
            </button>
        </div>
    </header>
}