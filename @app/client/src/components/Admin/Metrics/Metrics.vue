<template>
    <div class="max-w">
        <div class="py-4">
            <h1 class="text-4xl pb-4">Metrics for {{ assignmentName }}</h1>
        </div>
        <div class="bg-secondary rounded-sm overflow-hidden">
            <BarGraph />
        </div>
        <div class="flex flex-row py-4 w-full justify-between gap-4">
            <Gauge title="Early Submission" :part="earlycount" :total="totalcount" allGreen />
            <Gauge title="On-time Submission" :part="ontimecount" :total="totalcount" />
            <Gauge title="Late Submission" :part="latecount" :total="totalcount" allRed/>
            <Gauge title="No Submission" :part="nosubmissioncount" :total="totalcount" allRed/>

        </div>
        <div class="flex flex-row pb-4 w-full justify-between gap-4">
            <Counter title="Avg. Grade (Submitted Students)" :maindisplay="avgsubmitted"/>
            <Counter title="Avg. Grade (All Students)" :maindisplay="avgall"/>
        </div>
        <div>
            <p><strong>Early Submission:</strong> Submitted before the deadline and received full credit.</p>
            <p><strong>On-Time Submission:</strong> Submitted on the due date for full or patrial credit or before the due date but received partial credit.</p>
            <p><strong>Late Submission:</strong> Submitted after the due date.</p>
        </div>
    </div>
</template>

<script lang="ts">
import { useMetricsStore } from '../../../store/metrics';
import BarGraph from './BarGraph.vue';
import Gauge from './Gauge.vue';
import Counter from './Counter.vue'


    export default {
        components: {
            BarGraph,
            Gauge,
            Counter,
        },
        data() {
            return {
                store: useMetricsStore()
            }
        },
        computed: {
            assignmentName(): string {
                if (!this.store.currentassignment?.name) return ''
                return this.store.currentassignment.name!
            },
            totalcount(): number {
                return this.store.totalcount
            },
            earlycount(): number {
                return this.store.earlycount
            },
            ontimecount(): number {
                return this.store.ontimecount
            },
            latecount(): number {
                return this.store.latecount
            },
            nosubmissioncount(): number {
                return this.store.nosubmissioncount
            },
            avgsubmitted(): string {
                const avgsubmittednum = (this.store.AverageGradeStats.avgsubmitted * 100).toFixed(2)
                return `${avgsubmittednum}%`
            },
            avgall(): string {
                const avgsubmittednum = (this.store.AverageGradeStats.avgall * 100).toFixed(2)
                return `${avgsubmittednum}%`
            }
        },
        methods: {
            async retrieveGaugeData() {
                this.store.requestSubmissionStatGauge()
            },
            async retrieveAvgData() {
                this.store.requestAvgGrades()
            }
        },
        mounted() {
            this.retrieveGaugeData()
            this.retrieveAvgData()
        },
        watch: {
            'store.id': async function (newVal) {
                if (newVal) {
                    await this.retrieveGaugeData()
                    await this.retrieveAvgData()
                }
            }
        }
    }
</script>


<style scoped>
    .max-w {
        max-width: 820px;
    }
</style>