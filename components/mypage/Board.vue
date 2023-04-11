<template>
    <li class="list-item add" v-if="active">
        <div class="setting-head">
            <input type="text" placeholder="게시판명을 작성해주세요." v-model="form.title">
            <div class="button-box">
                <a href="#" class="btn btn-white btn-sm" @click.prevent="update">저장</a>
            </div>
        </div>
    </li>
    <li class="list-item" v-else>
        <div class="setting-head">
            <strong>{{ board.title }}</strong>

            <div class="button-boxes">
                <div class="button-box mr10">
                    <div class="m-input-radio type01">
                        <input type="checkbox" id="" v-if="form.open" checked>
                        <input type="checkbox" id="" v-else>
                        <label for="" @click="() => {form.open = !form.open; update();}">
                            <span class="mark">{{ form.open ? "ON" : "OFF" }}</span>
                        </label>
                    </div>
                </div>

                <div class="button-box">
                    <a href="#" class="btn btn-white btn-sm" @click.prevent="edit">편집</a>
                </div>

                <div class="button-box button-box-arrows">
                    <a href="#" class="btn btn-white btn-circle" @click.prevent="up">
                        <i class="xi-angle-up"></i>
                    </a>
                    <a href="#" class="btn btn-white btn-circle" @click.prevent="down">
                        <i class="xi-angle-down"></i>
                    </a>
                </div>
            </div>
        </div>
    </li>
</template>
<style>

</style>
<script>
import Form from "~/utils/Form";
export default {
    props: ["board"],

    data(){
        return {
            form: new Form(this.$axios, {
                open: this.board.open,
                title: this.board.title,
                community_id: this.board.community_id
            }),

            active: false,
        }
    },

    computed: {

    },

    methods: {
        update(){
            this.form.open = this.form.open ? 1 : 0;

            this.form.patch("/api/boards/" + this.board.id)
                .then(response => {
                    this.board = response.data;

                    this.active = false;
                })
        },

        edit(){
            this.form.title = this.board.title;
            this.active = true;
        },

        up(){
            this.$emit("up")
        },

        down(){
            this.$emit("down")
        },

    },

    mounted() {

    }

}
</script>
