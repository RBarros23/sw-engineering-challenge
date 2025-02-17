import { Request, Response } from "express";
import { prisma } from "../utils/prisma/prisma.js";
import {
  createBloqService,
  getBloqsByID,
  updateBloqService,
  deleteBloqService,
} from "../services/bloqService.js";

/**
 * Creates a new bloq with the specified title and address.
 * @param req Express request object containing title and address as query parameters
 * @param res Express response object
 * @returns A JSON response with the created bloq data or an error message
 *
 * @throws Returns 400 status if title or address are not strings
 * @throws Returns 500 status if bloq creation fails
 */
export const createBloq = async (req: Request, res: Response) => {
  try {
    const { title, address } = req.body;
    const bloq = await createBloqService(title, address);
    res.status(201).json(bloq);
  } catch (error) {
    res.status(500).json({ error: "Failed to create bloq" });
  }
};

/**
 * Retrieves all bloqs from the database.
 * @param req Express request object
 * @param res Express response object
 * @returns A JSON response with all bloqs or an error message
 *
 * @throws Returns 500 status if getting all bloqs fails
 */
export const getAllBloqs = async (req: Request, res: Response) => {
  try {
    const bloqs = await prisma.bloq.findMany();
    res.status(200).json(bloqs);
  } catch (error) {
    res.status(500).json({ error: "Failed to get all bloqs" });
  }
};

/**
 * Retrieves a bloq by its ID.
 * @param req Express request object containing the ID as a parameter
 * @param res Express response object
 * @returns A JSON response with the bloq data or an error message
 *
 * @throws Returns 500 status if getting bloq by id fails
 */
export const getBloqByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bloq = await getBloqsByID(id);
    if (!bloq) {
      return res.status(404).json({ error: "Bloq not found" });
    }
    res.status(200).json(bloq);
  } catch (error) {
    res.status(500).json({ error: "Failed to get bloq by id" });
  }
};

/**
 * Updates a bloq with the specified title and address.
 * @param req Express request object containing the ID as a parameter and title, address in the body
 * @param res Express response object
 * @returns A JSON response with the updated bloq data or an error message
 *
 * @throws Returns 400 status if title or address are not strings
 * @throws Returns 500 status if bloq update fails
 */
export const updateBloq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, address } = req.body;
    const bloq = await updateBloqService(id, title, address);
    res.status(200).json(bloq);
  } catch (error) {
    res.status(500).json({ error: "Failed to update bloq" });
  }
};

/**
 * Deletes a bloq by its ID.
 * @param req Express request object containing the ID as a parameter
 * @param res Express response object
 * @returns A JSON response with a success message or an error message
 *
 * @throws Returns 500 status if bloq deletion fails
 */
export const deleteBloq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteBloqService(id);
    res.status(200).json({ message: "Bloq deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete bloq" });
  }
};
