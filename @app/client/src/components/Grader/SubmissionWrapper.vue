<template>
    <div>
        <div>
            <div class="flex justify-between items-center h-13 mb-10">
                <div class="text-4xl">
                    {{ assignmentName }}
                </div>
                <div
                    class="p-4 rounded-md w-auto"
                    :class="blockNewSubmissions ? 'bg-secondary-alt' : 'bg-success cursor-pointer'"
                    @click="createNewSubmission"
                    @keydown.enter="createNewSubmission"
                    tabindex="0"
                >
                    New Submission
                </div>
            </div>
        </div>
        <div class="h-96 min-h-96">
            <div class="h-24 flex items-center justify-between bg-secondary border-secondary border-2 px-8 font-mono">
                <div>
                    <div>
                        Attempts Remaining: {{ attemptsremaining }}
                    </div>
                    <div>
                        Best Score: {{ bestscore }}
                    </div>
                </div>
                <div>
                    <div>
                        Due Date:  {{ formattedDueDate }}
                    </div>
                    <div v-if="showOpenDate">
                        Open Date: {{ formattedOpenDate }}
                    </div>
                    <div v-else>
                        Close Date: {{ formattedCloseDate }}
                    </div>
                </div>
            </div>
            <div
                class="h-full overflow-y-auto border-secondary border-2 scrollbar"
                v-if="showSubmissions"
            >
                <div v-for="(submission, index) in submissions">
                    <SubmissionInfo :submission :key="index"/>
                </div>
            </div>
            <div
                class="h-full border-secondary border-2 flex items-center justify-center text-secondary"
                v-else
            >
                No Submissions
            </div>
        </div>
        <FileUploadModal
            :isVisible="isModalVisible"
            @close="closeFileUploadModal"
        />
    </div>
</template>

<script lang="ts">
import { useGraderStore } from '../../store/grader'
import FileUploadModal from './FileUploadModal.vue';
import SubmissionInfo from './SubmissionInfo.vue';

export default {
    components: {
        SubmissionInfo,
        FileUploadModal
    },
    data() {
        return {
            store: useGraderStore(),
            isModalVisible: false
        }
    },
    computed: {
        submissions() {
            return this.store.currentsubmissions
        },
        assignment() {
            return this.store.currentassignment
        },
        assignmentName(): string {
            if (!this.assignment?.name) return ''
            return this.assignment.name!
        },
        showSubmissions(): boolean {
            if (!this.submissions) return false
            return this.submissions.length > 0
        },
        formattedDueDate(): string {
            return this.formatDate(this.assignment?.dueDate!);
        },
        formattedOpenDate(): string {
            return this.formatDate(this.assignment?.openDate!);
        },
        formattedCloseDate(): string {
            return this.formatDate(this.assignment?.closeDate!);
        },
        showOpenDate(): boolean {
            const now = new Date();
            const openDate = new Date(this.assignment?.openDate!);
            return now <= openDate;
        },
        submissionType(): string {
            return this.assignment?.type || 'none'
        },
        bestscore(): string {
            if (!this.submissions || this.submissions?.length == 0) return '-- /--'
            const bestscore = this.submissions.reduce((a, b) => Math.max(a, b.scoreEarned), -Infinity)
            const maxscore = this.assignment?.maxScore
            return `${bestscore} /${maxscore}`
        },
        attemptsremaining(): number {
            if (!this.submissions || !this.assignment) return 0
            return this.assignment.maxSubmissions - this.submissions.length
        },
        isBeforeOpenDate(): boolean {
            const today = new Date()
            const opendate = new Date(this.assignment!.openDate)
            return today < opendate
        },
        isAfterCloseDate(): boolean {
            const today = new Date()
            const closedate = new Date(this.assignment!.closeDate)
            return today > closedate
        },
        blockNewSubmissions(): boolean {
            if (this.attemptsremaining <= 0) return true
            if (this.isBeforeOpenDate) return true
            if (this.isAfterCloseDate) return true
        
            return this.store.preventSubmission
        }
    },
    methods: {
        formatDate(dateString: number) {
            if (!dateString) return "N/A";
            return new Date(dateString).toLocaleString("en-US");
        },
        createNewSubmission() {
            if (this.blockNewSubmissions) return
            if (this.submissionType == 'file') {
                this.isModalVisible = true
            } else {
                this.store.createSubmission()
            }
        },
        closeFileUploadModal() {
            this.isModalVisible = false
        }
    }
}
</script>
