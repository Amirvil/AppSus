export function NoteColor({ onSetColor }) {
    const colors = [
        '#ffffff', '#f28b82', '#fbbc04', '#fff475', 
        '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', 
        '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed'
    ]

    return (
        <section className="color-input">
            <div className="color-list">
                {colors.map(color => (
                    <div
                        key={color}
                        className="color-option"
                        style={{ backgroundColor: color }}
                        onClick={() => onSetColor(color)}
                    ></div>
                ))}
            </div>
        </section>
    )
}