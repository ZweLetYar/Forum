import z from "zod";

const PaginatedSearchParamsSchema = z.object({
    page: z
    .number()
    .int()
    .positive()
    .optional()
    .default(1),
  pageSize: z
    .number()
    .int()
    .positive()
    .max(100)
    .optional()
    .default(10),
  search: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .optional(),
  filter: z
    .string()
    .trim()
    .optional(),
  sort: z
    .string()
    .trim()
    .optional(),
})

export default PaginatedSearchParamsSchema;