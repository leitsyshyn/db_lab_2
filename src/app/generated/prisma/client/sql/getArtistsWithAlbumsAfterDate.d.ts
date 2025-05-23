import * as $runtime from "../runtime/library"

/**
 * @param timestamp
 */
export const getArtistsWithAlbumsAfterDate: (timestamp: Date) => $runtime.TypedSql<getArtistsWithAlbumsAfterDate.Parameters, getArtistsWithAlbumsAfterDate.Result>

export namespace getArtistsWithAlbumsAfterDate {
  export type Parameters = [timestamp: Date]
  export type Result = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    bio: string | null
    image: string | null
  }
}
