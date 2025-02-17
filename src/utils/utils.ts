import { randomUUID } from "crypto";

export const generateId = () => {
  return randomUUID().replace(/-/g, "");
};
