// Third-party dependencies
import { z } from "zod";

// Current project dependencies

const UserSchema = z.object({
  id: z.string().min(1, { message: "El ID es requerido" }),
  username: z.string().min(3, {
    message: "El nombre de usuario debe tener al menos 3 caracteres",
  }),
  email: z.string().email({ message: "Debe ser un correo válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  totalPoints: z.number().int().default(0),
  totalTasksDone: z.number().int().default(0),
  avatarSrc: z.string().url().optional().default("https://i.pravatar.cc/300"),
  createdAt: z
    .string()
    .optional()
    .default(() => new Date().toISOString()),
  updatedAt: z
    .string()
    .optional()
    .default(() => new Date().toISOString()),
});

export const UserPublicSchema = UserSchema.omit({ password: true });

export type User = z.infer<typeof UserPublicSchema>;

export default UserSchema;
