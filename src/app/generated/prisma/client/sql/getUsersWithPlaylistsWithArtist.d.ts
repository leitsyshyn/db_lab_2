import * as $runtime from "../runtime/library"

/**
 * @param text
 */
export const getUsersWithPlaylistsWithArtist: (text: string) => $runtime.TypedSql<getUsersWithPlaylistsWithArtist.Parameters, getUsersWithPlaylistsWithArtist.Result>

export namespace getUsersWithPlaylistsWithArtist {
  export type Parameters = [text: string]
  export type Result = {
    id: string
    username: string
    email: string
    bio: string | null
    createdAt: Date
    image: string | null
    password: string
    updatedAt: Date
  }
}
