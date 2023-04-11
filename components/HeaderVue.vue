<template>
    <header>
        <div class="box">
            <h1>
                <nuxt-link to="/">
                    <img src="/images/img_page_logo.png">
                </nuxt-link>
            </h1>
            <div class="gnb">
                <ul>
                    <li><nuxt-link to="/communities">커뮤니티</nuxt-link></li>
                    <li><nuxt-link to="/">파니사니</nuxt-link></li>
                    <li><nuxt-link to="/qnas">문의하기</nuxt-link></li>
                </ul>
            </div>
            <div class="lnb">
                <nuxt-link to="/searches/create" class="search">검색</nuxt-link>
                <nuxt-link to="/mypage/subscriptions" class="login" v-if="$auth.user">마이페이지</nuxt-link>
                <nuxt-link to="/login" class="login" v-else>로그인</nuxt-link>
                <a href="#" class="menu" @click.prevent="active = true">메뉴바</a>
            </div>
            <div :class="`fnb ${active ? 'fixed' : ''}`">
                <a href="#" class="close" @click.prevent="active = false">닫기</a>
                <div class="fnb-box">
                    <div class="fnb-logo" @click="$router.push('/')" style="cursor:pointer;">
                        <img src="/images/img_page_logo.png">
                    </div>
                    <div class="fnb-menu">
                        <strong>NFT<br>웹진</strong>
                        <ul>
                            <li v-for="recommendUser in recommendUsers.data" :key="recommendUser.id">
                                <nuxt-link :to="`/users/show?id=${recommendUser.user.id}`">
                                    <div><img :src="recommendUser.user.img ? recommendUser.user.img.url : ''"></div>
                                    <div>
                                        <strong>{{recommendUser.user.nickname}}</strong>
                                        <span>바로가기</span>
                                    </div>
                                </nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to="/notices">
                                    <div><img src="/images/img_cate_07.png"></div>
                                    <div>
                                        <strong><b>공지사항</b></strong>
                                    </div>
                                </nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to="/mypage/subscriptions">
                                    <div><img src="/images/img_cate_08.png"></div>
                                    <div>
                                        <strong><b>마이페이지</b></strong>
                                    </div>
                                </nuxt-link>
                            </li>
                            <!--
                            <li class="off">
                                <a href="">
                                    <div><img src="/images/img_cate_09.png"></div>
                                    <div>
                                        <strong><b>설정 (준비중)</b></strong>
                                    </div>
                                </a>
                            </li>
                            <li class="off">
                                <a href="">
                                    <div><img src="/images/img_cate_10.png"></div>
                                    <div>
                                        <strong><b>쇼핑 (준비중)</b></strong>
                                    </div>
                                </a>
                            </li>
                            -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    data(){
        return {
            recommendUsers: {
                data: []
            },

            active: false,
        }
    },

    methods: {
        getRecommendUsers(){
            this.$axios.get("/api/recommendUsers")
                .then(response => {
                    this.recommendUsers = response.data
                });
        }
    },

    mounted() {
        this.getRecommendUsers();
    }
}
</script>
