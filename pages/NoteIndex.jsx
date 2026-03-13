const { useState, useEffect } = React

import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        loadNotes()
        return () => console.log('Bye')
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy)
            .then(setNotes)
    }

    function onAddNote(newNote) {
        noteService.save(newNote)
            .then(savedNote => {
                setNotes(prevNotes => [savedNote, ...prevNotes])
                showSuccessMsg('Note added successfully')
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prev => prev.filter(note => note.id !== noteId))
                onClearFilter()
                showSuccessMsg(`note ${noteId} removed`)
            })
            .catch(err => showErrorMsg(`Couldn't remove ${noteId}`))
    }

    if (!notes) return <div className="loader">
        Loading...
    </div>

    console.log(notes)

    return <div className="note-index">
        <React.Fragment>
            <NoteList
                notes={notes}
                onAddNote={onAddNote}
                onRemoveNote={onRemoveNote} />
        </React.Fragment>
    </div>
}