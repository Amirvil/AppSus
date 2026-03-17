export function NoteDynamic({ note }) {
    const { info, type } = note
    switch (type) {
        case 'NoteTxt':
            return <div className="note-dynamic">
                <h2 className="note-title">{info && info.title || 'No Title'}</h2>
                <p className="note-content">{info.txt}</p>
            </div>

        case 'NoteImg':
            return <div className="note-dynamic">
                <img className="img-note" src={info.url} />
                <h2 className="note-title">{info && info.title || 'No Title'}</h2>
                <p className="note-content">{info.txt}</p>
            </div>

        case 'NoteVideo':
            const embedUrl = info.url.replace("watch?v=", "embed/")
            return <div className="note-dynamic">
                <iframe src={embedUrl} />
                <h2 className="note-title">{info && info.title || 'No Title'}</h2>
                <p className="note-content">{info.txt}</p>
            </div>

        case 'NoteTodos':
            return <ul className="note-todos">
                {info.todos.map((todo, idx) => (
                    <li key={idx} className={todo.doneAt ? 'done' : ''}>
                        {todo.txt}
                    </li>
                ))}
            </ul>
    }
}
