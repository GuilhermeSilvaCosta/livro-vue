<template>
    <div>
        <div>
            <button @click="incrementCounter()">+1</button>
            <button @click="decrementCounter()">-1</button>
        </div>
        <div>
            <input type="text" v-model="incrementValue">
            <button @click="tryIncrementCounterWithValue">Increment</button>
        </div>
        <please-wait></please-wait>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import PleaseWait from './PleaseWait.vue'
export default {
    components:{
        PleaseWait
    },
    data() {
        return {
            incrementValue: 0,
            waitMessage: false
        }
    },
    methods: {
        tryIncrementCounterWithValue: function(){
            try {
                this.incrementCounterWithValue(this.incrementValue)
            } catch(error) {
                alert(error)
            }            
        },
        ...mapActions(['incrementCounter',
                    'decrementCounter',
                    'incrementCounterWithValue'])        
    }
}
</script>
