import {MessageResponse} from "./message.response";
import {IsArray} from "class-validator";
import {Type} from "class-transformer";

export class ChatHistoryResponse {
    @IsArray()
    @Type(() => MessageResponse)
    messages: MessageResponse[]
}
