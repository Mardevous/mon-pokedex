function Pagination({ page, setPage, hasNext, isLoading }) {
    return (
        <div>
            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1 || isLoading}
            >
                Prédecent
            </button>

            <span>
                Page {page}
            </span>

            <button
                onClick={() => setPage(page + 1)}
                disabled={!hasNext || isLoading}
            >
                Suivant
            </button>
        </div>
    )
}

export default Pagination