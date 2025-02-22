import { LockerService } from "../services/lockerService.js";
import { createMockContext, MockContext } from "./prisma-mock.js";
import { LockerStatus } from "@prisma/client";

let mockCtx: MockContext;
let lockerService: LockerService;

describe("Locker Service Mock Tests", () => {
  beforeEach(() => {
    mockCtx = createMockContext();
    lockerService = new LockerService(mockCtx.prisma);
  });
  it.todo("creates a locker successfully");
  //   it("creates a locker successfully", async () => {
  //     const mockLocker = {
  //       id: "1",
  //       bloqId: "test-bloq-id",
  //       status: LockerStatus.CLOSED,
  //       isOccupied: false,
  //       createdAt: new Date("2024-01-01T00:00:00Z"),
  //       updatedAt: new Date("2024-01-01T00:00:00Z"),
  //     };

  //     mockCtx.prisma.locker.create.mockResolvedValue(mockLocker);

  //     const result = await lockerService.createLockerService(mockLocker.bloqId);

  //     expect(result).toEqual({
  //       id: mockLocker.id,
  //       bloqId: mockLocker.bloqId,
  //       status: mockLocker.status,
  //       isOccupied: mockLocker.isOccupied,
  //       rents: [],
  //     });

  //     expect(mockCtx.prisma.locker.create).toHaveBeenCalledWith({
  //       data: {
  //         id: expect.any(String),
  //         bloqId: mockLocker.bloqId,
  //         status: LockerStatus.CLOSED,
  //         isOccupied: false,
  //       },
  //     });
  //   });
});
