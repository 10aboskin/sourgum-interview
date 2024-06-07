import { QueryFunctionContext } from "@tanstack/react-query";

export type TypedQueryFunctionContext<
  KeysType extends Record<string, (...args: never) => readonly unknown[]>,
  Key extends keyof KeysType
> = QueryFunctionContext<ReturnType<KeysType[Key]>>;
