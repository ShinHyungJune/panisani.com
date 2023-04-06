<template>
    <aside class="right-side">
        <div class="ranking-box">
            <div class="ranking-tab">
                <ul>
                    <li :class="activeIndex == 0 ? 'active' : ''" @click="activeIndex = 0"><a href="" @click.prevent="">TOP 10</a></li>
                    <li :class="activeIndex == 1 ? 'active' : ''" @click="activeIndex = 1"><a href="" @click.prevent="">TOP 20</a></li>
                </ul>
            </div>
            <div class="ranking-list">
                <ul>
                    <li v-for="(ranking, index) in rankings.data" :key="ranking.id" v-if="index >= (activeIndex * 10) && index < (activeIndex * 10 + 10)">
                        <nuxt-link :to="`/searches?word=${ranking.title}`">
                            <b>{{ index + 1}}</b>
                            <p>{{ ranking.title }}</p>
                            <sub class="" v-if="ranking.new">new</sub>
                            <sub class="" v-else-if="ranking.diff == 0">-</sub>
                            <sub class="up" v-else-if="ranking.diff > 0">{{Math.abs(ranking.diff)}}</sub>
                            <sub class="down" v-else>{{Math.abs(ranking.diff)}}</sub>
                        </nuxt-link>
                    </li>
                </ul>
            </div>
            <!--
            <time>2023.00.00 04:00 PM</time>
            -->
        </div>
        <!--
        <div class="aside-banner-box">
            <a href=""><img src="/images/img_banner.png"></a>
        </div>
        -->
    </aside>
</template>
<style>

</style>
<script>
export default {
    data(){
        return {
            rankings: {
                data: [],
                meta: {

                }
            },
            activeIndex: 0,
        }
    },

    computed: {

    },

    methods: {
        getRankings() {
            this.$axios.get("/api/searchRankings")
                .then(response => {
                    this.rankings = response.data;
                })
        }
    },

    mounted() {
        this.getRankings();
    }

}
</script>
