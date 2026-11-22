import { create } from 'zustand'

const usePokemonStore = create((set) => ({
    page: 1,

    setPage: (nouvellePage) => set({
        page: nouvellePage
    })
}))

export default usePokemonStore