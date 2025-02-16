import fetchData from '@/api/fetchData'

export default {
    namespaced: true,
    state: {
        accessToken: '',
        email: '',
    },
    getters: {
        isAuthenticated: (state) => state.accessToken !== '',
    },
    mutations: {
        setAccessToken(state, payload) {
            state.accessToken = payload
        },
        removeAccessToken(state) {
            state.accessToken = ''
            localStorage.removeItem('accessToken');
        },
        setUserEmail(state, payload) {
            state.email = payload    
        },
        removeUserEmail(state) {
            state.email = ''
            localStorage.removeItem('userEmail');
        }
    },
    actions: {
        async loginUser({ commit }, { email, password }) {
            try {
                const response = await fetchData.post('/oauth/token', {
                    Email: email,
                    Password: password,
                    GrantType: 'password',
                    Scope: 'amazon_data',
                    ClientId: 'C0001',
                    ClientSecret: 'SECRET0001',
                    RedirectUri: 'https://api.eva.guru',
                })

                if (response.data.ApiStatus) {
                    const accessToken = response.data.Data.AccessToken
                    localStorage.setItem('accessToken', accessToken); 
                    localStorage.setItem('userEmail', email);
                    commit('setAccessToken', accessToken)
                    commit('setUserEmail', email)
                    return true
                } else {
                    throw new Error('Invalid access token')
                }
            } catch (error) {
                console.error('Failed login: ', error)
            }
        },

        initializeAuth({ commit }) {
          const token = localStorage.getItem('accessToken');
          const email = localStorage.getItem('userEmail');
          if (token) commit('setAccessToken', token);
          if (email) commit('setUserEmail', email);
        },
        
        async logoutUser({ commit }) {
          try {
           const response = await fetchData.post('/user/logout')
              if (response.data.ApiStatus) {
                commit('removeAccessToken')
                commit('removeUserEmail')
                window.location.href = '/';
                return true
              } else {
                throw new Error('Invalid access token')
              }
          } catch (error) {
              console.error('Failed logout: ', error)
          }
        }
    },
}
