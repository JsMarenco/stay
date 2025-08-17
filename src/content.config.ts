// Third-party dependencies

// Current project dependencies
import { defineCollection, z } from "astro:content";
import { v4 as uuid } from "uuid";
import tasks from "./data/tasks.json";
import { TaskSchema } from "./schemas/task.ts";

const tasksCollection = defineCollection({
  loader: async () => {
    return tasks.map((task) => {
      return {
        ...(typeof task === "object" && task !== null ? task : {}),
        id: uuid(),
      };
    });
  },
  schema: TaskSchema,
});

export const collections = {
  tasks: tasksCollection,
};
