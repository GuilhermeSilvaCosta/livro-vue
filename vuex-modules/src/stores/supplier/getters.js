export default {
    hasSuppliers(state) {
        return state.list.length != 0
    },
    getSuppliers(state) {
        return state.list
    }
}