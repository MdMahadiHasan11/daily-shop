import { ZodTypeAny } from "zod";

export const zodValidator = <T>(payload: unknown, schema: ZodTypeAny) => {
  const validatedPayload = schema.safeParse(payload);

  if (!validatedPayload.success) {
    return {
      success: false as const,
      errors: validatedPayload.error.issues.map((issue) => {
        return {
          field: String(issue.path[0] ?? "form"),
          message: issue.message,
        };
      }),
    };
  }

  return {
    success: true as const,
    data: validatedPayload.data as T,
  };
};
