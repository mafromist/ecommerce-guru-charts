import fetchData from '@/api/fetchData'

const formatCurrency = (value, currency = '$') => {
    if (isNaN(value)) return ''
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value)
}

export default {
    namespaced: true,
    state: {
        skuList: [],
        rawSkuList: [],
        selectedDate: '',
        selectedDate2: '',
        pageNumber: 0,
        isDaysCompare: false,
        loading: false,
        fetchError: null,
        refundRateData: [],
    },
    getters:{},
    mutations: {
        setSkuList(state, skuList) {
            state.skuList = skuList
        },
        setLoading(state, loading) {
            state.loading = loading
        },
        setError(state, error) {
            state.fetchError = error
        },
        clearError(state) {
            state.fetchError = null
        },
        setSelectedDate(state, date) {
            state.selectedDate = date
        },
        setSelectedDate2(state, date) {
            state.selectedDate2 = date
        },
        setRawSkuList(state, rawSkuList) {
            state.rawSkuList = rawSkuList
        },
        setRefundRateData(state, refundRateData) {
            state.refundRateData = refundRateData
        },
    },
    actions: {
        async fetchSkuList({ commit, rootState }, payload) {
            commit('setLoading', true)
            commit('clearError')

            try {
                const postData = {
                    marketplace: rootState.user.store.marketplaceName,
                    sellerId: rootState.user.store.storeId,
                    salesDate: payload.selectedDate,
                    salesDate2: payload.selectedDate2,
                    pageSize: 30,
                    pageNumber: payload.pageNumber || 1,
                    isDaysCompare: payload.selectedDate2 ? 1 : 0,
                }

                const response = await fetchData.post('/data/daily-sales-sku-list', postData)

                const fetchedData = response.data.Data

                const averageSales = (totalSales, totalSoldUnits) => (totalSoldUnits > 0 ? totalSales / totalSoldUnits : 0)

                const configuredData =
                    fetchedData.item?.skuList.map((item) => {
                        console.log({ item })
                        return {
                            sku: item.sku,
                            productName: item.productName,
                            totalSalesOne: item.amount,
                            totalSoldUnitsOne: item.qty,
                            totalSalesTwo: item.amount2,
                            totalSoldUnitsTwo: item.qty2,
                            averageSalesOne: averageSales(item.amount, item.qty),
                            averageSalesTwo: averageSales(item.amount2, item.qty2),
                            isDatesCompared: payload.selectedDate2 ? true : false,
                        }
                    }) || []
                commit('setSkuList', configuredData)
                commit('setRawSkuList', response.data.Data.item.skuList)
            } catch (error) {
                commit('setError', error.message)
            } finally {
                commit('setLoading', false)
            }
        },
        async fetchSkuRefundRate({ commit, state, rootState }) {
            commit('setLoading', true)
            commit('clearError')
            try {
                if (!state.rawSkuList || state.rawSkuList.length === 0) {
                    throw new Error('No SKUs available for refund rate calculation')
                }
                const skuList = state.skuList.map((item) => item.sku)

                const postData = {
                    marketplace: rootState.user.store.marketplaceName,
                    sellerId: rootState.user.store.storeId,
                    skuList: skuList,
                    requestedDay: rootState.sales.selectedDayRange,
                }

                const response = await fetchData.post('/data/get-sku-refund-rate', postData)
                const refundRateData = response.data.Data

                const updatedSkuList = state.skuList.map((skuItem) => {
                    const refundData = refundRateData.find((refundItem) => refundItem.sku === skuItem.sku)
                    return {
                        ...skuItem,
                        refundRate: refundData ? refundData.refundRate : 0,
                    }
                })

                commit('setSkuList', updatedSkuList)
            } catch (error) {
                commit('setError', error.message)
            } finally {
                commit('setLoading', false)
            }
        },
    },
}
