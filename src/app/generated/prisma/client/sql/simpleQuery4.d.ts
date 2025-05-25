import * as $runtime from "../runtime/library"

/**
 * @param Country
 */
export const simpleQuery4: (Country: string) => $runtime.TypedSql<simpleQuery4.Parameters, simpleQuery4.Result>

export namespace simpleQuery4 {
  export type Parameters = [Country: string]
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
