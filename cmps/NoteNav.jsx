const { Link, NavLink } = ReactRouterDOM

export function NoteNav() {


    return <nav className="note-nav">
        <NavLink to="/note" end><button><img className="icon" src="assets/img/bulb.svg" /></button></NavLink>
        <NavLink to="/note/notifications"><button><img className="icon" src="assets/img/notifications.svg" /></button></NavLink>
        <NavLink to="/note/inspiration"><button><img className="icon" src="assets/img/label.svg" /></button></NavLink>
        <NavLink to="/note/personal"><button><img className="icon" src="assets/img/label.svg" /></button></NavLink>
        <NavLink to="/note/work"><button><img className="icon" src="assets/img/label.svg" /></button></NavLink>
        <NavLink to="/noteEdit"><button><img className="icon" src="assets/img/edit.svg" /></button></NavLink>
        <NavLink to="/note/archive"><button><img className="icon" src="assets/img/archive.svg" /></button></NavLink>
        <NavLink to="/note/trash"><button><img className="icon" src="assets/img/trash.svg" /></button></NavLink>
    </nav>
}