import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    count: 0,
    showWaitMessage: false
}

const getters = {
    getCount: state => {
        return state.count;
    },
    getShowWaitMessage: state => {
        return state.showWaitMessage;
    }
}

const mutations = {
    INCREMENT(state) {
        state.count++;
    },
    DECREMENT(state) {
        state.count--;
    },
    INCREMENTVALUE(state, value) {
        state.count=state.count+value
    },
    SHOW_WAIT_MESSAGE(state){
        state.showWaitMessage = true
    },
    HIDE_WAIT_MESSAGE(state){
        state.showWaitMessage = false
    }
}

const actions = {
    incrementCounter(context, callback) {
        context.commit('SHOW_WAIT_MESSAGE')
        setTimeout(function() {
            context.commit('HIDE_WAIT_MESSAGE')
            context.commit('INCREMENT')            
        }, 2000);
    },
    decrementCounter(context) {
        context.commit('DECREMENT')
    },
    incrementCounterWithValue(context, value) {
        let intValue = parseInt(value);
        if (isNaN(intValue)) {
            throw "Impossível converter para número inteiro"
        } else {
            context.commit('INCREMENTVALUE', intValue)
        }        
    }
}

export default new Vuex.Store({
    state, getters, mutations, actions
})