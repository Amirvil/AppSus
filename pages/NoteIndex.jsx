const { useState, useEffect } = React

import { NoteList } from '../cmps/NoteList.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [selectedNote, setSelectedNote] = useState(null)

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
                showSuccessMsg(`note ${noteId} removed`)
            })
            .catch(err => showErrorMsg(`Couldn't remove ${noteId}`))
    }

    function onUpdateNote(updatedNote) {
        noteService.save(updatedNote)
            .then(savedNote => {
                setNotes(prevNotes =>
                    prevNotes.map(note => note.id === savedNote.id ? savedNote : note)
                )
                showSuccessMsg('Note updated successfully')
            })
            .catch(err => {
                console.error('Update failed:', err)
                showErrorMsg('Could not update note')
            })
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
                onRemoveNote={onRemoveNote}
                onSelectNote={(note) => setSelectedNote(note)}
                onUpdate={onUpdateNote} />

            {selectedNote && (<NoteEdit
                note={selectedNote}
                onClose={() => setSelectedNote(null)}
                onUpdateNote={onUpdateNote}
            />
            )}
        </React.Fragment>
    </div>
}