-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('TEXT', 'IMAGE');

-- CreateTable
CREATE TABLE "news" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "thumbnail" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_contents" (
    "id" SERIAL NOT NULL,
    "type" "ContentType" NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "news_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_contents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "news_contents" ADD CONSTRAINT "news_contents_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE;
