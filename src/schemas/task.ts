// Third-party dependencies
import { z } from "zod";

// Current project dependencies

export const TaskSchema = z.object({
  id: z.string().min(3, { message: "El ID es requerido" }),
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  description: z.string().optional().default(""),
  points: z.number(),
  imageSrc: z.string().optional().default(""),
});

export const TaskCompletedDtoSchema = z.object({
  points: z
    .number({ required_error: "Los puntos son obligatorios." })
    .int("Los puntos deben ser un número entero."),
  name: z.string({ required_error: "El nombre de la tarea es obligatorio." }),
  description: z.string({
    required_error: "La descripción de la tarea es obligatoria.",
  }),
  imageSrc: z.string().optional(),
});

export type Task = z.infer<typeof TaskSchema>;
export type TaskCompletedDto = z.infer<typeof TaskCompletedDtoSchema>;
