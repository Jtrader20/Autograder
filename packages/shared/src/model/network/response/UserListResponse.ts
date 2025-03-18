
import { UserDTO } from "../../DTO/UserDTO";
import { AutograderResponse } from "./AutograderResponse";

export interface UserListResponse extends AutograderResponse {
    UserList: UserDTO[] 
}