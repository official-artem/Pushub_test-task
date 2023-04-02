import { Question } from '../types/Question';
import { client } from '../utils/quizFetch';

export const getQuestions = () => {
  return client.get<Question>(`/questions`);
};

export const deleteQuestion = (questionId: string) => {
  return client.delete(`/questions/${questionId}`);
};
