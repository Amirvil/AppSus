
import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes }) {
    return <div className="container">

        <section className="note-composer">

            <form className="note-form">
                <input className="title-input" type="text" placeholder="Title" />
                <input className="content-input" type="text" placeholder="Take a note..." />
            </form>

        </section>

        <section className="note-list">

            <ul className="note-grid">
                {notes.map(note => <li className="note-card" key={note.id}>
                    <NotePreview note={note} />
                </li>)}
            </ul>

        </section>

    </div>

}
