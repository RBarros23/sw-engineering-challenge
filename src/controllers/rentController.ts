import { Request, Response } from "express";
import { RentService } from "../services/rentService.js";
import { prisma } from "../utils/prisma/prisma.js";

/**
 * Controller class handling rent-related HTTP requests.
 * Manages operations for creating, retrieving, and updating rents in the Bloqit system.
 */
export class RentController {
  private rentService: RentService;

  /**
   * Creates a new RentController instance
   * @param rentService - Optional RentService instance. Creates new instance if not provided
   */
  constructor(rentService: RentService = new RentService(prisma)) {
    this.rentService = rentService;
  }

  /**
   * Creates a new rent for a specific locker
   * @param req - Express request object containing lockerId in params and rent details in body
   * @param res - Express response object
   */
  async createRent(req: Request, res: Response) {
    try {
      const { lockerId } = req.params;
      const { weight, size } = req.body;
      const rent = await this.rentService.createRentService(
        lockerId,
        weight,
        size
      );
      return res.status(201).json(rent);
    } catch (error) {
      console.error("Error creating rent:", error);
      return res.status(500).json({ error: "Failed to create rent" });
    }
  }

  /**
   * Retrieves a specific rent by ID
   * @param req - Express request object containing rent ID in params
   * @param res - Express response object
   */
  async getRentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const rent = await this.rentService.getRentByIdService(id);
      if (!rent) {
        return res.status(404).json({ error: "Rent not found" });
      }
      return res.status(200).json(rent);
    } catch (error) {
      console.error("Error getting rent by id:", error);
      return res.status(500).json({ error: "Failed to get rent by id" });
    }
  }

  /**
   * Retrieves all rents for a specific locker
   * @param req - Express request object containing lockerId in params
   * @param res - Express response object
   */
  async getRentsByLockerId(req: Request, res: Response) {
    try {
      const { lockerId } = req.params;
      const rents = await this.rentService.getRentsByLockerIdService(lockerId);
      if (rents.length === 0) {
        return res
          .status(404)
          .json({ error: "No rents found for this locker" });
      }
      return res.status(200).json(rents);
    } catch (error) {
      console.error("Error getting rents by locker id:", error);
      return res
        .status(500)
        .json({ error: "Failed to get rents by locker id" });
    }
  }

  /**
   * Updates the status of a rent
   * @param req - Express request object containing rent ID in params and new status in body
   * @param res - Express response object
   */
  async updateRentStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const rent = await this.rentService.updateRentStatusService(id, status);
      return res.status(200).json(rent);
    } catch (error) {
      console.error("Error updating rent status:", error);
      return res.status(500).json({ error: "Failed to update rent status" });
    }
  }

  /**
   * Records a dropoff for a rent
   * @param req - Express request object containing rent ID in params
   * @param res - Express response object
   */
  async recordDropoff(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const rent = await this.rentService.recordDropoffService(id);
      return res.status(200).json(rent);
    } catch (error) {
      console.error("Error recording dropoff:", error);
      return res.status(500).json({ error: "Failed to record dropoff" });
    }
  }

  /**
   * Records a pickup for a rent
   * @param req - Express request object containing rent ID in params
   * @param res - Express response object
   */
  async recordPickup(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const rent = await this.rentService.recordPickupService(id);
      return res.status(200).json(rent);
    } catch (error) {
      console.error("Error recording pickup:", error);
      return res.status(500).json({ error: "Failed to record pickup" });
    }
  }
}
