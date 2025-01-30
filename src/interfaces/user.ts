interface IUser extends Document {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    refresh_tokens: string[];
    reminders: string[];
}

export default IUser;