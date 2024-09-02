-- CreateTable
CREATE TABLE "FlightTickets" (
    "id" SERIAL NOT NULL,
    "airline" TEXT NOT NULL,
    "flight_num" INTEGER NOT NULL,
    "destinationId" INTEGER NOT NULL,
    "originId" INTEGER NOT NULL,

    CONSTRAINT "FlightTickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Airports" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "iata_code" TEXT NOT NULL,

    CONSTRAINT "Airports_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FlightTickets" ADD CONSTRAINT "FlightTickets_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Airports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightTickets" ADD CONSTRAINT "FlightTickets_originId_fkey" FOREIGN KEY ("originId") REFERENCES "Airports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
