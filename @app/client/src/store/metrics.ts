import { acceptHMRUpdate, defineStore } from "pinia"
import { AssignmentService } from "../service/AssignmentService"
import { SubmissionService } from "../service/SubmissionService"
import { Assignment, AssignmentDTO, SubmissionStatAvg, SubmissionStatGauge, SubmissionStatTime } from "@autograder/shared"
import { useUserStore } from "./user"

export const useMetricsStore = defineStore('Metrics', {
    state: () => ({
        assignmentservice: new AssignmentService(),
        submissionservice: new SubmissionService(),
        Assignments: [] as Assignment[],
        TimeStats: [] as SubmissionStatTime[],
        GaugeStats: [] as SubmissionStatGauge[],
        AverageGradeStats: {} as SubmissionStatAvg,
        id: null as null | string | string [],
    }),
    getters: {
        currentassignment: (state): Assignment | null => {
            if (!state.id) return null
            const assignment: AssignmentDTO | null =  state.Assignments.find((assignment: AssignmentDTO) => assignment.id === state.id) || null
            if (!assignment) return null
            return Assignment.fromDTO(assignment)
        },
        isActive: (state) => (id: null | string | string[]) => state.id === id,
        totalcount: (state): number => {
            if (!state.id) return 0
            if (state.GaugeStats.length == 0) return 0
            return state.GaugeStats.reduce((acc, value) => acc + value.studentcount, 0)
        },
        earlycount: (state): number => {
            if (!state.id) return 0
            if (state.GaugeStats.length == 0) return 0
            const obj = state.GaugeStats.find(value => value.category === 'early')
            if (obj) return obj.studentcount
            return 0
        },
        ontimecount: (state): number => {
            if (!state.id) return 0
            if (state.GaugeStats.length == 0) return 0
            const obj = state.GaugeStats.find(value => value.category === 'ontime')
            if (obj) return obj.studentcount
            return 0
        },
        latecount: (state): number => {
            if (!state.id) return 0
            if (state.GaugeStats.length == 0) return 0
            const obj = state.GaugeStats.find(value => value.category === 'late')
            if (obj) return obj.studentcount
            return 0
        },
        nosubmissioncount: (state): number => {
            if (!state.id) return 0
            if (state.GaugeStats.length == 0) return 0
            const obj = state.GaugeStats.find(value => value.category === 'no_submission')
            if (obj) return obj.studentcount
            return 0
        }
    },
    actions: {
        async requestAssignments() {
            if (this.Assignments.length !== 0) return
            try {
                const userstore = useUserStore()
                const token = userstore.getAuthtoken
                this.Assignments = await this.assignmentservice.getAssignmentDetails(token)
            } catch (error) {
                console.error("Error fetching assignments", error)
            }
        },
        async requestSubmissionStatTime(startdate: number, enddate: number) {
            if (this.id == null) return
            try {
                const userstore = useUserStore()
                const token = userstore.getAuthtoken
                const alias = userstore.getAlias
                const assignmentid: string = this.id as string
                this.TimeStats = await this.submissionservice.getSubmissionStatsTime(token, alias, assignmentid, startdate, enddate)
            } catch (error) {
                console.error(error)
            }
        },
        async requestSubmissionStatGauge() {
            if (this.id == null) return
            try {
                const userstore = useUserStore()
                const token = userstore.getAuthtoken
                const alias = userstore.getAlias
                const assignmentid: string = this.id as string
                this.GaugeStats = await this.submissionservice.getSubmissionStatsGauge(token, alias, assignmentid)
            } catch (error) {
                console.error(error)
            }
        },
        async requestAvgGrades() {
            if (this.id == null) return
            try {
                const userstore = useUserStore()
                const token = userstore.getAuthtoken
                const alias = userstore.getAlias
                const assignmentid: string = this.id as string
                this.AverageGradeStats = await this.submissionservice.getSubmissionStatsAvgGrade(token, alias, assignmentid)
            } catch (error) {
                return console.error(error)
            }
        },
        setId(value: null | string | string[]) {
            this.id = value
        },
        async updateMetrics(id: null | string | string[]) {
            this.setId(id)
            if (id && typeof id == 'string') {
                // await this.getPreviousSubmissions(id)
            }
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMetricsStore, import.meta.hot))
}