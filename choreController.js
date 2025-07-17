import Chore from '../models/Chore.js';
export const getChores = async (req, res) => {
    const chores = await Chore.find();
    res.json(chores);
};
export const addChore = async (req, res) => {
    const newChore = new Chore(req.body);
    await newChore.save();
    res.json(newChore);
};
export const updateChore = async (req, res) => {
    const updated = await Chore.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};
export const deleteChore = async (req, res) => {
    await Chore.findByIdAndDelete(req.params.id);
    res.json({ message: "Chore deleted" });
};