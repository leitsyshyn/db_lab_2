/*
  Warnings:

  - You are about to drop the column `coverImage` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `updatedDate` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `createdDate` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `updatedDate` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `createdDate` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `updatedDate` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `addedDate` on the `PlaylistTrack` table. All the data in the column will be lost.
  - You are about to drop the column `releasedDate` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `updatedDate` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `registerDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedDate` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Track` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "coverImage",
DROP COLUMN "releaseDate",
DROP COLUMN "updatedDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "createdDate",
DROP COLUMN "updatedDate",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "createdDate",
DROP COLUMN "updatedDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PlaylistTrack" DROP COLUMN "addedDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "releasedDate",
DROP COLUMN "updatedDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "registerDate",
DROP COLUMN "updatedDate",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
