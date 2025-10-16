import { NextResponse } from "next/server";

//define function
const handleSuccessResponse = (data: unknown, status: number = 200) => {
  const total = Array.isArray(data) ? data.length : 1; //coz data.length can't be used in metadata
  return NextResponse.json(
    {
      meta: {
        total,
      },
      data,
      sucess: true,
    },
    { status }
  );
};
//define function
const handleErrorResponse = (e: unknown, status: number = 500) => {
  return NextResponse.json(
    {
      message: e instanceof Error ? e.message : "Something went wrong!",
      success: false,
    },
    { status }
  );
};

export { handleSuccessResponse, handleErrorResponse };
