import { ZodSchema } from "zod";

const validateBody = (schema: ZodSchema, body: unknown) => {
  return schema.parse(body);
};

export default validateBody;

//this is unused function
