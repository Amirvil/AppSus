const { Link } = ReactRouterDOM
import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes }) {
    return <section className="note-list">
        <ul>
            {notes.map(note => <li key={note.id}>
                <NotePreview note={note} />
            </li>)}
        </ul>
    </section>
}
