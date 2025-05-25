import * as $runtime from "../runtime/library"

/**
 * @param text
 */
export const setComparisonQuery1: (text: string) => $runtime.TypedSql<setComparisonQuery1.Parameters, setComparisonQuery1.Result>

export namespace setComparisonQuery1 {
  export type Parameters = [text: string]
  export type Result = {
    id: string
    name: string
    userId: string
    createdAt: Date
    updatedAt: Date
  }
}
