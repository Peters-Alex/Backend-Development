-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "plants" (
    "plant_id" SERIAL NOT NULL,
    "species" TEXT NOT NULL,
    "water_frequency" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "plant_image" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "plants_pkey" PRIMARY KEY ("plant_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "plants" ADD CONSTRAINT "plants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
