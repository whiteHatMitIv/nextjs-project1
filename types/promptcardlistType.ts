export interface Post {
    _id: string;
    prompt: string;
    creator: {
        _id: string | undefined
        username: string;
        email: string;
        image: string;
    };
    tag: string
};