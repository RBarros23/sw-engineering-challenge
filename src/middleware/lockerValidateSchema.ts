import { z } from "zod";

export const createLockerSchema = z.object({
  params: z.object({
    bloqId: z.string().uuid("Invalid bloq ID"),
  }),
});

export const updateLockerSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid locker ID"),
  }),
  body: z.object({
    status: z.enum(["OPEN", "CLOSED"]),
    isOccupied: z.boolean(),
  }),
});

export const updateLockerStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid locker ID"),
  }),
  body: z
    .object({
      status: z.enum(["OPEN", "CLOSED"], {
        errorMap: () => ({
          message: "Status must be either 'OPEN' or 'CLOSED'",
        }),
      }),
    })
    .strict(),
});

export const getLockerByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid locker ID"),
  }),
});

export const getLockersByBloqIdSchema = z.object({
  params: z.object({
    bloqId: z.string().uuid("Invalid bloq ID"),
  }),
});

export const isOccupiedLockerSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid locker ID"),
  }),
});

export const occupyLockerSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid locker ID"),
  }),
  body: z
    .object({
      isOccupied: z.boolean({
        required_error: "isOccupied is required",
        invalid_type_error: "isOccupied must be a boolean",
      }),
    })
    .strict(),
});
