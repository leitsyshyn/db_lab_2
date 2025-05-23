import * as $runtime from "../runtime/library"

/**
 * @param text
 * @param int4
 */
export const getTracksOfGenreWithLength: (text: string, int4: number) => $runtime.TypedSql<getTracksOfGenreWithLength.Parameters, getTracksOfGenreWithLength.Result>

export namespace getTracksOfGenreWithLength {
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
