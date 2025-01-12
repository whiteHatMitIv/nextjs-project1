export interface Post {
    _id: string;
    prompt: string;
    creator: {
        username: string;
        email: string;
        image: string;
    };
    tag: string
};