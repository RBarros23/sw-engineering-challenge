export { LockerClass };
import { RentClass } from "./rent.js";
import { LockerStatus } from "@prisma/client";

class LockerClass {
  public id: String;
  public bloqId: String;
  public status: LockerStatus;
  public isOccupied: boolean;
  public rents?: RentClass[];

  constructor(
    id: String,
    bloqId: String,
    status: LockerStatus,
    isOccupied: boolean,
    rents: RentClass[] = []
  ) {
    this.id = id;
    this.bloqId = bloqId;
    this.status = status;
    this.isOccupied = isOccupied;
    this.rents = rents;
  }

  public open(): void {
    this.status = LockerStatus.OPEN;
  }

  public close(): void {
    this.status = LockerStatus.CLOSED;
  }

  public occupy(): void {
    this.isOccupied = true;
  }

  public vacate(): void {
    this.isOccupied = false;
  }

  public addRent(rent: RentClass): void {
    if (!this.rents) {
      this.rents = [];
    }
    this.rents.push(rent);
  }

  public removeRent(rent: RentClass): void {
    this.rents = this.rents?.filter((r) => r !== rent);
  }
}
