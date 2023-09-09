import {Controller, Get, HttpCode, HttpStatus, Param} from "@nestjs/common";
import {ChatService} from "./chat.service";
import {ChatHistoryResponse} from "./dto/response/chat-history.response";

@Controller('/chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getListById(@Param('id') id): Promise<ChatHistoryResponse> {
        return this.chatService.getMessageListById(id);
    }
}
