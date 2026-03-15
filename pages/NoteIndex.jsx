const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

import { NoteList } from '../cmps/NoteList.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [searchParams] = useSearchParams()
    const [selectedNote, setSelectedNote] = useState(null)

    const filterBy = searchParams.get('txt') || ''

    useEffect(() => {
        loadNotes()
    }, [searchParams])

    function loadNotes() {
        noteService.query(filterBy)
            .then(setNotes)
    }


    const notesToDisplay = notes.filter(note => {
        const searchStr = filterBy.toLowerCase()
        const title = (note.info && note.info.title) ? note.info.title.toLowerCase() : ''
        const txt = (note.info && note.info.txt) ? note.info.txt.toLowerCase() : ''

        return title.includes(searchStr) || txt.includes(searchStr)
    })

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
                notes={notesToDisplay}
                onAddNote={onAddNote}
                onRemoveNote={onRemoveNote}
                onSelectNote={(note) => setSelectedNote(note)}
                onUpdateNote={onUpdateNote} />

            {selectedNote && (<NoteEdit
                note={selectedNote}
                onClose={() => setSelectedNote(null)}
                onUpdateNote={onUpdateNote}
                onRemoveNote={onRemoveNote}
            />
            )}
        </React.Fragment>
    </div>
}