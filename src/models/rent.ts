export enum RentStatus {
  CREATED,
  WAITING_DROPOFF,
  WAITING_PICKUP,
  DELIVERED,
}

export enum RentSize {
  XS,
  S,
  M,
  L,
  XL,
}

// export type Rent = {
//   id: String;
//   lockerId: string;
//   weight: number;
//   size: RentSize;
//   status: RentStatus;
// };

export class RentClass {
  public id: string;
  public lockerId: string;
  public weight: number;
  public size: RentSize;
  public status: RentStatus;
  public droppedOffAt?: Date;
  public pickedUpAt?: Date;

  constructor(
    id: string,
    lockerId: string,
    weight: number,
    size: RentSize,
    status: RentStatus,
    droppedOffAt?: Date,
    pickedUpAt?: Date
  ) {
    this.id = id;
    this.lockerId = lockerId;
    this.weight = weight;
    this.size = size;
    this.status = status;
    this.droppedOffAt = droppedOffAt;
    this.pickedUpAt = pickedUpAt;
  }
}
