import "./styles.css"

function Loading() {
	return (
		<div className="loading h-screen flex flex-col justify-center items-center bgRedOrange">
			<div className="flex mb-8 lg:mb-4">
				<div className="dot w-8 h-8 m-4 rounded-full"></div>
				<div className="dot w-8 h-8 m-4 rounded-full"></div>
				<div className="dot w-8 h-8 m-4 rounded-full"></div>
				<div className="dot w-8 h-8 m-4 rounded-full"></div>
			</div>
			<p className="text-xl colorWhite fontMarkProMed">Loading your information...</p>
		</div>
	);
};

export default Loading;