import {
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {Logger} from "@nestjs/common";
import {AuthService} from "../../auth/auth.service";
import {ChatService} from "./chat.service";

export interface MessageEvent {
    chatId: string,
    from: string,
    text: string,
}

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection {
    constructor(
        private readonly authService: AuthService,
        private readonly service: ChatService,
    ) {}

    private readonly logger = new Logger(ChatGateway.name);

    @WebSocketServer()
    private readonly server: Server;

    async handleConnection(client: Socket, args) {
        const username = client.handshake.auth.username;
        const user = await this.authService.findOneByUsername(username as string);

        if (!user) {
            client.disconnect();
            this.logger.error('Unauthorized');
        }
    }

    afterInit(server: Server) {
        this.logger.log('WebSocket Initialized')
    }

    @SubscribeMessage('joinChat')
    async joinChannel(client: Socket, chatId: string): Promise<void> {
        client.join(chatId);
        await this.service.initChat(chatId);
        this.logger.log(`Socket ${client.id} joined to chat ${chatId}`);
    }

    @SubscribeMessage('sendMessage')
    async sendMessage(client: Socket, payload: string): Promise<void> {
        const message: MessageEvent = JSON.parse(payload);
        client.to(message.chatId).emit('newMessage', JSON.stringify(message));
        await this.service.saveMessage(message);
        this.logger.log(`User ${message.from} successfully sent message to chat ${message.chatId}`);
    }
}
