import Vue from 'vue'

export default {
    loadSuppliers(context) {
        Vue.http.get('/suppliers.json').then(
            response => {
                context.commit('SETSUPPLIERS', response.data)
            },
            error => {
                console.error(error.statusText)
            }
        )
    }
}