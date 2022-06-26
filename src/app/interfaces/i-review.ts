import { IMovie } from "./i-movie";
import { IUser } from "./i-user";

export interface IReview {
    user: IUser,
    movie: IMovie,
    comment: string,
    createdOn: string,
}