CREATE TABLE `bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`office` text NOT NULL,
	`service` text NOT NULL,
	`arrival` text NOT NULL,
	`token` text NOT NULL,
	`status` text DEFAULT 'booked' NOT NULL,
	`mode` text NOT NULL,
	`created` integer NOT NULL,
	`updated` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_bookings_user` ON `bookings` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_active_user_service` ON `bookings` (`user_id`,`service`) WHERE "bookings"."status" IN ('booked','checked-in');--> statement-breakpoint
CREATE UNIQUE INDEX `idx_active_office_slot` ON `bookings` (`office`,`service`,`arrival`) WHERE "bookings"."status" IN ('booked','checked-in');--> statement-breakpoint
CREATE TABLE `chats` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`messages` text NOT NULL,
	`updated` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_chats_user` ON `chats` (`user_id`);--> statement-breakpoint
CREATE TABLE `queues` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`office` text NOT NULL,
	`remaining` integer NOT NULL,
	`minutes` integer DEFAULT 6 NOT NULL,
	`counters` integer DEFAULT 2 NOT NULL,
	`paused` integer DEFAULT 0 NOT NULL,
	`updated` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_queue_user_office` ON `queues` (`user_id`,`office`);