<template>
    <div class="h-48 w-48 bg-secondary rounded-sm flex flex-col">
        <div class="flex-80 flex justify-center items-center">
            <div 
                class="h-85 square rounded-full bg-primary flex items-center justify-center"
                :style="{
                    background: `conic-gradient(${fillColor} ${percentage}%, var(--color-primary) ${percentage}% 100%)`
                }"
            >
                <div class="h-4/5 square rounded-full bg-secondary flex items-center justify-center">
                    <div>
                        <div class="flex items-baseline space-x-1">
                            <h1 class="text-3xl font-bold">{{ part }}</h1>
                            <p class="text-xs">/{{ total }}</p>
                        </div>
                        <div>
                            <p class="text-xs text-center"> {{ percentage }}% </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-20 flex items-center justify-center">
            {{ title }}
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: {    
        part: Number,
        total: Number,
        title: String,
        negation: {
            type: Boolean,
            default: false
        },
        allGreen: {
            type: Boolean,
            default: false
        },
        allRed: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            maxPercentage: 0,
            percentage: 0
        };
    },
    computed: {
        fillColor() {
            if (this.allGreen) return "var(--color-success)"
            if (this.allRed) return "var(--color-danger)"
            if (this.percentage <= 33) return this.negation ? "var(--color-success)" : "var(--color-danger)";
            if (this.percentage <= 66) return this.negation ? "var(--color-warning)": "var(--color-warning)";
            return this.negation ? "var(--color-danger)" : "var(--color-success)";
        }
    },
    methods: {
        computePercentage() {
            return this.total! > 0 ? Math.floor((this.part! / this.total!) * 100) : 0;
        },
        calculateColor() {
            this.maxPercentage = this.computePercentage();
            this.percentage = 0
            const interval = setInterval(() => {
                if (this.percentage < this.maxPercentage) {
                    this.percentage += 1;
                } else {
                    clearInterval(interval);
                }
            }, 10);
        }
    },
    mounted() {
        this.calculateColor()
    },
    watch: {
        part () {
            this.calculateColor()
        },
        total () {
            this.calculateColor()
        }
    }
};
</script>

<style scoped>
.flex-80 {
    flex: 80
}

.flex-20 {
    flex: 20
}

.h-85 {
    height: 85%
}


.square {
    aspect-ratio: 1/1;
}
</style>