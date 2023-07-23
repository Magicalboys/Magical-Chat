DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `users` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `timestamps` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatarImage` varchar(856) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `github` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;


INSERT INTO `user` VALUES (1, '前端已死', '81dc9bdb52d04dc20036dbd8313ed055', 'https://q2.qlogo.cn/headimg_dl?dst_uin=1601921230&spec=100', '1', '2023-02-12 00:45:30', '2023-02-19 19:07:04');
INSERT INTO `user` VALUES (2, '狂飙', '81dc9bdb52d04dc20036dbd8313ed055', 'https://q2.qlogo.cn/headimg_dl?dst_uin=2651808539&spec=100', '1', '2023-02-12 00:53:29', '2023-02-19 18:45:56');
INSERT INTO `user` VALUES (3, '今天还是 0 offer', '81dc9bdb52d04dc20036dbd8313ed055', 'https://pics4.baidu.com/feed/58ee3d6d55fbb2fb00eb02d65e6a53a04423dcd2.pnghttps://pics4.baidu.com/feed/58ee3d6d55fbb2fb00eb02d65e6a53a04423dcd2.png', '1', '2023-02-12 00:54:26', '2023-02-19 19:15:21');
INSERT INTO `user` VALUES (4, '青青草原', '81dc9bdb52d04dc20036dbd8313ed055', 'https://api.multiavatar.com/491.png', '1', '2023-02-12 13:34:34', '2023-02-17 20:49:32');
INSERT INTO `user` VALUES (5, '翻斗花园', '81dc9bdb52d04dc20036dbd8313ed055', 'https://api.multiavatar.com/52.png', '1', '2023-02-12 14:53:35', '2023-02-17 20:48:50');
INSERT INTO `user` VALUES (6, 'Magical', '25d55ad283aa400af464c76d713c07ad', 'https://q2.qlogo.cn/headimg_dl?dst_uin=2591754854&spec=100', NULL, '2023-02-15 14:48:08', '2023-02-19 16:34:40');
INSERT INTO `user` VALUES (7, '往事随风', '25d55ad283aa400af464c76d713c07ad', 'https://q2.qlogo.cn/headimg_dl?dst_uin=1601921230&spec=100', NULL, '2023-02-15 14:48:28', '2023-02-19 16:53:04');
INSERT INTO `user` VALUES (8, '光头强', 'c4ca4238a0b923820dcc509a6f75849b', 'https://api.multiavatar.com/732.png', NULL, '2023-02-15 15:20:11', '2023-02-15 17:05:32');
INSERT INTO `user` VALUES (9, '哥只是个传说', '81dc9bdb52d04dc20036dbd8313ed055', 'https://api.multiavatar.com/686.png', NULL, '2023-02-15 15:25:26', '2023-02-15 15:25:46');
INSERT INTO `user` VALUES (10, '灰太狼', 'c4ca4238a0b923820dcc509a6f75849b', 'https://api.multiavatar.com/570.png', NULL, '2023-02-15 15:38:27', '2023-02-15 15:57:27');
INSERT INTO `user` VALUES (11, '猪猪侠', 'c4ca4238a0b923820dcc509a6f75849b', 'https://api.multiavatar.com/752.png', NULL, '2023-02-15 15:43:56', '2023-02-15 15:57:20');
INSERT INTO `user` VALUES (12, '小兰', '202cb962ac59075b964b07152d234b70', 'https://api.multiavatar.com/832.png', NULL, '2023-02-15 15:48:39', '2023-02-15 15:57:16');
INSERT INTO `user` VALUES (13, '小柯南', '81dc9bdb52d04dc20036dbd8313ed055', 'https://api.multiavatar.com/1032.png', NULL, '2023-02-15 15:50:31', '2023-02-15 15:57:02');
INSERT INTO `user` VALUES (14, '毛利小五郎', '81dc9bdb52d04dc20036dbd8313ed055', 'https://api.multiavatar.com/952.png', NULL, '2023-02-15 15:51:57', '2023-02-15 15:56:58');
INSERT INTO `user` VALUES (15, '怪盗基德', '81dc9bdb52d04dc20036dbd8313ed055', 'https://api.multiavatar.com/1052.png', NULL, '2023-02-15 15:55:01', '2023-02-15 15:56:45');
INSERT INTO `user` VALUES (16, '高启兰', 'c81e728d9d4c2f636f067f89cc14862c', 'https://api.multiavatar.com/656.png', NULL, '2023-02-16 02:06:30', '2023-02-17 22:57:23');
INSERT INTO `user` VALUES (17, '高启强', '81dc9bdb52d04dc20036dbd8313ed055', 'https://api.multiavatar.com/167.png', NULL, '2023-02-17 01:43:02', '2023-02-17 01:43:16');
INSERT INTO `user` VALUES (20, '张启山', '81dc9bdb52d04dc20036dbd8313ed055', 'https://api.multiavatar.com/634.png', NULL, '2023-02-19 19:51:14', '2023-02-19 19:51:36');
INSERT INTO `user` VALUES (21, '张无忌', '81dc9bdb52d04dc20036dbd8313ed055', 'https://api.multiavatar.com/245.png', NULL, '2023-02-20 01:49:07', '2023-02-20 01:49:44');

SET FOREIGN_KEY_CHECKS = 1;