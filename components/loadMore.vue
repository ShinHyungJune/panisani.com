<template>
    <a href="#" class="btn btn-white" v-if="links && links.next" @click.prevent="loadMore">더보기</a>
</template>

<script>
export default {
    props: ["links"],

    computed: {

    },

    methods: {
        loadMore(){
            this.$emit("loadMore");
        }
    }

}
</script>
