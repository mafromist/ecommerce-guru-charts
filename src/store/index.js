// store/index.js
import { createStore } from 'vuex'

import charts from '@/store/modules/charts'
import auth from '@/store/modules/auth'
import user from '@/store/modules/user'
import sales from '@/store/modules/sales'


const store = createStore({
    modules: {
        auth,
        user,
        charts,
        sales
    },
})

export default store


