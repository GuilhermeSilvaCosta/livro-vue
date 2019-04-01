import Vue from 'vue'

export default {
    loadProducts(context) {
        Vue.http.get('/products.json').then(
            response => {
                context.commit('SETPRODUCTS', response.data)
            },
            error => {
                console.error(error.statusText)
            }
        )
    },
    clearProducts(context) {
        context.commit('SETPRODUCTS', [])
    }
}