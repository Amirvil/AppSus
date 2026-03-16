const { useState } = React

import { NoteColor } from './NoteColor.jsx'

export function NoteEdit({ note, onUpdateNote, onClose, onRemoveNote }) {
    const [noteToEdit, setNoteToEdit] = useState({ ...note })
    const [isPaletteOpen, setIsPaletteOpen] = useState(false)

    function onSetColor(color) {
        const updatedNote = {
            ...noteToEdit,
            style: { ...noteToEdit.style, backgroundColor: color }
        }
        setNoteToEdit(updatedNote)
        onUpdateNote(updatedNote)
        setIsPaletteOpen(false)
    }

    function onRemove(noteId) {
        onRemoveNote(noteId)
        onClose()
    }

    function handleChange({ target }) {
        const { name, value } = target
        setNoteToEdit(prev => ({
            ...prev,
            info: { ...prev.info, [name]: value }
        }))
    }

    function onSave() {
        onUpdateNote(noteToEdit)
        onClose()
    }


    return (
        <section className="note-edit-backdrop" onClick={onSave}>
            <div className="note-edit-modal note-card" onClick={(ev) => ev.stopPropagation()} style={{ backgroundColor: noteToEdit.style.backgroundColor }}>

                {note.info.url &&
                    <img src={note.info.url} />
                }

                <form onSubmit={(ev) => ev.preventDefault()}>
                    <input
                        type="text"
                        name="title"
                        className="edit-title"
                        value={noteToEdit.info.title || ''}
                        onChange={handleChange}
                        placeholder="Title"
                    />

                    <input
                        type="text"
                        name="txt"
                        className="edit-txt"
                        value={noteToEdit.info.txt}
                        onChange={handleChange}
                        placeholder="Note"
                        autoComplete="off"
                    />

                    <p className="last-update">Last update: {new Date(note.createdAt).toLocaleDateString()}</p>

                    <div className="modal-actions actions">
                        <button onClick={() => onRemove(note.id)}>
                            <img src="assets/img/trash.svg" />
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
                        </button>
                        <button type="button" className="btn-close" onClick={onSave}>
                            Close
                        </button>
                        {isPaletteOpen && <NoteColor onSetColor={onSetColor} />}
                    </div>
                </form>
            </div>
        </section>
    )
}