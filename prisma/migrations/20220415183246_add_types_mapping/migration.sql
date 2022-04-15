/*
  Warnings:

  - You are about to alter the column `name` on the `Topics` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `theme` on the `Topics` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE `Topics` MODIFY `name` VARCHAR(20) NOT NULL DEFAULT '匿名希望',
    MODIFY `theme` VARCHAR(30) NOT NULL;
