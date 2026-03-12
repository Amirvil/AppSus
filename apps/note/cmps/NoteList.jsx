const { useState, useEffect, useRef } = React

import { NotePreview } from './NotePreview.jsx'
import { noteService, NoteService } from '../services/note.service.js'

export function NoteList({ notes, onAddNote }) {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const noteRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(ev) {
            if (noteRef.current && !noteRef.current.contains(ev.target)) saveNote()
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [noteToEdit])

    function saveNote() {
        if (noteToEdit.info.title || noteToEdit.info.txt) {
            onAddNote(noteToEdit)
            setNoteToEdit({info: { title: '', txt: '' } })
        }
    }

    function handleChange({ target }) {
        const { name, value } = target
        if (name === 'txt') {
            setNoteToEdit(prev => ({ ...prev, info: { ...prev.info, txt: value } }))
        } else {
            setNoteToEdit(prev => ({ ...prev, info: { ...prev.info, title: value } }))
        }
    }

    return <div className="container">

        <section className="note-composer" ref={noteRef}>

            <form className="note-form" onSubmit={ev => ev.preventDefault()}>
                <input name="title" className="title-input" type="text" placeholder="Title" onChange={handleChange} value={noteToEdit.info.title} />
                <input name="txt" className="content-input" type="text" placeholder="Take a note..." value={noteToEdit.info.txt}
                    onChange={handleChange} />
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
