import * as $runtime from "../runtime/library"

/**
 * @param int8
 */
export const simpleQuery1: (int8: number | bigint) => $runtime.TypedSql<simpleQuery1.Parameters, simpleQuery1.Result>

export namespace simpleQuery1 {
  export type Parameters = [int8: number | bigint]
  export type Result = {
    id: string
    title: string
    artistId: string
    createdAt: Date
    image: string | null
    updatedAt: Date
  }
}
