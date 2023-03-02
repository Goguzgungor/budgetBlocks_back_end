import { Body, Controller, Param, Query } from "@nestjs/common";

import { ApiTags } from "@nestjs/swagger";
import { ApiGet, ApiPost } from "src/core/models/default.route.decorator";
import { DbService } from '../../../core/db/db.service';
import { UserService } from "../service/user.service";
import { UserDto } from "../models/user.dto";


@ApiTags('User')
@Controller('/user')
export class UserController {
    constructor(private service: UserService) { }

    @ApiPost('create', 'Bir user yaratır.')
    async createUser(@Body() userDto: UserDto) {
        const resp = await this.service.createUser(userDto);
        return resp;
    }

}
