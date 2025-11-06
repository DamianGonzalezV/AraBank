-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "isEmailMutated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isUsernameMutated" BOOLEAN NOT NULL DEFAULT false;
