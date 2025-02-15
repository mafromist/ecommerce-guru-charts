import fetchData from '@/utils/fetchData'

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
        },
        setUserEmail(state, payload) {
            state.email = payload
        },
        removeUserEmail(state) {
            state.email = ''
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
                    commit('setAccessToken', response.data.Data.AccessToken)
                    commit('setUserEmail', email)
                    return true
                } else {
                    throw new Error('Invalid access token')
                }
            } catch (error) {
                console.error('Failed login: ', error)
            }
        },
        logoutUser({ commit }) {
          commit('removeAccessToken')
          commit('removeUserEmail')
        }
    },
}
