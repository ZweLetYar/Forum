"use server";

import dbConnect from "../dbConnect";
import validateBody from "../vaildateBody";
import PaginatedSearchParamsSchema from "../schemas/PaginatedSearchParamsSchema";
import { FilterQuery } from "mongoose";
import { actionError } from "../response";
import Tag, { ITagDoc } from "@/database/tag.model";

export async function GetTags(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sort?: string;
}): Promise<{
  data?: {
    tags: ITagDoc[];
    isNext: boolean;
  };
  success: boolean;
  message?: string;
  details?: object | null;
}> {
  await dbConnect();
  const validatedData = validateBody(PaginatedSearchParamsSchema, params);

  //@ts-expect-error
  let { page = 1, pageSize = 10, search, filter, sort } = validatedData;

  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  const filterQuery: FilterQuery<typeof Tag> = {};

  if (search) {
    filterQuery.$or = [{ name: { $regex: search, $options: "i" } }];
  }

  let sortCreteria: {};

  switch (filter) {
    case "recent":
      sortCreteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCreteria = { createdAt: 1 };
      break;
    case "popular":
      sortCreteria = { questions: -1 };
      break;
    case "name":
      sortCreteria = { name: 1 };
      break;

    default:
      sortCreteria = { questions: -1 };
      break;
  }

  try {
    const totalTag = await Tag.countDocuments(filterQuery);

    const tags = await Tag.find(filterQuery)
      .lean()
      .sort(sortCreteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalTag > tags.length + skip;

    return {
      success: true,
      data: {
        tags: JSON.parse(JSON.stringify(tags)),
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
