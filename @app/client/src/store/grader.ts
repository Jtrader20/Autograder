import { acceptHMRUpdate, defineStore } from "pinia";
import { AssignmentService } from "../service/AssignmentService"
import { Assignment, AssignmentDTO, Files, Submission, SubmissionDTO } from "@autograder/shared";
import { useUserStore } from "./user";
import { SubmissionService } from "../service/SubmissionService";
import { ServerFacade } from "../network/websocket/ServerFacade";
import { ClientCommunicator } from "../network/websocket/ClientCommunicator";

export const useGraderStore = defineStore('Grader', {
    state: () => ({
        assignmentservice: new AssignmentService(),
        submissionservice: new SubmissionService(),
        websocketserverfacade: new ServerFacade(),
        Assignments: [] as Assignment[],
        AssignmentSubmissions: {} as Record<string, SubmissionDTO[]>,
        AssignmentWebsocket: {} as Record<string, ClientCommunicator>,
        preventNewSubmission: {} as Record<string, boolean>,
        id: null as null | string | string [],
        files: [] as Files[]
    }),
    getters: {
        currentassignment: (state): Assignment | null => {
            if (!state.id) return null
            const assignment: AssignmentDTO | null =  state.Assignments.find((assignment: AssignmentDTO) => assignment.id === state.id) || null
            if (!assignment) return null
            return Assignment.fromDTO(assignment)
        },
        currentsubmissions: (state): SubmissionDTO[] | null => {
            if (!state.id) return null
            return state.AssignmentSubmissions[state.id as string]
        },
        isActive: (state) => (id: null | string | string[]) => state.id === id,
        preventSubmission: (state): boolean => {
            if (!state.id) return false
            return state.preventNewSubmission[state.id as string]
        }
    },
    actions: {
        resetFiles() {
            this.files = []
        },
        addFile(file: Files) {
            this.files.push(file)
        },
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
        async getPreviousSubmissions(id: string) {
            if (this.preventNewSubmission[id]) return 
            this.preventNewSubmission[id] = true

            if (!this.AssignmentSubmissions[id]?.length) {
                this.AssignmentSubmissions[id] = []
            }

            try {
                const userstore = useUserStore()
                const token = userstore.getAuthtoken
                const alias = userstore.getAlias
                this.AssignmentSubmissions[id] = await this.submissionservice.getSubmissionDetails(token, alias, id)
            } catch (error) {
                console.error('Error fetching submissions', error)
            }


            this.preventNewSubmission[id] = false
        },
        setId(value: null | string | string[]) {
            this.id = value
        },
        createSubmission() {
            const id = this.id as string
            this.preventNewSubmission[id] = true
            if (this.AssignmentWebsocket[id]) return


            const userstore = useUserStore()
            const token = userstore.getAuthtoken
            const alias = userstore.getAlias
            const request = {
                "message": {
                    "id": id,
                    "submissioninfo": {
                        "token": token,
                        "alias": alias,
                        "assignmentid": id,
                        "files": this.files
                    } 
                }
            }
            if (!this.AssignmentSubmissions[id]) {
                this.AssignmentSubmissions[id] = []
            }

            const submission = new Submission('', id, 'Pending...', 0, 0, 0, 0, 'WAITING', [])
            this.AssignmentSubmissions[id].unshift(submission)
            
            this.AssignmentWebsocket[id] = this.websocketserverfacade.submit(
                request, 
                (data) => this.handleWSMessage(id, data), 
                (error) => this.handleWSError(id, error), 
                () => this.handleWSClose(id)
            )
        },
        handleWSMessage(id: string, data: any) {
            const rawdata = data.message
            const submission = rawdata
            this.AssignmentSubmissions[id][0] = submission!
            console.log('message recieved: ', data)
        },
        handleWSError(id: string, error: Error) {

            delete this.AssignmentWebsocket[id]
            this.preventNewSubmission[id] = false
        },
        handleWSClose(id: string) {

            delete this.AssignmentWebsocket[id]
            this.preventNewSubmission[id] = false
        },
        async updateGrader(id: null | string | string[]) {
            this.setId(id)
            if (id && typeof id == 'string') {
                await this.getPreviousSubmissions(id)
            }
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useGraderStore, import.meta.hot))
}