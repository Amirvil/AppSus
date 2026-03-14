const { useState } = React

import { NoteColor } from './NoteColor.jsx'

export function NotePreview({ note, onRemoveNote, onSelectNote, onUpdateNote }) {
    const [isPaletteOpen, setIsPaletteOpen] = useState(false)

    function onSetColor(color) {
        const updatedNote = {
            ...note,
            style: { ...note.style, backgroundColor: color }
        }
        onUpdateNote(updatedNote)
        setIsPaletteOpen(false)
    }

    function onPinned(ev) {
        ev.stopPropagation()
        const updatedNote = { ...note, isPinned: !note.isPinned }
        onUpdateNote(updatedNote)
    }

    return <article className="note-preview">
        <button className={`btn-pin ${(note.isPinned) ? 'pinned' : ''}`}
            onClick={(ev) => onPinned(ev)}>
            <img src="assets/img/pin.svg"
                style={{ opacity: note.isPinned ? 1 : 0.4 }} />
        </button>
        <h2 className="note-title">{note.info && note.info.title || 'No Title'}</h2>
        <p className="note-content">{note.info.txt}</p>
        <div className="actions">
            <button onClick={() => onRemoveNote(note.id)}>
                <img src="assets/img/trash.svg" />
            </button>
            <button onClick={() => onSelectNote(note)}>
                <img src="assets/img/edit.svg" />
            </button>
            <button>
                <img src="assets/img/label.svg" />
            </button>
            <button>
                <img src="assets/img/archive.svg" />
            </button>
            <button>
                <img src="assets/img/image.svg" />
            </button>
            <button onClick={() => setIsPaletteOpen(!isPaletteOpen)}>
                <img src="assets/img/pallette.svg" />
                {isPaletteOpen && <NoteColor onSetColor={onSetColor} />}
            </button>
        </div>
    </article>
}