import { jest } from "@jest/globals";
import { Request, Response } from "express";
import { createBloq } from "../controllers/bloqController.js";
import { prisma } from "../utils/prisma/prisma.js";
import { Bloq } from "@prisma/client";

// Create a mock function first
const mockCreate = jest.fn();

jest.mock("../utils/prisma/prisma.js", () => ({
  prisma: {
    bloq: {
      create: mockCreate,
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Bloq Controller", () => {
  it("is created a bloq", async () => {});

  it.todo("is not created a bloq with invalid data");

  it.todo("is not created a bloq with duplicate id");

  it.todo("is not created a bloq with invalid id");
});
