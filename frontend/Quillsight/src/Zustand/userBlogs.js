import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useBlogStore = create(
    devtools(
        persist(
            (set) => ({
                createdBlogs: [],
                savedBlogs : [] ,

                getCreatedUpdate: (data) => set((state) => ({
                    createdBlogs: [data]
                })),

                getSavedUpdate: (data) => set((state) => ({
                    savedBlogs: [data]
                })),

            }),
            {
                name: "All new Updates"
            }
        )
    )
)

export default useBlogStore;