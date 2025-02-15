
interface IReminder extends Document {
    title: string;
    description: string;
    due_date: Date;
    createdAt: Date;
    isFavorite: boolean;
    isEmergent: boolean;
    user: string;
}


export default IReminder;