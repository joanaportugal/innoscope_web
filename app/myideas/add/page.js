"use client"
import { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { toast, ToastContainer } from "react-toastify";

import Loading from "@/app/components/Loading";
import Navbar from "@/app/components/Navbar";
import api from "@/app/services/api";

import "react-toastify/dist/ReactToastify.css";

function AddIdea() {
	const complexityList = ["Easy", "Medium", "Hard"].map(item => ({ value: item, label: item }));
	const animatedComponents = makeAnimated();

	const [loading, setLoading] = useState(true);
	const [categories, setCategories] = useState([]);
	const [technologies, setTechnologies] = useState([]);
	const [users, setUsers] = useState([]);

	const [ideaTitle, setIdeaTitle] = useState("");
	const [ideaSummary, setIdeaSummary] = useState("");
	const [ideaDescription, setIdeaDescription] = useState("");
	const [ideaCategory, setIdeaCategory] = useState("");
	const [ideaComplexity, setIdeaComplexity] = useState("");
	const [ideaDuration, setIdeaDuration] = useState("");
	const [ideaTechnologies, setIdeaTechnologies] = useState([]);
	const [ideaCoauthors, setIdeaCoauthors] = useState([]);
	const [ideaDetails, setIdeaDetails] = useState("");

	useEffect(() => {
		async function fetchInfo() {
			let responseCategories = await api.get("/categories",
				{ headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } });
			if (responseCategories.status === 200) {
				let list = responseCategories.data.categories;
				setCategories(list.map(item => ({ value: item.category_id, label: item.category_name })));
			}

			let responseTechnologies = await api.get("/technologies",
				{ headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } });
			if (responseTechnologies.status === 200) {
				let list = responseTechnologies.data.technologies;
				setTechnologies(list.map(item => ({ value: item.technology_id, label: item.technology_name })));
			}

			let responseUsers = await api.get("/users",
				{ headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } });
			if (responseUsers.status === 200) {
				let list = responseUsers.data.users;
				setUsers(list.filter(item => item.user_name !== localStorage.getItem("userName")).map(item => ({ value: item.user_id, label: item.user_name })));
			}
			setLoading(false);
		}
		fetchInfo();
	}, []);

	const handleChangeTechnologies = (e) => setIdeaTechnologies(Array.isArray(e) ? e.map(x => x.value) : []);

	const handleChangeCoauthors = (e) => setIdeaCoauthors(Array.isArray(e) ? e.map(x => x.value) : []);

	const sendIdea = () => {
		let item = {
			title: ideaTitle,
			summary: ideaSummary,
			description: ideaDescription,
			category: ideaCategory,
			complexity: ideaComplexity,
			duration: ideaDuration,
			technologies: ideaTechnologies
		};
		if (ideaCoauthors.length !== 0) item.coauthors = ideaCoauthors;
		if (ideaDetails) item.details = ideaDetails;

		setLoading(true);
		api.post("/users/me/ideas", item, { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } })
			.then(res => toast(res.data.message, { hideProgressBar: true, autoClose: 5000, type: "success", position: toast.POSITION.BOTTOM_LEFT }))
			.catch(({ response }) => {
				if (response.data.errors) {
					for (const error of response.data.errors) {
						toast(error, { hideProgressBar: true, autoClose: 5000, type: "error", position: toast.POSITION.BOTTOM_LEFT });
					}
				}
				else {
					toast(response.data.error, { hideProgressBar: true, autoClose: 5000, type: "error", position: toast.POSITION.BOTTOM_LEFT });
				}
			});

		setLoading(false);
	}

	return (
		loading ? <Loading /> :
			<main>
				<Navbar activePage="My Ideas" />

				<div className="px-4 lg:px-10 mt-10">
					<h2 className="text-4xl fontMarkProMed mr-4">Add Idea</h2>

					<form className="mt-6 flex justify-between flex-wrap">
						<section className="w-full md:w-6/12">
							<div className="flex flex-col md:flex-row mb-4">
								<label htmlFor="title" className="text-xl w-3/12 fontInterReg">Title:*</label>
								<input id="title"
									className="border border-gray-300 border-solid rounded-sm sm:w-12/12 md:w-8/12 fontInterReg colorBlack px-2 py-1 md:mx-2 my-2 md:my-0"
									placeholder="Idea title" required
									value={ideaTitle} onChange={e => setIdeaTitle(e.currentTarget.value)}
								/>
							</div>

							<div className="flex flex-col md:flex-row mb-4">
								<label htmlFor="summary" className="text-xl w-3/12 fontInterReg">Summary:*</label>
								<textarea id="summary"
									className="border border-gray-300 border-solid rounded-sm sm:w-12/12 md:w-8/12 fontInterReg colorBlack px-2 py-1 md:mx-2 my-2 md:my-0"
									placeholder="Idea summary" rows={5} required
									value={ideaSummary} onChange={e => setIdeaSummary(e.currentTarget.value)}></textarea>
							</div>

							<div className="flex flex-col md:flex-row mb-4">
								<label htmlFor="description" className="text-xl w-3/12 fontInterReg">Description:*</label>
								<textarea id="description"
									className="border border-gray-300 border-solid rounded-sm sm:w-12/12 md:w-8/12 fontInterReg colorBlack px-2 py-1 md:mx-2 my-2 md:my-0"
									placeholder="Idea description" rows={5} required
									value={ideaDescription} onChange={e => setIdeaDescription(e.currentTarget.value)}></textarea>
							</div>

							<div className="flex flex-col md:flex-row mb-4">
								<label htmlFor="category" className="text-xl w-3/12 fontInterReg">Category:*</label>
								<Select
									id="category" className="sm:w-12/12 md:w-8/12 fontInterReg colorBlack md:mx-2 my-2 md:my-0"
									closeMenuOnSelect={true} options={categories} required onChange={(choice) => setIdeaCategory(choice.value)}
								/>
							</div>
						</section>

						<section className="w-full md:w-6/12">
							<div className="flex flex-col md:flex-row mb-4">
								<label htmlFor="complexity" className="text-xl w-3/12 fontInterReg">Complexity:*</label>
								<Select
									id="complexity" className="sm:w-12/12 md:w-8/12 fontInterReg colorBlack md:mx-2 my-2 md:my-0"
									closeMenuOnSelect={true} options={complexityList} required onChange={(choice) => setIdeaComplexity(choice.value)}
								/>
							</div>

							<div className="flex flex-col md:flex-row mb-4">
								<label htmlFor="duration" className="text-xl w-3/12 fontInterReg">Duration:*</label>
								<input id="duration"
									className="border border-gray-300 border-solid rounded-sm sm:w-12/12 md:w-8/12 fontInterReg colorBlack px-2 py-1 md:mx-2 my-2 md:my-0"
									placeholder="Idea duration (in weeks)" type="number" min={1} required
									value={ideaDuration} onChange={e => setIdeaDuration(e.currentTarget.value)} />
							</div>

							<div className="flex flex-col md:flex-row mb-4">
								<label htmlFor="technologies" className="text-xl w-3/12 fontInterReg">Technologies:*</label>
								<Select
									id="technologies" className="sm:w-12/12 md:w-8/12 fontInterReg colorBlack md:mx-2 my-2 md:my-0"
									closeMenuOnSelect={false} components={animatedComponents} isMulti options={technologies} required
									value={technologies.filter(obj => ideaTechnologies.includes(obj.value))} onChange={handleChangeTechnologies}
								/>
							</div>

							<div className="flex flex-col md:flex-row mb-4">
								<label htmlFor="coauthors" className="text-xl w-6/12 md:w-3/12 fontInterReg">Co-author(s):</label>
								<Select
									id="coauthors" className="sm:w-12/12 md:w-8/12 fontInterReg colorBlack md:mx-2 my-2 md:mx-2 my-2 md:my-0"
									closeMenuOnSelect={false} components={animatedComponents} isMulti options={users}
									value={users.filter(obj => ideaCoauthors.includes(obj.value))} onChange={handleChangeCoauthors}
								/>
							</div>

							<div className="flex flex-col md:flex-row mb-4">
								<label htmlFor="details" className="text-xl w-6/12 md:w-3/12 fontInterReg">Other details:</label>
								<textarea id="details"
									className="border border-gray-300 border-solid rounded-sm sm:w-12/12 md:w-8/12 fontInterReg colorBlack px-2 py-1 md:mx-2 my-2 md:my-0"
									placeholder="Idea extra details" rows={5}
									value={ideaDetails} onChange={e => setIdeaDetails(e.currentTarget.value)}></textarea>
							</div>
						</section>

						<div className="flex justify-end w-full">
							<button className="w-11/12 md:w-2/12 bgRedOrange colorWhite fontInter text-xl text-left px-2 py-1 md:mx-8"
								onClick={(e) => {
									e.preventDefault();
									sendIdea();
								}}>Submit</button>
						</div>
					</form>
				</div>

				<ToastContainer />
			</main>
	);
};

export default AddIdea;