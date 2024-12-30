import { BaseModel } from "./base";

export type QuizzModel = BaseModel & {
  ask: string
  resultType: RESULT_TYPE
  result: string[]
  option: string[]
  time: number
  entityType: ENTITY_TYPE
  entityId: number
}

export type ENTITY_TYPE =
  | "QUIZZ_VIDEO_LESSION"
  | "QUIZZ_LESSION";

export type RESULT_TYPE =
  | "QUIZZ_SINGLE_RESULT"
  | "QUIZZ_MULTI_RESULT"