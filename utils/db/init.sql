-- Dev only database initialization script
-- (C) 2026 itsdanjc

DROP DATABASE IF EXISTS `kindafax_dev`;
CREATE DATABASE `kindafax_dev`;
USE `kindafax_dev`;

CREATE TABLE `thread` (
    `id` UUID NOT NULL,
    `createdAt` DATETIME NOT NULL,

    CONSTRAINT pk_thread
        PRIMARY KEY (`id`)
);

CREATE TABLE `user` (
    `id` UUID NOT NULL,
    `displayName` VARCHAR(16) NOT NULL,

    CONSTRAINT pk_user
        PRIMARY KEY (`id`),

    CONSTRAINT uni_user
        UNIQUE (`displayName`)
);

CREATE TABLE `message` (
    `id` UUID NOT NULL,
    `threadId` UUID NOT NULL,
    `body` TINYTEXT NOT NULL,
    `sentAt` DATETIME NOT NULL,
    `receivedAt` DATETIME NULL,

    CONSTRAINT pk_message
        PRIMARY KEY (`id`),

    CONSTRAINT fk_message
        FOREIGN KEY (`threadId`) REFERENCES `thread`(`id`)
            ON UPDATE RESTRICT
            ON DELETE RESTRICT
);

CREATE TABLE `threadUser` (
    `userId` UUID NOT NULL,
    `threadId` UUID NOT NULL,

    CONSTRAINT pk_threadUser
        PRIMARY KEY (`userId`, `threadId`),

    CONSTRAINT fk_threadUser
        FOREIGN KEY (`userId`) REFERENCES `user`(`id`)
            ON UPDATE RESTRICT
            ON DELETE RESTRICT,
        
        FOREIGN KEY (`threadId`) REFERENCES `thread`(`id`)
            ON UPDATE RESTRICT
            ON DELETE RESTRICT

);