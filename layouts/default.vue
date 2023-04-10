<template>
    <div id="app">
        <header-vue />

        <pop />

        <section class="flex">
            <aside class="left-side"></aside>

            <Nuxt />

            <rankings />
        </section>

        <footer-vue />
    </div>

</template>
<script>
import HeaderVue from "../components/HeaderVue";
import FooterVue from "../components/FooterVue";
export default {
    head() {
        return {
            link: [
            ],
        }
    },

    components: {
        FooterVue,
        HeaderVue
    },

    methods:{

    },

    mounted() {
        this.$store.commit("init");
    }
}
</script>
