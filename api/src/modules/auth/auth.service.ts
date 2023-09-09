import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {wait} from "../../common/common.utils";

export interface User {
    username: string;
    createAt: Date;
}

@Injectable()
export class AuthService {
    private readonly userTable = new Map<string, User>();

    async register(username: string): Promise<void> {
        await wait();
        if (this.userTable.has(username)) {
            throw new BadRequestException(`User with username ${username} already exists`);
        }
        this.userTable.set(username, {
            username,
            createAt: new Date()
        });
    }

    async findOneByUsername(username: string): Promise<User> {
        return this.userTable.get(username);

    }
}
