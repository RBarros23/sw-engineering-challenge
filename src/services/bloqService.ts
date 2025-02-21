import { Prisma, PrismaClient } from "@prisma/client";
import { generateId } from "../utils/utils.js";
import { prisma as defaultPrisma } from "../utils/prisma/prisma.js";

/**
 * Creates a new bloq with the specified title and address
 * @param title - The title of the bloq
 * @param address - The address associated with the bloq
 * @param prisma - The Prisma client to use for database operations
 * @returns The created bloq object or an error object if validation fails
 */
export const createBloqService = async (
  title: string,
  address: string,
  prisma: PrismaClient = defaultPrisma
) => {
  try {
    const bloq = await prisma.bloq.create({
      data: {
        id: generateId(),
        title,
        address,
      },
    });
    return bloq;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      // P2002 is the error code for unique constraint violation
      // Only retry once with a new ID if we hit a duplicate ID
      const bloq = await prisma.bloq.create({
        data: {
          id: generateId(),
          title,
          address,
        },
      });
      return bloq;
    }
    throw error;
  }
};

/**
 * Retrieves a bloq by its ID
 * @param id - The unique identifier of the bloq
 * @param prisma - The Prisma client to use for database operations
 * @returns The bloq object if found, null otherwise
 */
export const getBloqsByID = async (
  id: string,
  prisma: PrismaClient = defaultPrisma
) => {
  const bloq = await prisma.bloq.findUnique({
    where: {
      id,
    },
  });
  return bloq;
};

/**
 * Updates an existing bloq with new title and address
 * @param id - The unique identifier of the bloq to update
 * @param title - The new title for the bloq
 * @param address - The new address for the bloq
 * @param prisma - The Prisma client to use for database operations
 * @returns The updated bloq object
 *
 * @throws Will throw an error if bloq with given ID doesn't exist
 */
export const updateBloqService = async (
  id: string,
  title: string,
  address: string,
  prisma: PrismaClient = defaultPrisma
) => {
  const bloq = await prisma.bloq.update({
    where: {
      id,
    },
    data: {
      title,
      address,
    },
  });
  return bloq;
};

/**
 * Deletes a bloq from the database
 * @param id - The unique identifier of the bloq to delete
 * @param prisma - The Prisma client to use for database operations
 * @returns The deleted bloq object
 *
 * @throws Will throw an error if bloq with given ID doesn't exist
 */
export const deleteBloqService = async (
  id: string,
  prisma: PrismaClient = defaultPrisma
) => {
  const bloq = await prisma.bloq.delete({
    where: {
      id,
    },
  });
  return bloq;
};
