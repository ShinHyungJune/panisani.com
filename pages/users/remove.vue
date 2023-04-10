<template>
    <article>
        <form @submit.prevent="remove">
            <div class="container lg">
                <div class="title-box">
                    <h2 class="tl">탈퇴하기</h2>
                    <p class="tl mt10">회원 탈퇴 전 아래 사항을 꼭 확인해주시기 바랍니다.</p>
                </div>
                <div class="text-box mt48 mt-lg-30">
                    <dl>
                        <dd class="dot">탈퇴 후에도 게시판에 작성한 게시글 및 댓글은 그대로 남아 있습니다.</dd>
                        <dd class="dot">삭제를 원하는 게시글이 있다면 반드시 탈퇴 전에 삭제하여 주시기 바랍니다.</dd>
                        <dd class="dot">탈퇴 후에는 회원 본인 여부를 확인할 수 있는 방법이 없기 때문에,<br>게시글을 임의로 삭제해 드릴 수 없습니다.</dd>
                        <dd class="dot">탈퇴 후에는 현재 로그인 아이디로 다시 가입할 수 없으며<br>아이디와 데이터는 복구할 수 없습니다.</dd>
                        <dd class="dot">또한 탈퇴 후 같은 본인인증 정보를 가진 간편로그인 계정으로 가입이 불가능합니다.</dd>
                        <dd class="dot">부정한 목적으로 탈퇴 후 재가입을 한 경우에는 이용에 제한이 있을 수 있습니다.</dd>
                    </dl>
                </div>
                <div class="gray-box mt48 mt-lg-30 bdr0 px30 px-lg-15 py24 py-lg-15">
                    <div class="text-box">
                        <h3>안내사항</h3>
                        <dl class="mb16 mb-lg-10">
                            <dt class="dot">계약 또는 청약 철회 등에 관한 기록</dt>
                            <dd>
                                <span>보존근거 : 전자상거래 등에서의 소비자보호에 관한 법률<br>보존기간 : 5년</span>
                            </dd>
                        </dl>
                        <dl class="mb16 mb-lg-10">
                            <dt class="dot">대금 결제 및 재화 등의 공급에 관한 기록</dt>
                            <dd>
                                <span>보존근거 : 전자상거래 등에서의 소비자보호에 관한 법률<br>보존기간 : 5년</span>
                            </dd>
                        </dl>
                        <dl class="mb16 mb-lg-10">
                            <dt class="dot">소비자의 불만 또는 분쟁 처리에 관한 기록</dt>
                            <dd>
                                <span>보존근거 : 전자상거래 등에서의 소비자보호에 관한 법률<br>보존기간 : 3년</span>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="text-box mt32 mt-lg-16">
                    <dl>
                        <dd>위 안내사항을 확인하였으며, 탈퇴 시 계정에 남아있는 정보는 복구되지 않음을 인지하였으며 이에 동의합니다.</dd>
                    </dl>
                </div>
                <div class="text-box mt100 pt25 mt-lg-50">
                    <dl>
                        <dd>계정을 탈퇴하려면 해당 계정의 <b>비밀번호</b>를 입력하세요</dd>
                    </dl>
                </div>
                <div class="input-box mt16 mt-lg-10">
                    <div class="box" @keydown="() => {form.errors.clear()}">
                        <input type="password" placeholder="비밀번호" v-model="form.password">
                    </div>
                    <error :form="form" name="password" />
                </div>
                <div class="button-box mx-box mt48 mt-lg-24">
                    <div class="col-6 pr6">
                        <a href="#" class="btn btn-bd-active btn-md" @click.prevent="() => $router.back()">취소</a>
                    </div>
                    <div class="col-6 pl6">
                        <a href="#" class="btn btn-active btn-md" @click.prevent="remove">탈퇴</a>
                    </div>
                </div>
            </div>
        </form>
    </article>

</template>

<script>
import Form from "../../utils/Form";
export default {
    middleware:"auth",
    data(){
        return {
            form : new Form(this.$axios, {
                password: "",
            }),
        }
    },
    methods: {
        remove(){
            this.form.delete("/api/users")
                .then(response => {
                    this.$store.commit("setPop", {
                        title: "탈퇴완료",
                        description: "성공적으로 처리되었습니다!"
                    });

                    this.$router.push("/login");
                })
        },
    },

    computed: {

    },

    mounted() {

    }
}
</script>
