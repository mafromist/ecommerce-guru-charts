import { createStore } from 'vuex'

import auth from '@/store/modules/auth'
import user from '@/store/modules/user'
import sales from '@/store/modules/sales'
import skuList from './modules/skuList'


const store = createStore({
    modules: {
        auth,
        user,
        sales,
        skuList
    },
})

export default store


