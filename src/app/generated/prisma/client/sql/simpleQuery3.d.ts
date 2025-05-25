import * as $runtime from "../runtime/library"

/**
 * @param int8
 */
export const simpleQuery3: (int8: number | bigint) => $runtime.TypedSql<simpleQuery3.Parameters, simpleQuery3.Result>

export namespace simpleQuery3 {
  export type Parameters = [int8: number | bigint]
  export type Result = {
    id: string
    name: string
    userId: string
    createdAt: Date
    updatedAt: Date
  }
}
