import {IsDate, IsInt, IsString} from "class-validator";

export class MessageResponse {
    @IsString()
    chatId: string;

    @IsInt()
    id: number;

    @IsString()
    from: string;

    @IsString()
    text: string;

    @IsDate()
    createdAt: Date;
}
