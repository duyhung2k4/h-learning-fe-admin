import { ENTITY_TYPE, RESULT_TYPE } from "@/model/quizz"

export type CreateQuizzRequest = {
  ask: string
  resultType: RESULT_TYPE
  result: string[]
  option: string[]
  time: number
  entityType: ENTITY_TYPE
  entityId: number
}

export type UpdateQuizzRequest = {
  id: number
  ask: string
  resultType: RESULT_TYPE
  result: string[]
  option: string[]
  time: number
}

export type DeleteQuizzRequest = {
  id: number
}
