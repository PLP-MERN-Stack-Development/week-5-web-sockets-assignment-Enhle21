import mongoose from 'mongoose';
const choreSchema = new mongoose.Schema({
    title: { type: String, required: true },
    assignedTo: { type: String },
    dueDate: { type: Date },
    isCompleted: { type: Boolean, default: false }
}, { timestamps: true });
export default mongoose.model('Chore', choreSchema);