import { BloqController } from "../controllers/bloqController.js";
import { BloqService } from "../services/bloqService.js";
import { testPrisma } from "./config/testConfig.js";
import { LockerStatus } from "@prisma/client";
import request from "supertest";
import express from "express";
import { createBloqRouter } from "../routes/bloqRoutes.js";

const app = express();
app.use(express.json());

const bloqService = new BloqService(testPrisma);
const bloqController = new BloqController(bloqService);
app.use("/api/bloqs", createBloqRouter(bloqController));

describe("Bloq Integration Tests", () => {
  let bloqService: BloqService;
  let bloqController: BloqController;

  beforeAll(async () => {
    bloqService = new BloqService(testPrisma);
    bloqController = new BloqController(bloqService);
  });

  beforeEach(async () => {
    await testPrisma.rent.deleteMany();
    await testPrisma.locker.deleteMany();
    await testPrisma.bloq.deleteMany();
  });

  afterAll(async () => {
    await testPrisma.bloq.deleteMany();
    await testPrisma.$disconnect();
  });

  describe("Service + Database Integration", () => {
    it("should create and retrieve a bloq", async () => {
      const bloq = await bloqService.createBloqService(
        "Test Bloq",
        "123 Test St"
      );

      const retrieved = await bloqService.getBloqByIdService(bloq.id);

      expect(retrieved).not.toBeNull();
      expect(retrieved?.title).toBe("Test Bloq");
      expect(retrieved?.address).toBe("123 Test St");
    });

    it("should handle bloq with lockers", async () => {
      const bloq = await bloqService.createBloqService(
        "Test Bloq",
        "123 Test St"
      );

      await testPrisma.locker.create({
        data: {
          id: "test-locker-1",
          bloqId: bloq.id,
          status: LockerStatus.CLOSED,
          isOccupied: false,
        },
      });

      const retrieved = await bloqService.getBloqByIdService(bloq.id);
      expect(retrieved?.lockers).toHaveLength(1);
      expect(retrieved?.lockers[0].status).toBe(LockerStatus.CLOSED);
    });
  });

  describe("API Endpoint Integration", () => {
    it("should create bloq through API", async () => {
      const response = await request(app).post("/api/bloqs/").send({
        title: "API Test Bloq",
        address: "456 API St",
      });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
      expect(response.body.title).toBe("API Test Bloq");
      await new Promise((resolve) => setTimeout(resolve, 100));
      const bloq = await testPrisma.bloq.findUnique({
        where: { id: response.body.id },
      });
      expect(bloq).not.toBeNull();
      expect(bloq?.title).toBe("API Test Bloq");
    });

    it("should handle validation errors", async () => {
      const response = await request(app).post("/api/bloqs").send({
        title: "",
        address: "456 API St",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Validation failed");
    });

    it("should update bloq through API", async () => {
      const bloq = await testPrisma.bloq.create({
        data: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          title: "Initial Title",
          address: "Initial Address",
        },
      });
      const response = await request(app).put(`/api/bloqs/${bloq.id}`).send({
        title: "Updated Title",
        address: "Updated Address",
      });
      expect(response.status).toBe(200);
      expect(response.body.title).toBe("Updated Title");
    });
  });
});

export { app };
