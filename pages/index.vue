<template>
    <div></div>
</template>

<script>
import Sitemap from "../data/sitemap";

export default {
    data() {
        return {
            sitemap: Sitemap,
        }
    },
    mounted(){
        let node = this.sitemap[0];

        this.$store.commit('setPageTitle',node.title);
        this.$store.commit('setPageDescription',node.description);

        this.$router.replace(node.path);
    }
}
</script>
