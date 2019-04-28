<template>
    <section class="main-section dashboard">
        <b-row>
            <b-col cols="6" md="3">
                <gauge type="success" icon="check" title="Total<br>Success" content="15"></gauge>
            </b-col>
            <b-col cols="6" md="3">
                <gauge type="primary" icon="bell" title="Total<br>Explosions" content="23"></gauge>
            </b-col>
            <b-col cols="6" md="3">
                <gauge type="info" icon="exclamation-triangle" title="Total<br>Stuns" content="2"></gauge>
            </b-col>
            <b-col cols="6" md="3">
                <gauge type="warning" icon="exclamation-circle" title="Total<br>Roro" content="1"></gauge>
            </b-col>
        </b-row>

        <b-row class="mt-3">
            <b-col md="6" lg="8">
                <b-card>
                    <div slot="header">
                        <h4 class="card-title">Rebel Activities</h4>
                        <h6 class="card-subtitle">Rebel nuisance by date</h6>

                        <div class="actions">
                            <span class="date-picker-action">{{ new Date() | moment("subtract", "7 days","MMM Do, YYYY") }} - {{ new Date() | moment("MMM Do, YYYY") }}</span>
                            <b-dropdown variant="white btn-circle no-caret" right>
                                <template slot="button-content">
                                    <i class="fal fa-filter"></i>
                                </template>
                                <b-dropdown-header>Actions</b-dropdown-header>
                                <b-dropdown-item>This Week</b-dropdown-item>
                                <b-dropdown-item>Last Week</b-dropdown-item>
                                <b-dropdown-item>This Month</b-dropdown-item>
                                <b-dropdown-divider></b-dropdown-divider>
                                <b-dropdown-item @click="fillData">Randomize Data</b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>

                    <div class="widget">
                        <line-chart :chart-data="lineChartData" :height="240" v-if="lineChartData !== null"></line-chart>
                        <footer>
                            <b-row>
                                <b-col v-for="(item,index) in dataSets" :key="item.label" cols="6" md="3">
                                    <chart-legend-item @click.native="switchData(index)" :dataset="item" :delta-percentage="getRandomInt(1) % 2 === 0 || index === 3"></chart-legend-item>
                                </b-col>
                            </b-row>
                        </footer>
                    </div>
                </b-card>
            </b-col>
            <b-col md="6" lg="4">
                <b-card>
                    <div slot="header">
                        <h4 class="card-title">Empire Influence</h4>
                        <h6 class="card-subtitle">Political Influence by Planet</h6>
                        <div class="actions">
                            <span class="date-picker-action">{{ new Date() | moment("subtract", "7 days","MMM Do, YYYY") }} - {{ new Date() | moment("MMM Do, YYYY") }}</span>
                        </div>
                    </div>
                    <div class="widget">
                        <div class="progress-item" v-for="(influence,key) in empireInfluence" v-bind:key="key">
                            <header class="clearfix">
                                <div class="float-left">{{ influence[0] }} <small>({{ influence[1] }})</small></div>
                                <div class="float-right">{{ influence[2] }}%</div>
                            </header>
                            <b-progress :max="100">
                                <b-progress-bar :variant="'primary gradient-' + influence[3]" :value="influence[2]"></b-progress-bar>
                            </b-progress>
                        </div>
                    </div>
                </b-card>
            </b-col>

            <b-col md="6" lg="8">
                <b-card>
                    <div slot="header">
                        <h4 class="card-title">Order 66 Flow</h4>
                        <h6 class="card-subtitle">Who is killed, who remains at large</h6>

                        <div class="actions">
                            <span class="date-picker-action">{{ new Date() | moment("subtract", "7 days","MMM Do, YYYY") }} - {{ new Date() | moment("MMM Do, YYYY") }}</span>
                            <b-dropdown variant="white btn-circle no-caret" right>
                                <template slot="button-content">
                                    <i class="fal fa-filter"></i>
                                </template>
                                <b-dropdown-header>Actions</b-dropdown-header>
                                <b-dropdown-item>Punch it, Chewie!</b-dropdown-item>
                                <b-dropdown-item>You said it, Chewie...</b-dropdown-item>
                                <b-dropdown-item>Lorem ipsum, chewie</b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>

                    <div class="widget" v-bar="{useScrollbarPseudo:true}">
                        <b-table striped responsive hover :items="order66Flow" :fields="order66FlowFields">
                            <template slot="status" slot-scope="row"><b-badge :variant="row.item.statusTheme">{{row.value}}</b-badge></template>
                            <template slot="priority" slot-scope="row"><span :class="'text-' + row.item.statusTheme">{{row.value}}</span></template>
                            <template slot="actions" slot-scope="row" class="text-right">
                                <b-dropdown variant="white btn-circle no-caret" right>
                                    <template slot="button-content">
                                        <i class="fal fa-th"></i>
                                    </template>
                                    <b-dropdown-header>Actions</b-dropdown-header>
                                    <b-dropdown-item>Punch it, Chewie!</b-dropdown-item>
                                    <b-dropdown-item>You said it, Chewie...</b-dropdown-item>
                                    <b-dropdown-item>Lorem ipsum, chewie</b-dropdown-item>
                                </b-dropdown>
                            </template>
                        </b-table>
                    </div>
                </b-card>
            </b-col>
            <b-col md="6" lg="4">
                <b-card>
                    <div slot="header">
                        <h4 class="card-title">Darth Sidious Powers</h4>
                        <h6 class="card-subtitle">Emperor's most favourite force powers</h6>
                    </div>
                    <div class="widget">
                        <pie-chart :chart-data="pieChartData" :height="300" v-if="pieChartData !== null"></pie-chart>
                    </div>
                </b-card>
            </b-col>

            <b-col md="6" lg="8">
                <b-card no-body>
                    <b-tabs pills card vertical>
                        <b-tab title="Today" active>
                            <div class="widget" v-bar="{useScrollbarPseudo: true}">
                                <b-table striped responsive hover :items="order66Flow" :fields="order66FlowFields">
                                    <template slot="status" slot-scope="row"><b-badge :variant="row.item.statusTheme">{{row.value}}</b-badge></template>
                                    <template slot="priority" slot-scope="row"><span :class="'text-' + row.item.statusTheme">{{row.value}}</span></template>
                                    <template slot="actions" slot-scope="row" class="text-right">
                                        <b-dropdown variant="white btn-circle no-caret" right>
                                            <template slot="button-content">
                                                <i class="fal fa-th"></i>
                                            </template>
                                            <b-dropdown-header>Actions</b-dropdown-header>
                                            <b-dropdown-item>Punch it, Chewie!</b-dropdown-item>
                                            <b-dropdown-item>You said it, Chewie...</b-dropdown-item>
                                            <b-dropdown-item>Lorem ipsum, chewie</b-dropdown-item>
                                        </b-dropdown>
                                    </template>
                                </b-table>
                            </div>
                        </b-tab>
                        <b-tab title="This Week">
                            <div class="widget">

                            </div>
                        </b-tab>
                        <b-tab title="This Month">
                            <div class="widget"></div>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-col>
            <b-col md="6" lg="4">
                <b-card no-body>
                    <b-tabs pills card>
                        <b-tab active>
                            <template slot="title">Inbox <span class="badge badge-warning">5</span></template>

                            <div class="widget h-tab-widget" v-bar="{useScrollbarPseudo: true}">
                                <ul class="list-unstyled">
                                    <b-media tag="li" class="cursor-pointer mb-3" v-for="message in inbox" :key="message.from">
                                        <img slot="aside" width="64" height="64" :src="message.avatar" class="rounded">

                                        <div class="row">
                                            <div class="col">
                                                <p class="mb-0"><strong>{{ message.from }}</strong></p>
                                                <p class="mb-0">{{ message.message }}</p>
                                                <p class="mb-0" :class="'text-' + message.more.color"><strong>{{ message.more.text }}</strong></p>
                                            </div>
                                            <div class="col-auto">
                                                <b-button variant="warning text-white btn-circle mt-3"><i class="fal fa-envelope"></i></b-button>
                                            </div>
                                        </div>
                                    </b-media>
                                </ul>
                            </div>
                        </b-tab>
                        <b-tab title="Missions">
                            <div class="widget h-tab-widget">

                            </div>
                        </b-tab>
                        <b-tab title="Jedi Training">
                            <div class="widget h-tab-widget"></div>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-col>
        </b-row>
    </section>
