import { ZodType } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const zodParser = <Z, D>(data: D, schema: ZodType<Z>): Z => {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error("Invalid response data", result.error);
    throw new Error("Invalid response data");
  }
  return result.data;
};
