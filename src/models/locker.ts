export type { Locker };

export enum LockerStatus {
  OPEN,
  CLOSED,
}

type Locker = {
  id: String;
  bloqId: String;
  status: LockerStatus;
  isOccupied: boolean;
};
