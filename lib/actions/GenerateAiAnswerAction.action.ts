"use server";

import dbConnect from "../dbConnect";
import { actionError } from "../response";
import GenerateAiAnswerSchema from "../schemas/GenerateAiAnswerSchema";
import validateBody from "../vaildateBody";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export default async function GenerateAiAnswerAction(params: {
  title: string | undefined;
  content: string | undefined;
  userAnswer: string;
}): Promise<{
  success: boolean;
  data?: { aiAnswer: string };
  message?: string;
  details?: object | null;
}> {
  await dbConnect();

  const validatedData = validateBody(GenerateAiAnswerSchema, params);

  //@ts-expect-error
  const { title, content, userAnswer } = validatedData;

  const { text: aiAnswer } = await generateText({
    model: google("gemini-2.5-flash"),

    prompt: `Generate a html-formatted response to the following question:"${title}".
   Consider the provided context :
   **Contenxt:**${content}

   Also, prioritize and incorporate the user's answer when formulating your response:
   **User's Answer:**${userAnswer}

   Prioritize the user's answer only if it is correct. If it is incomplete or incorrect, inprove or correct it while keeping the response concise and to the point.
   Provide the final answer in the html format.
   `,

    system:
      "You are a helpful assistant that provides informative responses in html format. Use appropriate html syyntax for headings , lists , code blocks , use short-form smaller case language identifiers (e.g., 'js' for Javascript, 'py' for Python, 'ts' for TypeScript, 'html' for HTML, 'css' for CSS, etc.).",
  });

  try {
    // Call to AI service to generate answer

    return {
      success: true,
      data: {
        aiAnswer,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
