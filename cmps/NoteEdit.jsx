const { useState, useRef } = React

import { NoteColor } from './NoteColor.jsx'

export function NoteEdit({ note, onUpdateNote, onClose, onRemoveNote }) {
    const [noteToEdit, setNoteToEdit] = useState({ ...note })
    const [isPaletteOpen, setIsPaletteOpen] = useState(false)
    const fileInputRef = useRef(null)
    const [isVideoMode, setIsVideoMode] = useState(false)

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

    function onImgUpload(ev) {
        const file = ev.target.files[0]
        if (!file) return

        const reader = new FileReader()

        reader.onload = (event) => {
            const imageUrl = event.target.result

            setNoteToEdit(prevNote => ({
                ...prevNote,
                type: 'NoteImg',
                info: {
                    ...prevNote.info,
                    url: imageUrl
                }
            }))
        }
        reader.readAsDataURL(file)
    }

    function onVideoUpload(ev) {
        const url = ev.target.value
        if (url) {
            setNoteToEdit(prev => ({
                ...prev,
                type: 'NoteVideo',
                info: { ...prev.info, url }
            }))
            setIsVideoMode(false)
        }
    }


    return (
        <section className="note-edit-backdrop" onClick={onSave}>
            <div className="note-edit-modal note-card" onClick={(ev) => ev.stopPropagation()} style={{ backgroundColor: noteToEdit.style.backgroundColor }}>

                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={onImgUpload}
                />

                {noteToEdit.type === 'NoteImg' && <img src={noteToEdit.info.url} />}
                {noteToEdit.type === 'NoteVideo' && (
                    <iframe
                        width="100%"
                        height="200"
                        src={noteToEdit.info.url.replace("watch?v=", "embed/")}
                        frameBorder="0"
                    ></iframe>
                )}

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

                    {isVideoMode && (
                        <input
                            className="video-url-input content-input"
                            type="text"
                            placeholder="Paste YouTube URL here..."
                            autoFocus
                            onBlur={(ev) => onVideoUpload(ev)}
                        />
                    )}

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
                        <button onClick={() => fileInputRef.current.click()}>
                            <img src="assets/img/image.svg" />
                        </button>
                        <button onClick={() => setIsVideoMode(!isVideoMode)}>
                            <img src="assets/img/video.svg" />
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