<template>
    <div class="flex w-28 h-full items-center px-2">
        <div
            class="w-1/4 flex items-center justify-center cursor-pointer bg-primary-alt rounded-md h-1/2"
            @click="decrement"
            @mousedown="decrementfast"
            @mouseup="clear"
        >
            -
        </div>
        <div class="w-1/2 flex items-center justify-center">
            {{ gracedays }}
        </div>
        <div
            class="w-1/4 flex items-center justify-center cursor-pointer bg-primary-alt rounded-md h-1/2"
            @click="increment"
            @mousedown="incrementfast"
            @mouseup="clear"
        >
           +
        </div>
    </div>
</template>

<script lang="ts">
    import { useScoresStore } from '../../../../../store/scores';
    export default {
        props: {
            alias: {
                type: String
            }
        },
        data() {
            return {
                interval: null as null | any,
                intervalTime: 150,
                store: useScoresStore()
            }
        },
        computed: {
            gracedays: {
                get() {
                    const gracedays = this.store.getgracedays(this.alias!)
                    return gracedays ? gracedays : 0
                },
                set(value: number) {
                    this.store.setgracedays(this.alias!, value)
                }
            }
        },
        methods: {
            increment() {
                this.gracedays++
            },
            incrementfast() {
                this.clear()
                this.interval = setInterval(this.increment, this.intervalTime)
            },
            decrement() {
                if (this.gracedays > 0) {
                    this.gracedays--
                }
            },
            decrementfast() {
                this.clear()
                this.interval = setInterval(this.decrement, this.intervalTime)
            },
            clear() {
                clearInterval(this.interval)
            }
        }
    }
</script>