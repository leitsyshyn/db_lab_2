import * as $runtime from "../runtime/library"

/**
 * @param text
 */
export const setComparisonQuery3: (text: string) => $runtime.TypedSql<setComparisonQuery3.Parameters, setComparisonQuery3.Result>

export namespace setComparisonQuery3 {
  export type Parameters = [text: string]
  export type Result = {
    id: string
    name: string
    country: string | null
    bio: string | null
    createdAt: Date
    image: string | null
    updatedAt: Date
  }
}
