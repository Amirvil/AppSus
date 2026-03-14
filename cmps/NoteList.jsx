const { useState, useEffect, useRef } = React

import { NotePreview } from './NotePreview.jsx'
import { noteService } from '../services/note.service.js'

export function NoteList({ notes, onAddNote, onRemoveNote, onSelectNote, onUpdateNote }) {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const noteRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(ev) {
            if (noteRef.current && !noteRef.current.contains(ev.target)) onSaveNote()
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [noteToEdit])

    const pinnedNotes = notes.filter(note => note.isPinned)
    const otherNotes = notes.filter(note => !note.isPinned)

    function onSaveNote() {
        if (noteToEdit.info.title || noteToEdit.info.txt) {
            onAddNote(noteToEdit)
            setNoteToEdit({ info: { title: '', txt: '' } })
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

    return <div>

        <section className="note-composer" ref={noteRef}>

            <form className="note-form" onSubmit={ev => ev.preventDefault()}>
                <input name="title" className="title-input" type="text" placeholder="Title" onChange={handleChange} value={noteToEdit.info.title} />
                <input name="txt" className="content-input" type="text" placeholder="Take a note..." value={noteToEdit.info.txt}
                    onChange={handleChange} />
            </form>

        </section>

        <section className="note-list">

            {pinnedNotes.length > 0 &&
                <div className="notes-container">
                    <p>Pinned</p>
                    <ul className="note-grid pinned">
                        {pinnedNotes.map(note => <li className="note-card" key={note.id} style={{ backgroundColor: note.style.backgroundColor }}>
                            <NotePreview note={note} onRemoveNote={onRemoveNote} onSelectNote={onSelectNote} onUpdateNote={onUpdateNote} />
                        </li>)}
                    </ul>
                </div>

            }

            <div className="notes-container">
                {pinnedNotes.length > 0 &&
                    <p>Others</p>
                }
                <ul className="note-grid">
                    {otherNotes.map(note => <li className="note-card" key={note.id} style={{ backgroundColor: note.style.backgroundColor }}>
                        <NotePreview note={note} onRemoveNote={onRemoveNote} onSelectNote={onSelectNote} onUpdateNote={onUpdateNote} />
                    </li>)}
                </ul>
            </div>


        </section>

    </div>

}
