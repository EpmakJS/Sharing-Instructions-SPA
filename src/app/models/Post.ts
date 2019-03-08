import { Step } from './Step';
import { Rating } from './Rating';

export class Post {
    _id: string;
    title: string;
    description: string;
    image: string;
    steps: Step[];
    rating: Rating[];
}
