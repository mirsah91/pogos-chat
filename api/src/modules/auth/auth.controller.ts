import {Body, Controller, HttpCode, HttpStatus, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {RegisterUserRequest} from "./dto/request/register-user.request";

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/')
    @HttpCode(HttpStatus.OK)
    async register(@Body() { username }: RegisterUserRequest) {
        await this.authService.register(username);
    }
}
