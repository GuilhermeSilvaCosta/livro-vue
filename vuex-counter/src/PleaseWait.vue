<template>
    <div v-show="getShowWaitMessage">
        Aguarde...
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: mapGetters(['getShowWaitMessage'])
}
</script>
