import * as $runtime from "../runtime/library"

/**
 * @param timestamp
 */
export const setComparisonQuery3: (timestamp: Date) => $runtime.TypedSql<setComparisonQuery3.Parameters, setComparisonQuery3.Result>

export namespace setComparisonQuery3 {
  export type Parameters = [timestamp: Date]
  export type Result = {
    firstArtistName: string
    secondArtistName: string
  }
}
