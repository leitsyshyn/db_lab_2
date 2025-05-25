import * as $runtime from "../runtime/library"

/**
 * @param text
 * @param int4
 */
export const simpleQuery5: (text: string, int4: number) => $runtime.TypedSql<simpleQuery5.Parameters, simpleQuery5.Result>

export namespace simpleQuery5 {
  export type Parameters = [text: string, int4: number]
  export type Result = {
    id: string
    title: string
    duration: number
    albumPosition: number | null
    albumId: string
    createdAt: Date
    updatedAt: Date
  }
}
