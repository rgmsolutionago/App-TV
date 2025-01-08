export interface IReview {
  updated_at: string;
  uuid: string;
  maskAsView: boolean;

  name: string;
  rating: number;
  text: string;
}
