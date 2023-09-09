import {Injectable, NotFoundException} from "@nestjs/common";
import {mapToClass, wait} from "../../../common/common.utils";
import { MessageEvent } from './chat.gateway';
import {MessageEntity} from "./entities/message.entity";
import {ChatHistoryResponse} from "./dto/response/chat-history.response";
import {MessageResponse} from "./dto/response/message.response";

@Injectable()
export class ChatService {
    private readonly messageHistory: Map<string, MessageEntity[]> = new Map();

    async initChat(chatId) {
        await wait();
        if (!this.messageHistory.has(chatId)) {
            this.messageHistory.set(chatId, []);
        }
    }

    async saveMessage({ chatId, text, from }: MessageEvent) {
        await wait();
        const chat = this.messageHistory.get(chatId);

        if (!chat) {
            this.messageHistory.set(chatId, [{
                id: 1,
                chatId,
                text,
                from,
                createdAt: new Date()
            }]);
            return;
        }

        this.messageHistory.set(chatId, [...chat, {
            id: chat.length + 1,
            chatId,
            text,
            from,
            createdAt: new Date()
        }]);
    }

    async getMessageListById(id: string): Promise<ChatHistoryResponse> {
        await wait();
        const chat = this.messageHistory.get(id);

        if (!chat) {
            throw new NotFoundException(`Chat by id ${id} not found!`);
        }

        return {
            messages: chat.map(message => mapToClass(message, MessageResponse))
        }
    }
}
