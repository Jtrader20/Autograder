// Domain
export { User } from './model/domain/User'
export { AuthToken } from './model/domain/AuthToken'
export { Role } from './model/domain/Role'
export { Assignment } from './model/domain/Assignment'
export { Submission } from './model/domain/Submission'
export { SubmissionStatAvg } from './model/domain/SubmissionStatAvg'
export { SubmissionStatTime } from './model/domain/SubmissionStatTime'
export { SubmissionStatGauge } from './model/domain/SubmissionStatGauge'
export { UserAssignment } from './model/domain/UserAssignment'

// DTO
export type { UserDTO } from './model/DTO/UserDTO'
export type { AuthTokenDTO } from './model/DTO/AuthTokenDTO'
export type { RoleDTO } from './model/DTO/RoleDTO'
export type { AssignmentDTO } from './model/DTO/AssignmentDTO'
export type { SubmissionDTO } from './model/DTO/SubmissionDTO'
export type { TaskDTO } from './model/DTO/TaskDTO'
export type { SubmissionStatTimeDTO } from './model/DTO/SubmissionStatTimeDTO'
export type { SubmissionStatGaugeDTO } from './model/DTO/SubmissionStatGaugeDTO'
export type { UserAssignmentDTO } from './model/DTO/UserAssignmentDTO'
export type { SubmissionStatAvgDTO } from './model/DTO/SubmissionStatAvgDTO'

// HTTP Request
export type { AutograderRequest } from './model/network/request/AutograderRequest'
export type { AuthRequest } from './model/network/request/AuthRequest'
export type { RegisterRequest } from './model/network/request/RegisterRequest'
export type { LoginRequest } from './model/network/request/LoginRequest'
export type { SubmissionRequest } from './model/network/request/SubmissionRequest'
export type { SubmissionStatTimeRequest } from './model/network/request/SubmissionStatTimeRequest'
export type { UserRequest } from './model/network/request/UserRequest'

// HTTP Response
export type { AutograderResponse } from './model/network/response/AutograderResponse'
export type { AuthResponse } from './model/network/response/AuthResponse'
export type { AssignmentResponse } from './model/network/response/AssignmentResponse'
export type { SubmissionResponse } from './model/network/response/SubmissionResponse'
export type { SubmissionStatTimeResponse } from './model/network/response/SubmissionStatTimeResponse'
export type { SubmissionStatGaugeResponse } from './model/network/response/SubmissionStatGaugeResponse'
export type { SubmissionStatAvgResponse } from './model/network/response/SubmissionStatAvgResponse'
export type { UserListResponse } from './model/network/response/UserListResponse'
export type { UserAssignmentsResponse } from './model/network/response/UserAssignmentsResponse'

// Enums
export { RoleTypes } from './model/domain/Role'

// Types
export type { Files } from './model/types/Files'