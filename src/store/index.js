// store/index.js
import { createStore } from 'vuex'
import stack from './modules/stack'
import charts from './modules/charts'

const store = createStore({
    modules: {
        stack,
        charts
    },
})

export default store
