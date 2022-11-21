import { ContactModel } from './../../models/contactModel';
import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    adress: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    about: {
        type: String
    }
});


export default mongoose.model<ContactModel>('Contact', ContactSchema);