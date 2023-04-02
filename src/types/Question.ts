export interface Question {
  _id: string
  title: string,
  options: [string],
  answer: [string],
  isMultiple: boolean,
}