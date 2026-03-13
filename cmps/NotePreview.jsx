export function NotePreview({note}) {
    return <article className="note-preview">
        <h2 className="note-title">{note.info && note.info.title || 'No Title'}</h2>
        <p className="note-content">{note.info.txt}</p>
    </article>
}