-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Items" (
    "itemId" SERIAL NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "startingPrice" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "endTime" TIMESTAMP(3) NOT NULL,
    "highestBidId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "Bids" (
    "bidId" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "bidderId" INTEGER NOT NULL,
    "bidAmount" INTEGER NOT NULL,
    "bidTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bids_pkey" PRIMARY KEY ("bidId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_highestBidId_fkey" FOREIGN KEY ("highestBidId") REFERENCES "Bids"("bidId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bids" ADD CONSTRAINT "Bids_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items"("itemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bids" ADD CONSTRAINT "Bids_bidderId_fkey" FOREIGN KEY ("bidderId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
