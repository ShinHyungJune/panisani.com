<template>
    <div class="cate-tab-box mt24 mt-lg-15">
        <ul>
            <li :class="className('/mypage/subscriptions')">
                <nuxt-link to="/mypage/subscriptions">구독</nuxt-link>
            </li>
            <li :class="className('/mypage/scraps')">
                <nuxt-link to="/mypage/scraps">스크랩 한 글</nuxt-link>
            </li>
            <li :class="className('/mypage/posts')">
                <nuxt-link to="/mypage/posts">내가 쓴 글</nuxt-link>
            </li>
            <li :class="className('/mypage/communities')">
                <nuxt-link to="/mypage/communities">운영 커뮤니티</nuxt-link>
            </li>
            <li :class="className('/mypage/edit')">
                <nuxt-link to="/mypage/edit">내 정보</nuxt-link>
            </li>
            <li :class="className('/mypage/qnas')">
                <nuxt-link to="/mypage/qnas">문의 내역</nuxt-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    methods: {
        className(url){
            const currentPath = this.$route.path;

            return currentPath.startsWith(url) ? 'active' : ''
        }
    },


    mounted() {

    }
}
</script>
