"use client"
import { useState, useEffect } from "react";

import api from "../services/api";

import Navbar from "../components/Navbar";
import FilterOptions from "../components/FilterOptions";
import Loading from "../components/Loading";
import { useRouter } from "next/navigation";

function MyIdeas() {
	const [loading, setLoading] = useState(true);
	const [categories, setCategories] = useState([]);
	const [ideas, setIdeas] = useState([]);
	const [pagination, setPagination] = useState([]);

	const [title, setTitle] = useState("");

	const router = useRouter();


	useEffect(() => {
		async function fetchInfo() {
			let responseCategories = await api.get("/categories",
				{ headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } });
			if (responseCategories.status === 200) {
				setCategories(responseCategories.data.categories);
			}

			let responseIdeas = await api.get("/users/me/ideas",
				{ headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } });
			if (responseIdeas.status === 200) {
				setIdeas(responseIdeas.data.ideas);
				setPagination(responseIdeas.data.pagination);
			}
			setLoading(false);
		}
		fetchInfo();
	}, []);

	return (
		loading ? <Loading /> :
			<main>
				<Navbar activePage="My Ideas" />

				<div className="px-4 lg:px-10 mt-10">
					<div className="flex">
						<h2 className="text-4xl fontMarkProMed mr-4">My Ideas</h2>
						<button className="text-xl px-4 py-1 fontMarkProMed bgRedOrange colorWhite"
							onClick={() => router.push("/myideas/add")}>Add Idea</button>
					</div>
					{ideas.length === 0 ?
						<p className="mt-8 text-lg fontInter">You still have no ideas registered.</p>
						:
						<>
							<FilterOptions titleValue={title} updateTitle={e => setTitle(e.currentTarget.value)} categories={categories} />
						</>
					}
				</div>
			</main>
	);
};

export default MyIdeas;