</template>

<script>
import Gauge from "../components/Gauge";
import LineChart from "../components/charts/line-chart";
import ChartLegendItem from "../components/charts/chart-legend-item";
import PieChart from "../components/charts/pie-chart";

export default {
    components: {
        PieChart,
        ChartLegendItem,
        LineChart,
        Gauge
    },
    meta: {
        asd: 123
    },
    data() {
        return {
            point: {
                backgroundColor: 'transparent'
            },
            lineChartData: null,
            pieChartData: null,
            dataSets: [],
            empireInfluence: [
                ["Corescant",1873,100,"lime"],
                ["Degobah",3,24,"pink-purple"],
                ["Tattooine",48,8,"sunset"],
                ["Dantooine",10,42,"success"],
                ["Scarrif",25,66,"peach"],
                ["Endor",12,12,"sunset"],
                ["Yonder",9999,98,"success"],
            ],
            showLineData: 0,

            order66FlowFields: ['target', 'status', 'status', 'lastSeenIn', 'lastSeenWith', 'priority', {
                key: 'actions',
                class: 'text-right'
            }],
            order66Flow: [
                {
                    target: "Master Yoda",
                    status: "On The Run",
                    lastSeenIn: "Galactic Senate",
                    lastSeenWith: "Emperor Sheeve Palpatine",
                    priority: 'Critical',
                    statusTheme: 'warning',
                    _cellVariants: { target: 'text-success', priority: 'text-danger' }
                },
                {
                    target: "Obi-wan Kenobi",
                    status: "On The Run",
                    lastSeenIn: "Mustafar System",
                    lastSeenWith: "Darth Vader",
                    statusTheme: 'warning',
                    priority: 'Critical',
                    _cellVariants: { target: 'text-primary', priority: 'text-danger' }
                },
                {
                    target: "Master Plo Koon",
                    status: "Killed",
                    statusTheme: "success",
                    lastSeenIn: "Cato Neimoidia",
                    lastSeenWith: "-",
                    priority: 'Case Closed',
                    _cellVariants: { target: 'text-primary', priority: 'text-danger' }
                },
                {
                    target: "Mace Windu",
                    status: "Killed",
                    statusTheme: "purple",
                    lastSeenIn: "Corescant",
                    lastSeenWith: "Emperor Sheeve Palpatine",
                    priority: 'Case Closed',
                    _cellVariants: { target: 'text-purple', priority: 'text-danger' }
                },
                {
                    target: "Aayla Secura",
                    status: "Killed",
                    statusTheme: "success",
                    lastSeenIn: "Felucia",
                    lastSeenWith: "-",
                    priority: 'Case Closed',
                    _cellVariants: { target: 'text-primary', priority: 'text-danger' }
                },
                {
                    target: "Master Yoda",
                    status: "On The Run",
                    lastSeenIn: "Galactic Senate",
                    lastSeenWith: "Emperor Sheeve Palpatine",
                    priority: 'Critical',
                    statusTheme: 'info',
                    _cellVariants: { target: 'text-success', priority: 'text-danger' }
                },
                {
                    target: "Mace Windu",
                    status: "Killed",
                    statusTheme: "danger",
                    lastSeenIn: "Corescant",
                    lastSeenWith: "Emperor Sheeve Palpatine",
                    priority: 'Case Closed',
                    _cellVariants: { target: 'text-purple', priority: 'text-danger' }
                },
                {
                    target: "Obi-wan Kenobi",
                    status: "On The Run",
                    lastSeenIn: "Mustafar System",
                    lastSeenWith: "Darth Vader",
                    statusTheme: 'warning',
                    priority: 'Critical',
                    _cellVariants: { target: 'text-primary', priority: 'text-danger' }
                },
                {
                    target: "Master Plo Koon",
                    status: "Killed",
                    statusTheme: "success",
                    lastSeenIn: "Cato Neimoidia",
                    lastSeenWith: "-",
                    priority: 'Case Closed',
                    _cellVariants: { target: 'text-primary', priority: 'text-danger' }
                },
                {
                    target: "Aayla Secura",
                    status: "Killed",
                    statusTheme: "primary",
                    lastSeenIn: "Felucia",
                    lastSeenWith: "-",
                    priority: 'Case Closed',
                    _cellVariants: { target: 'text-primary', priority: 'text-danger' }
                },
            ],

            inbox: [
                {
                    from: 'Han Solo',
                    avatar: require('../assets/img/avatar/han.png'),
                    message: 'I take orders from only one person: ME!',
                    more: {text: '5 more messages', color: 'success'}
                },
                {
                    from: 'Leia Organa',
                    avatar: require('../assets/img/avatar/leia.png'),
                    message: 'Have you heard from Han?',
                    more: {text: 'Last seen: yesterday', color: 'muted'}
                },
                {
                    from: 'Darth Vader',
                    avatar: require('../assets/img/avatar/vader.png'),
                    message: 'Son, come to the dark side ASAP, thx',
                    more: {text: 'Last seen: two days ago', color: 'muted'}
                },
                {
                    from: 'Emperor',
                    avatar: require('../assets/img/avatar/palpatine.png'),
                    message: 'Good, good, use the anger, strike me down!',
                    more: {text: 'Last seen: two days ago', color: 'muted'}
                },
            ]
        }
    },
    mounted () {
        this.fillData();
    },
    methods: {
        fillData() {
            this.dataSets = [
                {
                    label: 'Apprehensions',
                    borderColor: "transparent",
                    pointRadius: 3,
                    preset: 'primary',
                    data: [this.getRandomInt(20), this.getRandomInt(10), this.getRandomInt(5), this.getRandomInt(7), this.getRandomInt(9), this.getRandomInt(5), this.getRandomInt(15)]
                },
                {
                    label: 'Eliminations',
                    borderColor: "transparent",
                    pointRadius: 3,
                    preset: 'danger',
                    data: [this.getRandomInt(3), this.getRandomInt(8), this.getRandomInt(23), this.getRandomInt(13), this.getRandomInt(32), this.getRandomInt(14), this.getRandomInt(21)]
                },
                {
                    label: 'Rebel Scummings',
                    borderColor: "transparent",
                    pointRadius: 3,
                    preset: 'info',
                    data: [this.getRandomInt(6), this.getRandomInt(21), this.getRandomInt(34), this.getRandomInt(3), this.getRandomInt(13), this.getRandomInt(24), this.getRandomInt(11)]
                },
                {
                    label: 'Balance in Galaxy',
                    borderColor: "transparent",
                    pointRadius: 3,
                    preset: 'success',
                    data: [this.getRandomInt(0), this.getRandomInt(5), this.getRandomInt(10), this.getRandomInt(15), this.getRandomInt(20), this.getRandomInt(200), this.getRandomInt(200)]
                }
            ];

            this.lineChartData = {
                labels: ['January W1', 'January W2', 'January W3', 'January W4', 'February W1', 'February W2', 'February W3'],
                datasets: [this.dataSets[this.showLineData]]
            };

            this.pieChartData = {
                datasets: [{
                    data: [this.getRandomInt(20),this.getRandomInt(20),this.getRandomInt(20),this.getRandomInt(20),this.getRandomInt(20)],
                    presets: ['primary','danger','info','success','warning']
                }],
                labels: [
                    'Force Lightning',
                    'Force Laugh',
                    'Force Confidence',
                    'Force Senate',
                    'Force Fart'
                ]
            };
        },
        getRandomInt (min) {
            return Math.floor(Math.random() * (200 - min)) + min
        },
        switchData(key){
            this.showLineData = key;
            this.fillData();
        }
    }
}
</script>