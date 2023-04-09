<template>
    <div class="modal-box fixed">
        <div class="box">
            <h2 v-if="title">{{ title }}</h2>
            <p v-if="description">{{ description}}</p>
            <slot></slot>
            <div class="button-box">
                <a href="#" @click.prevent="confirm" class="btn btn-active btn-md" v-if="btnConfirm">확인</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            default: null
        },
        description: {
            default: null
        },
        btnConfirm: {
            default: true
        },
        btnClose: {
            default: null
        },
    },
    computed: {
        pop(){
            return this.$store.state.pop;
        },
    },

    methods: {
        confirm(){
            this.$emit("confirm");
        }
    },

}
</script>
