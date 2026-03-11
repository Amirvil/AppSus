const { Link, NavLink } = ReactRouterDOM

export function NoteNav() {

    return <nav className="note-nav">
        <NavLink to="/note" end>Notes</NavLink>
        <NavLink to="/note">Reminders</NavLink>
        <NavLink to="/note">Inspiration</NavLink>
        <NavLink to="/note">Personal</NavLink>
        <NavLink to="/note">Work</NavLink>
        <NavLink to="/note">Label Editor</NavLink>
        <NavLink to="/note">Archives</NavLink>
        <NavLink to="/note">Trash</NavLink>
    </nav>
}