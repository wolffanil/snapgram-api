const Save = require("./save.model");

class SaveService {
  async getAllSaves({ userId }) {
    const saves = await Save.find({ userId })
      .lean()
      .populate({
        path: "postId",
        populate: [{ path: "creator" }, { path: "likes" }, { path: "saves" }],
      })
      .sort({ createAt: "desc" });

    return saves;
  }

  async deleteSave({ saveId }) {
    await Save.findByIdAndDelete(saveId);

    return;
  }

  async createSave({ userId, postId }) {
    const newSave = await Save.create({ userId, postId });

    return newSave;
  }
}

module.exports = new SaveService();
