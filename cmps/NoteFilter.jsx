
const { useNavigate, useSearchParams } = ReactRouterDOM

export function NoteFilter() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const filterByTxt = searchParams.get('txt') || ''

    function handleChange({ target }) {
        navigate(`/note?txt=${target.value}`)
    }

    return <section className="filter-container filter">
        <button>
            <img src="assets/img/search.svg" />
        </button>
        <input
            value={filterByTxt}
            onChange={handleChange}
            type="text"
            placeholder="Search" />
    </section>
}