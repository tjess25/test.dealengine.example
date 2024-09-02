/*
  Warnings:

  - A unique constraint covering the columns `[iata_code]` on the table `Airports` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[flight_num]` on the table `FlightTickets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Airports_iata_code_key" ON "Airports"("iata_code");

-- CreateIndex
CREATE UNIQUE INDEX "FlightTickets_flight_num_key" ON "FlightTickets"("flight_num");
