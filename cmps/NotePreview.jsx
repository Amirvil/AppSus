
export function NotePreview({ note, onRemoveNote, onSelectNote }) {
    return <article className="note-preview">
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
            <button>
                <img src="assets/img/pallette.svg" />
            </button>
        </div>
    </article >
}