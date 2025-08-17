// Third-party dependencies
import type { APIRoute } from "astro";

// Current project dependencies
import prisma from "../../../lib/prisma";
import sendResponse from "../../../utils/sendResponse";
import validateToken from "../../../utils/validateToken";
import { TaskCompletedDtoSchema } from "../../../schemas/task";

export const prerender = false;

interface JwtUserPayload {
  id: string;
}

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const token = cookies.get("token")?.value;
    const userPayloadRaw = validateToken(token);

    if (!userPayloadRaw) {
      return sendResponse({
        data: { error: "No autorizado. Token inválido o inexistente." },
        message: "No autorizado. Inicia sesión primero.",
        success: false,
        status: 401,
      });
    }

    const userPayload = userPayloadRaw as JwtUserPayload;

    const body = await request.json().catch(() => null);

    if (!body) {
      return sendResponse({
        data: { error: "Datos de la tarea completada no proporcionados." },
        message: "Datos de la tarea completada no proporcionados.",
        success: false,
        status: 400,
      });
    }

    const parsed = TaskCompletedDtoSchema.safeParse(body);

    if (!parsed.success) {
      return sendResponse({
        data: { error: parsed.error.errors[0].message },
        message: parsed.error.errors[0].message,
        success: false,
        status: 400,
      });
    }

    const { name, description, points, imageSrc } = parsed.data;

    const userExists = await prisma.user.findUnique({
      where: { id: userPayload.id },
    });

    if (!userExists) {
      return sendResponse({
        data: { error: "Usuario no encontrado." },
        message: "Usuario no encontrado.",
        success: false,
        status: 404,
      });
    }

    const taskCompleted = await prisma.taskCompleted.create({
      data: {
        userId: userPayload.id,
        name,
        description,
        points,
        imageSrc,
      },
    });

    await prisma.user.update({
      where: { id: userPayload.id },
      data: {
        totalPoints: { increment: points },
        totalTasksDone: { increment: 1 },
      },
    });

    return sendResponse({
      data: taskCompleted,
      message: "Tarea completada registrada exitosamente.",
      success: true,
      status: 201,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return sendResponse({
      data: { error: "Error interno del servidor." },
      message: "Error interno del servidor.",
      success: false,
      status: 500,
    });
  }
};
