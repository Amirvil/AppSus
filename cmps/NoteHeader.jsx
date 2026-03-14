const { Link } = ReactRouterDOM

import { NoteFilter } from './NoteFilter.jsx'

export function NoteHeader({onSetFilter}) {

    return <header className="note-header">

        <div className="header-group left">
            <button>
                <img src="assets/img/listView.png" />
            </button>
            <button>
                <img src="assets/img/refresh.svg" />
            </button>
        </div>

        <NoteFilter onSetFilter={onSetFilter}/>

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