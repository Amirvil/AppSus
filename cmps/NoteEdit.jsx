const { useState } = React

export function NoteEdit({ note, onUpdateNote, onClose }) {
    const [noteToEdit, setNoteToEdit] = useState({ ...note })

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
        <section className="note-edit-backdrop" onClick={onClose}>
            <div className="note-edit-modal" onClick={(ev) => ev.stopPropagation()}>
                
                <form onSubmit={(ev) => ev.preventDefault()}>
                    <input 
                        type="text" 
                        name="title"
                        className="edit-title"
                        value={noteToEdit.info.title} 
                        onChange={handleChange} 
                        placeholder="Title" 
                    />
                    
                    <textarea 
                        name="txt"
                        className="edit-txt"
                        value={noteToEdit.info.txt} 
                        onChange={handleChange} 
                        placeholder="Note"
                        rows="5"
                    />

                    <div className="modal-actions">
                        <button type="button" className="btn-close" onClick={onSave}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}