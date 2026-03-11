const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'
import { utilService } from '../services/util.service.js'

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

    function onClearFilter() {
        setFilterBy(noteService.getDefaultFilter())
    }

    if (!notes) return <div className="loader">
        Loading...
    </div>

    console.log(notes)

    return <div className="note-index">
        <React.Fragment>
            <NoteList
                notes={notes} />
        </React.Fragment>
    </div>
}