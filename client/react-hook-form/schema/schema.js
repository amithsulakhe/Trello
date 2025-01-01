import { z } from "zod";

// Define the schema for the login form
export const loginDefaultValues = {
  email: "",
  password: "",
};

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .min(1, { message: "Email is required." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(20, { message: "Password must be at most 20 characters long." }),
});
