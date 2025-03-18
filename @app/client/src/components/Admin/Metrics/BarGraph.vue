<template>
    <div>
        <div class="flex items-end relative w-full h-96 px-8 py-6">
            <!-- Y-Axis -->
            <div class="absolute left-5 bottom-10 flex flex-col justify-between h-full">
                <div v-for="tick in yTicks" :key="tick" class="text-xs text-accent">{{ tick }}</div>
            </div>

            <!-- Bars Container -->
            <div class="flex justify-between flex-grow h-full ml-6">
                <div
                    v-for="(day, index) in data"
                    :key="index"
                    class="flex flex-col-reverse w-10 items-center relative h-full"
                >
                    <!-- X-Axis Label -->
                    <div class="text-xs mt-2">{{ day.date }}</div>
                
                    <!-- Stacked Bar -->
                    <div
                        v-for="(cat, catindex) in categories"
                        :key="catindex"
                        class="w-full transition-all cursor-pointer"
                        :class="colors[catindex]"
                        :style="{ height: day[cat] > 0 ? (day[cat] / maxTotal) * 100 + '%' : '1px'}"
                        @mouseenter="showTooltip($event, cat, day[cat])"
                        @mouseleave="hideTooltip"
                    />
                </div>
            </div>

            <!-- Tooltip -->
            <div
                v-if="tooltip.visible"
                class="absolute bg-black text-white text-sm py-1 px-2 rounded-lg pointer-events-none"
                :style="{ left: tooltip.x - 350 + 'px', top: tooltip.y - 180 + 'px' }"
            >
                <strong>{{ tooltip.category }}</strong>: {{ tooltip.value }}
            </div>
        </div>
        <div class="flex flex-row justify-between px-4 pb-3">
            <div class="flex items-center">
                Full, partial, and no credit submission rates
            </div>
            <div class="flex flex-row h-12 gap-4">
                <div class="w-10 h-4/5 bg-primary-alt rounded-sm cursor-pointer flex items-center justify-center" @click="prevRange">
                    <
                </div>
                <div class="w-10 h-4/5 bg-primary-alt rounded-sm cursor-pointer flex items-center justify-center" @click="nextRange" :class="{ 'opacity-50 cursor-not-allowed': isMaxDateReached }" :disable="isMaxDateReached">
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { SubmissionStatTime, SubmissionStatTimeDTO } from '@autograder/shared'
import { useMetricsStore } from '../../../store/metrics'

    export default {
        data() {
            return {
                data: [],
                categories: ["Full", "Partial", "No"],
                colors: ["bg-green-500", "bg-blue-500", "bg-red-500"],
                tooltip: {visible: false, x: 0, y: 0, category: "", value: 0},
                currentdate: new Date(),
                rangesize: 10,
                store: useMetricsStore()
            }
        },
        computed: {
            maxTotal() {
                return this.data.length ? Math.max(...this.data.map(d => d["Full"] + d["Partial"] + d["No"])) * 2: 100
            },
            yTicks() {
                const step = Math.ceil(this.maxTotal /5)
                return Array.from({ length: 6 }, (_, i) => i * step).reverse()
            },
            rangeStart() {
                return this.formatDate(this.getDateOffset(-this.rangesize + 1))
            },
            rangeEnd() {
                return this.formatDate(this.getDateOffset(0))
            },
            isMaxDateReached() {
                const currentdatestr = this.currentdate.toISOString().split("T")[0]
                const todaystr = new Date().toISOString().split("T")[0]
                return currentdatestr >= todaystr
            }
        },
        methods: {
            async generateData() {
                if (!this.store.id) return;

                const startDate = Math.floor(this.getDateOffset(-this.rangesize + 1).getTime());
                const endDate = Math.floor(this.getDateOffset(0).getTime());

                try {
                    await this.store.requestSubmissionStatTime(startDate, endDate);
                    if (!this.store.TimeStats) return;

                    // Generate all expected dates
                    const expectedDates = this.getPastDates(this.rangesize);
                    
                    // Convert API response into a map for quick lookup
                    const statsMap = new Map<number, SubmissionStatTimeDTO>(
                        this.store.TimeStats.map(stat => [new Date(stat.DTO.date).getTime(), stat.DTO])
                    );
                    console.log(statsMap)

                    // Ensure all expected dates exist, filling in missing ones with zeros
                    this.data = expectedDates.map(dateStr => {
                        console.log('Date string:', dateStr);

                        // Get the correct year from the expected date range
                        const currentYear = new Date(this.currentdate).getFullYear();

                        // Append the correct year to the formatted date
                        const fullDateStr = `${dateStr}, ${currentYear}`;
                        console.log('Full date string:', fullDateStr);

                        // Convert back to Date object
                        const dateObj = new Date(fullDateStr);
                        const timestamp = Math.floor(dateObj.getTime());
                        console.log('Timestamp:', timestamp);

                        const stat = statsMap.get(timestamp);
                        return {
                            date: dateStr, // Keep the original display format
                            "Full": stat ? stat.fullcredit : 0,
                            "Partial": stat ? stat.partialcredit : 0,
                            "No": stat ? stat.nocredit : 0
                        };
                    });


                } catch (error) {
                    console.error("Error fetching submission stats:", error);
                }
            },
            getPastDates(days) {
                return [...Array(days)].map((_, i) => this.formatDate(this.getDateOffset(-days + 1 + i)))
            },
            getDateOffset(offset: number) {
                const date = new Date(this.currentdate)
                date.setDate(date.getDate() + offset)
                return date
            },
            formatDate(date) {
                return date.toLocaleDateString("en-US", { month: "short", day: "numeric"})
            },
            prevRange() {
                this.currentdate = new Date(this.currentdate.getTime() - this.rangesize * 24 * 60 * 60 * 1000);
                this.generateData()
            },
            nextRange() {
                const today = new Date()
                const nextdate = new Date(this.currentdate.getTime() + this.rangesize * 24 * 60 * 60 * 1000)

                if (nextdate <= today) {
                    this.currentdate = nextdate
                    this.generateData()
                }
            },
            showTooltip(event, category, value) {
                this.tooltip = {
                    visible: true,
                    x: event.clientX + 10,
                    y: event.clientY + 10,
                    category,
                    value
                }
            },
            hideTooltip() {
                this.tooltip.visible = false
            }

        },
        mounted() {
            this.generateData()
        },
        watch: {
            'store.id': async function (newVal) {
                if (newVal) {
                    await this.generateData();
                }
            }
        }
    }
</script>