export default {
    getProducts(state) {
        return state.list;
    },
    hasProducts(state) {
        return state.list.length > 0
    }
}