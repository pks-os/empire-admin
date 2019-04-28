<template>
    <div class="gauge" :class="'gauge-' + type">
        <div class="row no-gutters">
            <div class="col text-center">
                <i class="fas" :class="'fa-' + icon"></i>
                <p v-html="title"></p>
            </div>
            <div class="col text-center">
                <h4 v-html="content"></h4>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Gauge",
        props: [
            'type',
            'icon',
            'title',
            'content'
        ]
    }
</script>