-- CreateTable
CREATE TABLE "Cafe" (
    "id" SERIAL NOT NULL,
    "cafe_name" VARCHAR(50) NOT NULL,
    "cafe_description" VARCHAR(255) NOT NULL,
    "cafe_location" geography(Point, 4326) NOT NULL,

    CONSTRAINT "Cafe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cafe_cafe_name_key" ON "Cafe"("cafe_name");
