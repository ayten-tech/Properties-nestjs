//another method to create property using zod integration
//we won't use it in this project we will use class-validator instead
// this wont' be implemented in our project
import { z } from 'zod';
//creating schema(structure& defining validation rules) for an object 
export const createPropertySchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(1000),
  area: z.string().transform((val) => parseFloat(val)).refine((val) => !isNaN(val) && val > 0, {
    message: "Area must be a positive number",
  }),
});
//creates a new typscript type called createuserdto
export type CreatePropertyZodDto = z.infer<typeof createPropertySchema>;