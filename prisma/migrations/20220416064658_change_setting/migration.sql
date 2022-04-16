/*
  Warnings:

  - A unique constraint covering the columns `[theme]` on the table `Topics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Topics_theme_key` ON `Topics`(`theme`);
