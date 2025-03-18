import { ClientCommunicator } from "./ClientCommunicator";
import config from '../../config'
import { RegisterRequest, User, AuthToken, Role, AuthResponse, AuthRequest, AutograderResponse, LoginRequest, Assignment, AssignmentResponse, Submission, SubmissionRequest, SubmissionResponse, SubmissionStatTimeResponse, SubmissionStatTimeRequest, SubmissionStatTime, SubmissionStatGaugeResponse, SubmissionStatGauge, SubmissionStatAvg, SubmissionStatAvgResponse, UserRequest, UserListResponse, UserAssignment, UserAssignmentsResponse } from "@autograder/shared";



export class ServerFacade {
    private SERVER_URL = config.path
    private clientCommunicator = new ClientCommunicator(this.SERVER_URL)

    public async register(request: RegisterRequest): Promise<[User, AuthToken, Role]> {
        const response = await this.clientCommunicator.doPost<RegisterRequest, AuthResponse>(request, '/api/auth')

        const user: User = User.fromDTO(response.UserDTO)
        const auth: AuthToken = AuthToken.fromDTO(response.AuthtokenDTO)
        const role: Role = Role.fromDTO(response.RoleDTO)

        return [user, auth, role]
    }

    public async login(request: LoginRequest): Promise<[User, AuthToken, Role]> {
        const response = await this.clientCommunicator.doPut<LoginRequest, AuthResponse>(request, '/api/auth')

        const user: User = User.fromDTO(response.UserDTO)
        const auth: AuthToken = AuthToken.fromDTO(response.AuthtokenDTO)
        const role: Role = Role.fromDTO(response.RoleDTO)

        return [user, auth, role]   
    }

    public async logout(request: AuthRequest): Promise<void> {
        await this.clientCommunicator.doDelete<AuthRequest, AutograderResponse>(request, '/api/auth')
    }

    public async getAssignmentDetails (request: AuthRequest): Promise<Assignment[]> {
        const response = await this.clientCommunicator.doPost<AuthRequest, AssignmentResponse>(request, '/api/grader')
        const assignments: Assignment[] = []
        response.Assignments.forEach((DTO) => {
            const assignment: Assignment = Assignment.fromDTO(DTO)
            assignments.push(assignment)
        })

        return assignments
    }

    public async getSubmissionDetails (request: SubmissionRequest): Promise<Submission[]> {
        const response = await this.clientCommunicator.doPost<SubmissionRequest, SubmissionResponse>(request, '/api/submission')
        const submissions: Submission[] = []
        response.Submissions.forEach((DTO) => {
            const submission: Submission = Submission.fromDTO(DTO)
            submissions.push(submission)
        })

        return submissions
    }

    public async getSubmissionStatsAvgGrade (request: SubmissionRequest): Promise<SubmissionStatAvg> {
        const response = await  this.clientCommunicator.doPost<SubmissionRequest, SubmissionStatAvgResponse>(request, '/api/submission/stats/averages')
        return SubmissionStatAvg.fromDTO(response.SubmissionStatAvg)
    }

    public async getSubmissionStatsTime (request: SubmissionStatTimeRequest): Promise<SubmissionStatTime[]> {
        const response = await this.clientCommunicator.doPut<SubmissionStatTimeRequest, SubmissionStatTimeResponse>(request, '/api/submission/stats')
        const submissionstats: SubmissionStatTime[] = []
        response.SubmissionStatTime.forEach((DTO) => {
            const submissionstat: SubmissionStatTime = SubmissionStatTime.fromDTO(DTO)
            submissionstats.push(submissionstat)
        })

        return submissionstats
    }

    public async getUserList (request: UserRequest): Promise<User[]> {
        const response = await this.clientCommunicator.doPost<UserRequest, UserListResponse>(request, '/api/user')
        const users: User[] = []
        response.UserList.forEach((DTO) => {
            const user: User = User.fromDTO(DTO)
            users.push(user)
        })

        return users
    }

    public async getSubmissionStatsGauge (request: SubmissionRequest): Promise<SubmissionStatGauge[]> {
        const response = await this.clientCommunicator.doPost<SubmissionRequest, SubmissionStatGaugeResponse>(request, '/api/submission/stats')
        const submissionstats: SubmissionStatGauge[] = []
        response.SubmissionStatGauge.forEach((DTO) => {
            const submissionstat: SubmissionStatGauge = SubmissionStatGauge.fromDTO(DTO)
            submissionstats.push(submissionstat)
        })

        return submissionstats
    }

    public async getAllUserAssignments (request: UserRequest): Promise<UserAssignment[]> {
        const response = await this.clientCommunicator.doPost<UserRequest, UserAssignmentsResponse>(request, '/api/userassignment')
        const userassignments: UserAssignment[] = []
        response.UserAssignments.forEach((DTO) => {
            const userassignment: UserAssignment = UserAssignment.fromDTO(DTO)
            userassignments.push(userassignment)
        })
        
        return userassignments
    }
}