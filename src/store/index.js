// store/index.js
import { createStore } from 'vuex'

import charts from '@/store/modules/charts'
import auth from '@/store/modules/auth'
import user from '@/store/modules/user'


const store = createStore({
    modules: {
        auth,
        user,
        charts,
    },
})

export default store
