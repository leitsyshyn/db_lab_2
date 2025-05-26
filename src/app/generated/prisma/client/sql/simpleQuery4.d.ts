import * as $runtime from "../runtime/library"

/**
 * @param text
 */
export const simpleQuery4: (text: string) => $runtime.TypedSql<simpleQuery4.Parameters, simpleQuery4.Result>

export namespace simpleQuery4 {
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
