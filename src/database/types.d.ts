// Type definitions for database schema

import { UUID } from 'node:crypto';
import { Selectable } from 'kysely';

export interface Database {
    thread: ThreadTable,
    user: UserTable
    threadUser: ThreadUserTable,
    userSession: UserSessionTable,
    message: MessageTable,
}

export interface ThreadTable {
    id: UUID,
    createdAt: Date
}

export interface UserTable {
    id: UUID,
    displayName: String,
    password: String,
}

export interface ThreadUserTable {
    user: UUID,
    thread: UUID,
}

export interface UserSessionTable {
    id: UUID,
    user: UUID,
    token: String,
    isBot: boolean,
    createdAt: Date,
    lastUsed: Date,
}

export interface MessageTable {
    id: UUID,
    thread: UUID,
    body: String,
    sentAt: Date,
    receivedAt: Date,
}

export type Thread = Selectable<ThreadTable>;
export type User = Selectable<UserTable>;
export type UserSession = Selectable<UserSessionTable>;
export type Message = Selectable<MessageTable>;