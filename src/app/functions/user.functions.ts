import { inject } from "@angular/core";
import { UsersService } from "../services/user/users.service";

export class UserFunctions{
 private userServices = inject(UsersService);
 
}