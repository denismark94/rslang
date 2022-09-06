interface IUser {
    name?: string;
    email: string;
    password?: string;
    id?: string;
    token?: string;
    error?: {
        status: string;
        errors: {
            path: string;
            message: string;
        }[];
    };
}
export default IUser;
