import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useBlogStore = create(
    devtools(
        persist(
            (set) => ({
                createdBlogs: [],
                savedBlogs: [],
                allPosts: [], // New state for all posts
                
                getCreatedUpdate: (data) => set((state) => ({
                    createdBlogs: [data]
                })),
                
                getSavedUpdate: (data) => set((state) => ({
                    savedBlogs: [data]
                })),
                
                // New action to update allPosts
                setAllPosts: (posts) => set((state) => ({
                    allPosts: posts
                })),
            }),
            {
                name: "All new Updates"
            }
        )
    )
)

export default useBlogStore;