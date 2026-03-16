const { useState, useEffect, useRef } = React

import { NoteColor } from './NoteColor.jsx'
import { NoteDynamic } from './NoteDynamic.jsx'


export function NotePreview({ note, onRemoveNote, onSelectNote, onUpdateNote, onAddNote, onImageUpload, onVideoUpload }) {
    const [isPaletteOpen, setIsPaletteOpen] = useState(false)
    const [isVideoMode, setIsVideoMode] = useState(false)
    const fileInputRef = useRef(null)

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

    function onDuplicate(ev) {
        ev.stopPropagation()
        const { id, ...noteToCopy } = note
        onAddNote(noteToCopy)
    }

    return <article className="note-preview"
        style={{ backgroundColor: (note.style && note.style.backgroundColor) ? note.style.backgroundColor : '#ffffff' }}>
        <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
        />
        <button className={`btn-pin ${(note.isPinned) ? 'pinned' : ''}`}
            onClick={(ev) => onPinned(ev)}>
            <img className="img-pin" src="assets/img/pin.svg"
                style={{ opacity: note.isPinned ? 1 : 0.4 }} />
        </button>
        <NoteDynamic note={note} />
        <div className="actions">
            <button onClick={() => onRemoveNote(note.id)}>
                <img src="assets/img/trash.svg" />
            </button>
            <button onClick={() => onSelectNote(note)}>
                <img src="assets/img/edit.svg" />
            </button>
            <button onClick={(ev) => onDuplicate(ev)}>
                <img src="assets/img/copy.svg" />
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
            <button>
                <img src="assets/img/video.svg" />
            </button>
            <button onClick={() =>
                setIsPaletteOpen(!isPaletteOpen)}>
                <img src="assets/img/pallette.svg" />
            </button>
            {isPaletteOpen && <NoteColor onSetColor={onSetColor} />}
        </div>
    </article >
}