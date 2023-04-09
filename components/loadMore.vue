<template>
    <div class="button-box mt20">
        <a href="#" class="btn btn-white" v-if="links && links.next" @click.prevent="loadMore">더보기</a>
    </div>
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
