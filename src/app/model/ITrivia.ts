export interface IAnswer {
  text: string;
  is_correct: boolean;
}
export interface IQuestion {
  category: string;
  options: IAnswer[];
  question: string;
  type: string;
}
export interface ITrivia {
  updated_at: string;
  uuid: string;
  question_and_answer: IQuestion;

  maskAsView:boolean
}
