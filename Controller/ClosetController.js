const ClosetModel = require("../Models/ClosetModel");
const ClosetController = {
	addItem: async (req, res) => {
		try {
			const { item_name, item_type, item_description, item_image } = req.body;
			!item_name && res.status(400).json({ msg: "No item_name input" });
			!item_type && res.status(400).json({ msg: "No item_type input" });
			!item_description && res.status(400).json({ msg: "No item_description input" });
			!item_image && res.status(400).json({ msg: "No item_image input" });
			const newItem = new ClosetModel({
				item_name,
				item_type,
				item_description,
				item_image,
			});
			const item = await newItem.save();
			res.json(item);
		} catch (error) {
			return res.status(500).json(error);
		}
	},
	removeItem: async (req, res) => {
		try {
			const { itemID } = req.params;
			!itemID && res.status(400).json({ msg: "No id input" });
			const item = await ClosetModel.findByIdAndDelete(itemID);
			!item && res.status(400).json({ msg: "No item found" });
			res.json(item);
		} catch (error) {
			return res.status(500).json(error);
		}
	},
	getAllItems: async (req, res) => {
		try {
			const items = await ClosetModel.find();
			!items && res.status(400).json({ msg: "No item found" });
			res.json(items);
		} catch (error) {
			return res.status(500).json(error);
		}
	},
};

module.exports = ClosetController;
