import { AuthTokenDTO } from "../../DTO/AuthTokenDTO";
import { RoleDTO } from "../../DTO/RoleDTO";
import { UserDTO } from "../../DTO/UserDTO";
import { AutograderResponse } from "./AutograderResponse";
export interface AuthResponse extends AutograderResponse {
    AuthtokenDTO: AuthTokenDTO;
    RoleDTO: RoleDTO;
    UserDTO: UserDTO;
}
//# sourceMappingURL=AuthResponse.d.ts.map