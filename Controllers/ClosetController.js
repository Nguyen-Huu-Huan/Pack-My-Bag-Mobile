import { storage, database } from "../FirebaseSetup";
import uuid from "uuid";
const ClosetController = {
	getAllItems: () => {
		return database
			.ref("Closet")
			.once("value")
			.then(function (snapshot) {
				return snapshot.val();
			});
	},
	createItem: (item_data) => {
		console.log("blablablablabla");
		// return storage
		// 	.ref("Closet")
		// 	.child(item_data.name)
		// 	.put(item_data.icon)
		// 	.then(function (snapshot) {
		// 		console.log(snapshot.ref.getDownloadURL());
		// 		return snapshot.ref.getDownloadURL();
		// 	});
		return storage
			.ref("Closet")
			.child(item_data.name)
			.put(item_data.icon)
			.then(function (snapshot) {
				console.log("the snapshot icon is: ", snapshot);
				return snapshot.ref.getDownloadURL();
			})
			.then(function (downloadURL) {
				item_data.icon = downloadURL;
				return database
					.ref("Closet")
					.once("value")
					.then(function (snapshot) {
						const index = snapshot.numChildren();
						return database
							.ref("Closet")
							.child(index)
							.set(item_data)
							.then(function () {
								return item_data;
							});
					});
			});
	},
	removeItem: (item_index) => {
		//imagine the closet is an array, splice the item at value item_index
		database.ref("Closet").once("value", function (snapshot) {
			const closet_data = snapshot.val();
			closet_data.splice(item_index, 1);
			database.ref("Closet").set(closet_data);
		});
		return database
			.ref("Closet")
			.once("value")
			.then(function (snapshot) {
				return snapshot.val();
			});

		// database
		// 	.ref("Closet")
		// 	.child(item_index)
		// 	.remove()
		// 	.then(function () {
		// 		return database
		// 			.ref("Closet")
		// 			.once("value")
		// 			.then(function (snapshot) {
		// 				return snapshot.val();
		// 			});
		// 	});
	},
	updateItem: (item_index, new_item_data) => {
		return storage
			.ref("Closet")
			.child(new_item_data.name)
			.put(new_item_data.image)
			.then(function (snapshot) {
				return snapshot.ref.getDownloadURL();
			})
			.then(function (downloadURL) {
				new_item_data.image = downloadURL;
				return database.ref("Closet").child(item_index).update(new_item_data);
			});
	},
};
export default ClosetController;
