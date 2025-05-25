import * as $runtime from "../runtime/library"

/**
 * @param text
 */
export const setComparisonQuery2: (text: string) => $runtime.TypedSql<setComparisonQuery2.Parameters, setComparisonQuery2.Result>

export namespace setComparisonQuery2 {
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
