"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../services/api";

import Navbar from "../components/Navbar";
import FilterOptions from "../components/FilterOptions";
import Loading from "../components/Loading";
import BoxContainer from "../components/BoxContainer";
import PrevBtn from "../components/Icons/PrevBtn";
import NextBtn from "../components/Icons/NextBtn";

function MyIdeas() {
	const [loading, setLoading] = useState(true);
	const [categories, setCategories] = useState([]);
	const [ideas, setIdeas] = useState([]);
	const [pagination, setPagination] = useState([]);

	const [filterTitle, setFilterTitle] = useState("");
	const [filterCategory, setFilterCategory] = useState("");
	const [filterStatus, setFilterStatus] = useState("");
	const [filterComplexity, setFilterComplexity] = useState("");
	const [filterSort, setFilterSort] = useState("");

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
							<FilterOptions titleValue={filterTitle}
								categories={categories}
								updateTitle={e => setFilterTitle(e.currentTarget.value)}
								updateCategory={(choice) => setFilterCategory(choice.value)}
								updateStatus={(choice) => setFilterStatus(choice.value)}
								updateComplexity={(choice) => setFilterComplexity(choice.value)}
								updateSort={(choice) => setFilterSort(choice.value)}
							/>
							<div className="flex flex-col md:flex-row flex-wrap mt-8">
								{ideas.map((idea, index) => <BoxContainer key={index} header={idea.idea_title} status={idea.idea_status} category={idea.category} />)}
							</div>

							<div className="w-full flex justify-center mt-4">
								{pagination.prev_page && <button className="bgRedOrange px-4 py-1"><PrevBtn /></button>}
								<span className="px-2">{pagination.curr_page}/{pagination.last_page}</span>
								{pagination.next_page && <button className="bgRedOrange px-4 py-1"><NextBtn /></button>}
							</div>
						</>
					}
				</div>
			</main>
	);
};

export default MyIdeas;