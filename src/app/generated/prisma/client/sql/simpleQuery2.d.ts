import * as $runtime from "../runtime/library"
import { $DbEnums } from "./$DbEnums"

/**
 * @param timestamp
 */
export const simpleQuery2: (timestamp: Date) => $runtime.TypedSql<simpleQuery2.Parameters, simpleQuery2.Result>

export namespace simpleQuery2 {
  export type Parameters = [timestamp: Date]
  export type Result = {
    id: string
    name: string
    bio: string | null
    createdAt: Date
    image: string | null
    updatedAt: Date
    country: $DbEnums.Country | null
  }
}
