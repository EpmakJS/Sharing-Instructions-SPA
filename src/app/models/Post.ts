import { Step } from './Step';

export class Post {
    _id: string;
    title: string;
    description: string;
    image: string;
    steps: Step[];
}
