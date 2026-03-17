const { useState, useEffect } = React
const { useSearchParams, useParams } = ReactRouterDOM

import { NoteList } from '../cmps/NoteList.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [searchParams] = useSearchParams()
    const { label } = useParams()
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
        const matchesSearch = title.includes(searchStr) || txt.includes(searchStr)

        if (!label) {
            return matchesSearch && !note.status
        }

        if (label === 'trash' || label === 'archive') {
            return matchesSearch && note.status === label
        }

        return matchesSearch && note.label === label && !note.status
    })

    function onAddNote(newNote) {
        noteService.save(newNote)
            .then(savedNote => {
                setNotes(prevNotes => [savedNote, ...prevNotes])
                showSuccessMsg('Note added successfully')
            })
    }

    function onRemoveNote(noteId) {
        const noteToUpdate = notes.find(note => note.id === noteId)

        if (noteToUpdate.status === 'trash') {
            noteService.remove(noteId)
                .then(() => {
                    setNotes(prev => prev.filter(note => note.id !== noteId))
                    showSuccessMsg('Deleted permanently')
                })
        } else {
            const updatedNote = { ...noteToUpdate, status: 'trash' }
            onUpdateNote(updatedNote)
            showSuccessMsg('Moved to trash')
        }
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

    function onArchiveNote(note) {
        const newStatus = note.status === 'archive' ? '' : 'archive'
        const updatedNote = { ...note, status: newStatus }
        onUpdateNote(updatedNote)
        showSuccessMsg(newStatus === 'archive' ? 'Note archived' : 'Note unarchived')
    }

    if (!notes) return <div className="loader">
        Loading...
    </div>

    console.log(notes)

    return <div className="note-index">
        <React.Fragment>
            <NoteList
                notes={notesToDisplay}
                label={label}
                onAddNote={onAddNote}
                onRemoveNote={onRemoveNote}
                onSelectNote={(note) => setSelectedNote(note)}
                onUpdateNote={onUpdateNote}
                onArchiveNote={onArchiveNote} />

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