"use client";
import { useEffect, useState } from "react";

import api from "../services/api";

import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import BoxContainer from "../components/BoxContainer";

function Home() {
	const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	const todayDate = new Date();

	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState({});
	const [userIdeas, setUserIdeas] = useState([]);
	const [userTasks, setUserTasks] = useState([]);

	useEffect(() => {
		async function fetchUser() {
			let response = await api.get("/users/me",
				{ headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } });
			if (response.status === 200) {
				setUser(response.data.user);
				setUserIdeas(response.data.ideas);
				setUserTasks(response.data.tasks);
			}
			setLoading(false);
		}
		fetchUser();
	}, []);

	return (
		loading ? <Loading /> :
			<main>
				<Navbar activePage="Home" />
				<div className="my-16 flex flex-col items-center">
					<span className="text-xl mb-4 fontInterReg">{weekday[todayDate.getDay()]}, {month[todayDate.getMonth()]} {todayDate.getDate()}</span>
					<span className="text-4xl fontMarkProMed">Hi {user.user_name}!</span>
				</div>

				<section className="mx-10">
					<h2 className="text-3xl mb-4 fontMarkProMed">My Ideas</h2>
					<div className="flex flex-col md:flex-row">
						<BoxContainer header="Total" number={userIdeas.length} />
						<BoxContainer header="New ideas" number={userIdeas.filter(idea => idea.idea_status === "New").length} />
						<BoxContainer header="On voting" number={userIdeas.filter(idea => idea.idea_status === "On Voting").length} />
						<BoxContainer header="On going" number={userIdeas.filter(idea => idea.idea_status === "On Going").length} />
					</div>
				</section>

				<section className="mx-10">
					<h2 className="text-3xl mb-4 fontMarkProMed">My Tasks</h2>
					<div className="flex flex-col md:flex-row">
						<BoxContainer header="Total" number={userTasks.length} />
						<BoxContainer header="To do" number={userTasks.filter(task => task.task_status === "To Do").length} />
						<BoxContainer header="On going" number={userTasks.filter(task => task.task_status === "Doing").length} />
						<BoxContainer header="Done" number={userTasks.filter(task => task.task_status === "Done").length} />
					</div>
				</section>
			</main>
	);
};

export default Home;