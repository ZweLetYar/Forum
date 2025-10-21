import { ZodSchema } from "zod";

const validateBody = (schema: ZodSchema, body: unknown) => {
  return schema.parse(body);
};

export default validateBody;

//-------------------

// import { ZodTypeAny, ZodObject, z } from "zod";

// const validateBody = <T extends ZodTypeAny>(
//   schema: T,
//   body: unknown,
//   partial: boolean = false
// ): z.infer<T> => {
//   if (partial && schema instanceof ZodObject) {
//     // TypeScript loses type inference here, so we safely cast back to z.infer<T>
//     return schema.partial().parse(body) as z.infer<T>;
//   }

//   return schema.parse(body) as z.infer<T>;
// };

// export default validateBody;

// import { ZodObject, ZodRawShape } from "zod";

// const validateBody = (
//   body: unknown,
//   schema: ZodObject<ZodRawShape>,
//   partial: boolean = false
// ) => {
//   const validator = partial ? schema.partial() : schema;
//   return validator.parse(body);
// };

// export default validateBody;

// import { ZodSchema, ZodError } from "zod";

// // Function to validate request body against a Zod schema
// export const validateBody = <T>(body: unknown, schema: ZodSchema<T>): T => {
//   const result = schema.safeParse(body);

//   if (!result.success) {
//     // You can throw the ZodError or handle it in a custom way
//     throw result.error;
//   }

//   return result.data;
// };

// export default validateBody;
