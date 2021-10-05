CREATE TABLE `user` (
  `id` INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(40),
  `email` VARCHAR(60) UNIQUE,
  `passw` VARCHAR(100),
  `colour` VARCHAR(15)
);

CREATE TABLE `device` (
  `id` INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(40),
  `desc` TEXT,
  `ip_address` VARCHAR(25),
  `port` VARCHAR(5),
  `colour` VARCHAR(15),
  `user_id` INTEGER UNSIGNED
);

CREATE TABLE `feature` (
  `id` INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(50),
  `topic` VARCHAR(50),
  `type` INTEGER,
  `value` VARCHAR(100),
  `device_id` INTEGER UNSIGNED
);

CREATE TABLE `data` (
  `time` DATETIME,
  `value` FLOAT,
  `feat_id` INTEGER UNSIGNED
);

ALTER TABLE `feature` ADD FOREIGN KEY (`device_id`) REFERENCES `device` (`id`);

ALTER TABLE `device` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `data` ADD FOREIGN KEY (`feat_id`) REFERENCES `feature` (`id`);
