<template>
    <div class="border-2 border-secondary">
        <div class="flex items-center justify-between flex-row h-20 cursor-pointer bg-primary px-8" @click="toggle">
            <div class="w-1/2 flex items-center  h-full">
                <div class="pr-8">
                    <LargeWaiting    v-if="isWaiting"/>
                    <LargeProgress   v-else-if="isProgress"/>
                    <LargeSuccess    v-else-if="isSuccess"/>
                    <LargeFailed    v-else />
                </div>
                <div>{{ title }}</div>
            </div>
            <div class="w-1/2 h-full flex">
                <div class="flex-grow w-28 h-full flex items-center"> {{ earnedscore }} / {{ totalscore }}</div>
                <div class="flex-grow h-full flex flex-col justify-around ">
                    <div class="flex flex-row h-1/2 items-center pt-2">
                        <div class="flex items-center justify-center w-4">
                            <Calendar />
                        </div>
                        <div class="pl-4 max-h-6 max-w-1/2 overflow-hidden">{{ submissiontime }}</div>
                    </div>
                    <div class="flex flex-row h-1/2 items-center pb-2">
                        <div class="flex items-center justify-center w-4">
                            <Clock />
                        </div>
                        <div class="pl-4 italic"> {{ duration }} ms</div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="bg-secondary py-1"
            v-show="showDetails"
            v-if="showtasks"

        >
            <div 
                v-for="(task, index) in tasks"
                :key="index"
                class="bg-secondary px-8 py-2 flex flex-row items-center justify-between font-mono"
            >
                <div class="flex w-1/2 items-center">
                    <div class="pr-8">
                        <SmallWaiting v-if="task.status == 'WAITING'" />
                        <SmallProgress v-else-if="task.status == 'PROGRESS'" />
                        <SmallSuccess  v-else-if="task.status == 'SUCCESS'" />
                        <SmallFailed   v-else-if="task.status == 'FAILED'" />
                    </div>
                    <div>{{  task.title  }}</div>
                </div>
                <div class="w-1/4"> {{ task.scoreEarned }} /{{  task.scoreTotal }} </div>
                <div class="w-1/4"> {{ task.notes  }}</div>
                
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { SubmissionDTO } from '@autograder/shared'
import { PropType } from 'vue'
import LargeWaiting from '../Icons/Large/Waiting.vue'
import LargeProgress from '../Icons/Large/Progress.vue'
import LargeSuccess from '../Icons/Large/Success.vue'
import LargeFailed from '../Icons/Large/Failed.vue'

import SmallWaiting from '../Icons/Small/Waiting.vue'
import SmallProgress from '../Icons/Small/Progress.vue'
import SmallSuccess from '../Icons/Small/Success.vue'
import SmallFailed from '../Icons/Small/Failed.vue'

import Calendar from '../Icons/Calendar.vue'
import Clock from '../Icons/Clock.vue'

    export default {
        components: {
            LargeWaiting,
            LargeProgress,
            LargeSuccess,
            LargeFailed,

            SmallWaiting,
            SmallProgress,
            SmallSuccess,
            SmallFailed,
            Calendar,
            Clock
        },
        props: {
            submission: {
                type: Object as PropType<SubmissionDTO>,
                required: true
            }
        },
        data() {
            return {
                showDetails: false,
                endStatus: ['SUCCESS', 'FAILED']
            }
        },
        computed: {
            status() {
                return this.submission.status
            },
            isWaiting() {
                return this.status === 'WAITING'
            },
            isSuccess() {
                return this.status === 'SUCCESS'
            },
            isProgress() {
                return this.status === 'PROGRESS'
            },
            isFailed() {
                return this.status === 'FAILED'
            },
            tasks() {
                return this.submission.tasks
            },
            title() {
                return this.submission.title
            },
            earnedscore() {
                return this.submission.scoreEarned
            },
            totalscore() {
                return this.submission.scoreTotal
            },
            showtasks() {
                return this.submission.tasks.length > 0
            },
            submissiontime() {
                return new Date(this.submission.submissionTime).toUTCString()
            },
            duration() {
                return this.submission.duration
            }
        },
        methods: {
            toggle() {
                this.showDetails = !this.showDetails
            }
        },
        watch: {
            submission: {
                handler() {},
                deep: true,
                immediate: true
            }
        }
    }
</script>