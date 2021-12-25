import { useState, useEffect } from "react";
import ClosetController from "../Controllers/ClosetController";
export default function useFindAllClosetItems() {
	const [isLoadingCloset, setLoadingCloset] = useState(true);
	const [closetItems, setClosetItems] = useState([]);
	useEffect(async () => {
		const closet_data = await ClosetController.getAllItems();
		console.log("blablabla: ", closet_data);
		setClosetItems(closet_data);
		setLoadingCloset(false);
	}, []);
	return {
		closetItems,
		isLoadingCloset,
	};
}
