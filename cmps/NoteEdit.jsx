const { useState } = React

import { NoteColor } from './NoteColor.jsx'

export function NoteEdit({ note, onUpdateNote, onClose }) {
    const [noteToEdit, setNoteToEdit] = useState({ ...note })
    const [isPaletteOpen, setIsPaletteOpen] = useState(false)

    function onSetColor(color) {
        setNoteToEdit(prev => ({
            ...prev,
            style: { ...prev.style, backgroundColor: color }
        }))

        setIsPaletteOpen(false)
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
                    />

                    <p className="last-update">Last update: {new Date(note.createdAt).toLocaleDateString()}</p>

                    <div className="modal-actions actions">
                        <button onClick={() => onRemoveNote(note.id)}>
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
                            {isPaletteOpen && <NoteColor onSetColor={onSetColor} />}
                        </button>
                        <button type="button" className="btn-close" onClick={onSave}>
                            X
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}