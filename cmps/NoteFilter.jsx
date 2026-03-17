
const { useNavigate, useSearchParams } = ReactRouterDOM

export function NoteFilter() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const filterByTxt = searchParams.get('txt') || ''

    function handleChange({ target }) {
        const newParams = new URLSearchParams(searchParams)

        if (target.value) newParams.set('txt', target.value)
        else newParams.delete('txt')

        setSearchParams(newParams)
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