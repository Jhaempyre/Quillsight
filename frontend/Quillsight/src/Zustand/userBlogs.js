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
                removeCreatedBlog: (id) => set((state) => ({
                    createdBlogs: [state.createdBlogs[0].filter(blog => blog._id !== id)]
                  })),
                removeSavedBlog: (id) => set((state) => ({
                    savedBlogs: [state.savedBlogs[0].filter(blog => blog._id !== id)]
                  })),  
            }),
            {
                name: "All new Updates"
            }
        )
    )
)

export default useBlogStore;