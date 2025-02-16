import fetchData from '@/api/fetchData'

export default {
    namespaced: true,
    state: {
        firstName: '',
        lastName: '',
        userId: '',
        store: {
            marketplaceName: '',
            storeId: '',
        },
        fetchError: null,
        loading: false,
    },
    getters: {},
    mutations: {
        setUserInfo(state, userInfo) {
            state.firstName = userInfo.firstName
            state.lastName = userInfo.lastName
            state.userId = userInfo.userId
            state.store.marketplaceName = userInfo.store[0].marketplaceName
            state.store.storeId = userInfo.store[0].storeId
        },
        setError(state, error) {
            state.fetchError = error
        },
        clearError(state) {
            state.fetchError = null
        },
        setLoading(state, loadingStatus) {
            state.loading = loadingStatus
        },
    },
    actions: {
        async fetchUserInfo({ commit, rootState }) {
            try {
                const userEmail = rootState.auth.email

                if (!userEmail) {
                    throw new Error('User email not found')
                }
                const response = await fetchData.post('/user/user-information', {
                    email: userEmail,
                })

                if (response.data.ApiStatus) {
                    commit('setUserInfo', response.data.Data.user)
                    return true
                } else {
                    throw new Error(response.data.Message || 'Failed to fetch user information')
                }
            } catch (error) {
                console.error('Error fetching user information:', error.message)
                throw error
            }
        },
    },
}
