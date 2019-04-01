const state = {
    list: [],
    selected: {}
}

const mutations = {
    SETSUPPLIERS(state, data) {
        state.list = data
    }
}

import actions from './actions'
import getters from './getters'

export default { state, mutations, actions, getters }