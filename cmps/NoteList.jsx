const { useState, useEffect, useRef } = React

import { NotePreview } from './NotePreview.jsx'
import { NoteColor } from './NoteColor.jsx'
import { noteService } from '../services/note.service.js'

export function NoteList({ notes, onAddNote, onRemoveNote, onSelectNote, onUpdateNote }) {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const noteRef = useRef(null)
    const fileInputRef = useRef(null)
    const [isExpanded, setIsExpanded] = useState(false)
    const [isPaletteOpen, setIsPaletteOpen] = useState(false)
    const [isVideoMode, setIsVideoMode] = useState(false)

    useEffect(() => {
        function handleClickOutside(ev) {
            if (noteRef.current && !noteRef.current.contains(ev.target)) {
                onSaveNote()
                setIsExpanded(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [noteToEdit])

    const pinnedNotes = notes.filter(note => note.isPinned)
    const otherNotes = notes.filter(note => !note.isPinned)

    function onSaveNote() {
        const { title, txt, url } = noteToEdit.info
        if (title || txt || url) {
            if (noteToEdit.id) onUpdateNote(noteToEdit)
            else onAddNote(noteToEdit)
        }
        setIsVideoMode(false)
        setNoteToEdit(noteService.getEmptyNote())
    }

    function handleChange({ target }) {
        const { name, value } = target
        if (name === 'txt') {
            setNoteToEdit(prev => ({ ...prev, info: { ...prev.info, txt: value } }))
        } else {
            setNoteToEdit(prev => ({ ...prev, info: { ...prev.info, title: value } }))
        }
    }

    function onClose() {
        onSaveNote()
        setIsExpanded(false)
    }

    function onPinned(ev) {
        ev.stopPropagation()
        setNoteToEdit(prev => ({
            ...prev,
            isPinned: !prev.isPinned
        }))
    }

    function onSetColor(color) {
        setNoteToEdit(prevNote => ({
            ...prevNote,
            style: { ...prevNote.style, backgroundColor: color }
        }))
        setIsPaletteOpen(false)
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

    return <div>

        <section className="note-composer" ref={noteRef}
            style={{ backgroundColor: (noteToEdit.style && noteToEdit.style.backgroundColor) || '#ffffff' }}>
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={onImgUpload}
            />

            {isExpanded && (
                <button className="btn-pin-composer"
                    onClick={(ev) => onPinned(ev)}>
                    <img src="assets/img/pin.svg"
                        style={{ opacity: noteToEdit.isPinned ? 1 : 0.4 }} />
                </button>
            )}

            {noteToEdit.info.url && (
                <div className="composer-media-preview">
                    {noteToEdit.type === 'NoteImg' && (
                        <img className="composer-img" src={noteToEdit.info.url} alt="preview" />
                    )}

                    {noteToEdit.type === 'NoteVideo' && (
                        <div className="video-container">
                            <iframe
                                src={noteToEdit.info.url.replace("watch?v=", "embed/")}
                                frameBorder="0"
                            ></iframe>
                        </div>
                    )}

                    <button className="btn-remove-media"
                        onClick={() => setNoteToEdit(prev => ({ ...prev, type: 'NoteTxt', info: { ...prev.info, url: '' } }))}>
                        ✕
                    </button>
                </div>
            )}

            <form className="note-form" onSubmit={ev => ev.preventDefault()}>
                {isExpanded && (
                    <input name="title" className="title-input" type="text" placeholder="Title" onChange={handleChange} value={noteToEdit.info.title} />
                )}

                <input name="txt" className="content-input" type="text" placeholder="Take a note..." value={noteToEdit.info.txt}
                    onChange={handleChange}
                    onFocus={() => setIsExpanded(true)}
                    autoComplete="off" />

                {isVideoMode && (
                    <input
                        className="video-url-input content-input"
                        type="text"
                        placeholder="Paste YouTube URL here..."
                        autoFocus
                        onBlur={(ev) => onVideoUpload(ev)}
                    />
                )}
            </form>

            {isExpanded && (
                <div className="composer-actions">
                    <button className="btn-close"
                        onClick={() => onClose()}>
                        Close
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
                    <button>
                        <img src="assets/img/notifications.svg" />
                    </button>
                    <button onClick={() => setIsPaletteOpen(!isPaletteOpen)}>
                        <img src="assets/img/pallette.svg" />
                    </button>
                    {isPaletteOpen && <NoteColor onSetColor={onSetColor} />}
                </div>
            )}


        </section>

        <section className="note-list">

            {pinnedNotes.length > 0 &&
                <div className="notes-container">
                    <p>Pinned</p>
                    <ul className="note-grid pinned">
                        {pinnedNotes.map(note => <li className="note-card" key={note.id} style={{ backgroundColor: note.style.backgroundColor }}>
                            <NotePreview note={note} onRemoveNote={onRemoveNote} onSelectNote={onSelectNote} onUpdateNote={onUpdateNote}
                                onAddNote={onAddNote} onImageUpload={onImgUpload} onVideoUpload={onVideoUpload} />
                        </li>)}
                    </ul>
                </div>

            }

            <div className="notes-container">
                {pinnedNotes.length > 0 &&
                    <p>Others</p>
                }
                <ul className="note-grid">
                    {otherNotes.map(note => <li className="note-card" key={note.id} style={{ backgroundColor: note.style.backgroundColor }}>
                        <NotePreview note={note} onRemoveNote={onRemoveNote} onSelectNote={onSelectNote} onUpdateNote={onUpdateNote}
                            onAddNote={onAddNote} />
                    </li>)}
                </ul>
            </div>


        </section>

    </div>

}
