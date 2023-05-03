<template>
    <footer>
        <div class="wrapper">
            <h2><nuxt-link to="/"><img src="/images/img_footer_logo.png"></nuxt-link></h2>
            <ul>
                <li><a href="" @click.prevent="ready">회사소개</a></li>
                <li><a href="" @click.prevent="ready">이용약관</a></li>
                <li><a href="" @click.prevent="ready">제휴제안</a></li>
            </ul>
        </div>
        <div class="footer-fixed">
            <ul>
                <li class="fixed-01"><a href="#" @click.prevent="top">상단으로</a></li>
                <li class="fixed-02"><a href="#" @click.prevent="ready">채팅</a></li>
                <li class="fixed-03">
                    <a href="#" @click.prevent="toggleRanking">
                        <i class="xi-equalizer"></i>
                    </a>
                </li>
            </ul>
        </div>
    </footer>
</template>
<script>
export default {
    methods: {
        top() {
            window.scrollTo({top:0});
        },

        ready(){
            alert("준비중입니다.");
        },

        toggleRanking(){
            $(".ranking-box").toggleClass("active");
        }
    }
}
</script>
