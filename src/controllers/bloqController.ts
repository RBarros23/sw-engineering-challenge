import { Request, Response } from "express";
import { BloqService } from "../services/bloqService.js";
import { prisma } from "../utils/prisma/prisma.js";

export class BloqController {
  private bloqService: BloqService;

  constructor(bloqService: BloqService = new BloqService(prisma)) {
    this.bloqService = bloqService;
  }

  /**
   * Creates a new bloq with the specified title and address.
   * @param req Express request object containing title and address as query parameters
   * @param res Express response object
   * @returns A JSON response with the created bloq data or an error message
   *
   * @throws Returns 400 status if title or address are not strings
   * @throws Returns 500 status if bloq creation fails
   */
  async createBloq(req: Request, res: Response) {
    try {
      const { title, address } = req.body;
      const bloq = await this.bloqService.createBloqService(title, address);
      res.status(201).json(bloq);
    } catch (error) {
      console.error("Error creating bloq:", error);
      res.status(500).json({ error: "Failed to create bloq" });
    }
  }

  /**
   * Retrieves all bloqs from the database.
   * @param req Express request object
   * @param res Express response object
   * @returns A JSON response with all bloqs or an error message
   *
   * @throws Returns 500 status if getting all bloqs fails
   */
  async getAllBloqs(req: Request, res: Response) {
    try {
      const bloqs = await this.bloqService.getAllBloqsService();
      res.status(200).json(bloqs);
    } catch (error) {
      console.error("Error getting all bloqs:", error);
      res.status(500).json({ error: "Failed to get all bloqs" });
    }
  }

  /**
   * Retrieves a bloq by its ID.
   * @param req Express request object containing the ID as a parameter
   * @param res Express response object
   * @returns A JSON response with the bloq data or an error message
   *
   * @throws Returns 500 status if getting bloq by id fails
   */
  async getBloqById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const bloq = await this.bloqService.getBloqByIdService(id);
      if (!bloq) {
        return res.status(404).json({ error: "Bloq not found" });
      }
      res.status(200).json(bloq);
    } catch (error) {
      console.error("Error getting bloq by id:", error);
      res.status(500).json({ error: "Failed to get bloq by id" });
    }
  }

  /**
   * Updates a bloq with the specified title and address.
   * @param req Express request object containing the ID as a parameter and title, address in the body
   * @param res Express response object
   * @returns A JSON response with the updated bloq data or an error message
   *
   * @throws Returns 400 status if title or address are not strings
   * @throws Returns 500 status if bloq update fails
   */
  async updateBloq(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, address } = req.body;
      const bloq = await this.bloqService.updateBloqService(id, title, address);
      res.status(200).json(bloq);
    } catch (error) {
      console.error("Error updating bloq:", error);
      res.status(500).json({ error: "Failed to update bloq" });
    }
  }

  /**
   * Deletes a bloq by its ID.
   * @param req Express request object containing the ID as a parameter
   * @param res Express response object
   * @returns A JSON response with a success message or an error message
   *
   * @throws Returns 500 status if bloq deletion fails
   */
  async deleteBloq(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.bloqService.deleteBloqService(id);
      res.status(200).json({ message: "Bloq deleted successfully" });
    } catch (error) {
      console.error("Error deleting bloq:", error);
      res.status(500).json({ error: "Failed to delete bloq" });
    }
  }

  async addLockerToBloq(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { lockerId } = req.body;
      const bloq = await this.bloqService.addLockerToBloqService(id, lockerId);
      res.status(200).json(bloq);
    } catch (error) {
      console.error("Error adding locker to bloq:", error);
      res.status(500).json({ error: "Failed to add locker to bloq" });
    }
  }
}
