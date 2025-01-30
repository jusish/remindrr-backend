
interface IReminder extends Document {
    id: string;
    title: string;
    description: string;
    due_date: Date;
    isFavorite: boolean;
    isEmergent: boolean;
    user: string;
}


export default IReminder;