import fetchData from '@/api/fetchData'

export default {
    namespaced: true,
    state: {
        salesData: {},
        selectedDayRange: 60,
        loading: false,
        fetchError: null,
        currency: '',
    },
    getters: {},
    mutations: {
        setSalesData(state, { data }) {
            if (state.selectedDayRange === undefined) {
                console.error('Store Error: dayRange is undefined')
            }
            state.salesData[state.selectedDayRange] = data
        },
        setCurrency(state, currency) {
            state.currency = currency
        },
        setSelectedDayRange(state, selectedDayRange) {
            state.selectedDayRange = selectedDayRange
        },
        setLoading(state, loadingStatus) {
            state.loading = loadingStatus
        },
        setError(state, error) {
            state.fetchError = error
        },
        clearError(state) {
            state.fetchError = null
        },
    },
    // storeID in user endpoint is used as sellerID
    actions: {
        async fetchSalesData({ commit, rootState, state }) {
            commit('setLoading', true)
            commit('clearError')
            try {
                const response = await fetchData.post('/data/daily-sales-overview', {
                    marketplace: rootState.user.store.marketplaceName,
                    sellerId: rootState.user.store.storeId,
                    requestStatus: 0,
                    day: state.selectedDayRange,
                    excludedYoYData: true,
                })

                const fetchedData = response.data.Data

                const configuredData =
                    fetchedData.item?.map((item) => ({
                        category: item.date,
                        fbaAmount: item.fbaAmount,
                        fbmAmount: item.fbmAmount,
                        profit: item.profit,
                    })) || []

                commit('setCurrency', fetchedData.Currency)
                commit('setSalesData', { data: configuredData })
            } catch (error) {
                commit('setError', error.message)
                console.error(' Error fetching sales data:', error.message)
            } finally {
                commit('setLoading', false)
            }
        },

        updateSelectedDayRange({ commit, dispatch }, selectedDayRange) {
            commit('setSelectedDayRange', selectedDayRange)
            dispatch('fetchSalesData')
        },
    },
}
