<template>
    <div class="modal-box fixed" v-if="pop">
        <div class="box">
            <h2 v-if="pop.title">{{ pop.title }}</h2>
            <p v-if="pop.description">{{ pop.description}}</p>
            <div class="button-box">
                <a href="#" @click.prevent="close" class="btn btn-active btn-md">확인</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        pop(){
            return this.$store.state.pop;
        },
    },

    methods: {
        close(){
            this.$store.commit("setPop", null);
        }
    },

}
</script>
