<template>
    <div class="modal-box fixed">
        <div class="box fixed" data-name="update">
            <form class="px20 px-lg-0">
                <input-avatar :default="user.img" @change="data => form.img = data" />

                <div class="input-box mb32 mb-lg-20">
                    <div class="title-form-box">
                        <strong>닉네임</strong>
                    </div>
                    <div class="box">
                        <input type="text" placeholder="닉네임입니다" v-model="form.nickname">
                    </div>
                    <error :form="form" name="nickname" />
                </div>
                <div class="input-box mb50 mb-lg-30">
                    <div class="title-form-box">
                        <strong>소개글 (10자 미만)</strong>
                    </div>
                    <div class="box">
                        <input type="text" placeholder="관심분야를 입력해보세요" v-model="form.description">
                    </div>
                    <error :form="form" name="description" />
                </div>
                <div>
                    <div class="message-box">
                        <p>이 외 정보는 <b class="f16">마이페이지&gt;내정보</b>에서 변경 가능합니다.</p>
                    </div>
                    <div class="button-box mt24 mt-lg-12">
                        <div class="col-6 pr6">
                            <a href="#" class="btn btn-bd-active btn-md" @click.prevent="close">취소</a>
                        </div>
                        <div class="col-6 pl6">
                            <a href="#" class="btn btn-active btn-md" @click.prevent="update">적용</a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import Form from "@/utils/Form";
export default {
    props: ["user"],

    data(){
        return {
            form: new Form(this.$axios, {
                img: "",
                nickname: this.user.nickname,
                description: this.user.description,
                birth: this.user.birth,
            })
        }
    },

    methods: {
        update(){
            this.form.patch("/api/users")
                .then(response => {
                    this.$store.commit("setPop", {
                        title : "수정완료",
                        description : "성공적으로 처리되었습니다!"
                    });

                    this.$emit("change", response.data);

                    this.close();
                });
        },

        close(){
            this.$emit("close");
        }
    },

    mounted() {

    }

}
</script>
