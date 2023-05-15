import "./styles.css"

function BoxContainer({ header, text }) {
	return (
		<div className="m-12/12 md:w-3/12 mb-6 md:mr-6 rounded-sm boxContainer">
			<div className="rounded-sm bgGrey p-2">
				<p className="text-2xl fontMarkProMed">{header}</p>
			</div>
			<div className="p-2">
				<p className="text-lg px-2 fontInterReg">{text}</p>
			</div>
		</div>
	)
}

export default BoxContainer;