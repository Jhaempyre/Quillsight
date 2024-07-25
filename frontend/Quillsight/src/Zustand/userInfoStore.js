import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useUserStore =create(
    devtools(
      persist(
        (set) => ({
          userData: {
            fullname: '',
            email: '',
            username: '',
            avtar:'',
            bio:'',
            createdAt: '',
            updatedAt: '',
          },
          authStats: false,
          loggedUser: (data) => set({
            userData: data
          }),
          logout: () => set({
            userData: {
                fullname: '',
                email: '',
                username: '',
                avtar:'',
                bio:'',
                createdAt: '',
                updatedAt: '',
              },
          }),
          authStatus : (data) => set({
            authStats : data
          }) ,
         
        }),
        {
          name: 'user',
        }
      )
    )
  );
export default useUserStore
