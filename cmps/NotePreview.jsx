const { useState, useEffect, useRef } = React

import { NoteColor } from './NoteColor.jsx'
import { NoteDynamic } from './NoteDynamic.jsx'


export function NotePreview({ note, onRemoveNote, onSelectNote, onUpdateNote, onAddNote, onArchiveNote }) {
    const [isPaletteOpen, setIsPaletteOpen] = useState(false)
    const [isVideoMode, setIsVideoMode] = useState(false)
    const fileInputRef = useRef(null)
    const paletteRef = useRef(null)
    const videoInputRef = useRef(null)
    const hasMedia = note.info.url ? true : false
    const isTrash = note.status === 'trash'



    useEffect(() => {
        if (!isPaletteOpen && !isVideoMode) return

        function handleClickOutside(ev) {
            if (paletteRef.current && !paletteRef.current.contains(ev.target)) {
                setIsPaletteOpen(false)
            }
            if (isVideoMode && videoInputRef.current && !videoInputRef.current.contains(ev.target)) {
                setIsVideoMode(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isPaletteOpen, isVideoMode])

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

    function onImgUpload(ev) {
        setIsVideoMode(false)
        const file = ev.target.files[0]
        if (!file) return

        const reader = new FileReader()

        reader.onload = (event) => {
            const imageUrl = event.target.result

            const updatedNote = {
                ...note,
                type: 'NoteImg',
                info: {
                    ...note.info,
                    url: imageUrl
                }
            }
            onUpdateNote(updatedNote)
        }
        reader.readAsDataURL(file)
    }

    function onVideoUpload(ev) {
        const url = ev.target.value
        if (url) {
            const updatedNote = {
                ...note,
                type: 'NoteVideo',
                info: { ...note.info, url }
            }
            onUpdateNote(updatedNote)
            setIsVideoMode(false)
        }
    }

    function onRestore() {
        onUpdateNote({ ...note, status: '' })
    }

    return <article className="note-preview"
        style={{ backgroundColor: (note.style && note.style.backgroundColor) ? note.style.backgroundColor : '#ffffff' }}>
        <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={onImgUpload}
        />
        <button className={`btn-pin ${(note.isPinned) ? 'pinned' : ''} ${(hasMedia) ? 'media' : ''}`}
            onClick={(ev) => onPinned(ev)}>
            <img className="img-pin" src="assets/img/pin.svg"
                style={{ opacity: note.isPinned ? 1 : 0.4 }} />
        </button>
        <NoteDynamic note={note} />
        {isVideoMode && (
            <input
                ref={videoInputRef}
                className="video-url-input preview-input"
                type="text"
                placeholder="YouTube URL..."
                autoFocus
                onBlur={onVideoUpload}
                onClick={(ev) => ev.stopPropagation()}
            />
        )}


        {isTrash ? (
            <div className="actions">
                <button onClick={() => onRemoveNote(note.id)}>
                    <img src="assets/img/trash.svg" />
                </button>
                <button onClick={() => onRestore()}>
                    <img src="assets/img/restore.svg" />
                </button>
            </div>
        ) : (
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
                <button onClick={() => onArchiveNote(note)}>
                    <img src="assets/img/archive.svg" />
                </button>
                <button onClick={() => fileInputRef.current.click()}>
                    <img src="assets/img/image.svg" />
                </button>
                <button onClick={() => setIsVideoMode(!isVideoMode)}>
                    <img src="assets/img/video.svg" />
                </button>
                <button onClick={() =>
                    setIsPaletteOpen(!isPaletteOpen)}>
                    <img src="assets/img/pallette.svg" />
                </button>
            </div>
        )}

        {
            isPaletteOpen && (
                <div ref={paletteRef}
                    onClick={(ev) => ev.stopPropagation()}>
                    <NoteColor onSetColor={onSetColor} />
                </div>
            )
        }
    </article >
}