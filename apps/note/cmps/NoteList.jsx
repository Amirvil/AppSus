
import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes }) {
    return <section className="note-list">
        <ul className="note-grid">
            {notes.map(note => <li className="note-card" key={note.id}>
                <NotePreview note={note} />
            </li>)}
        </ul>
    </section>
}
