import "./styles.css"

function BoxContainer({ header, number, status, category }) {
	return (
		<div className={number ? "m-12/12 md:w-3/12 mb-6 md:mr-6 rounded-sm boxContainer" : "m-12/12 md:w-80 mb-6 mr-6 rounded-sm boxContainer"}>
			<div className="rounded-sm bgGrey p-2">
				<p className="text-2xl fontMarkProMed">{header}</p>
			</div>
			<div className="p-2">
				{number && <p className="text-lg px-2 fontInterReg">{number}</p>}
				{status && <p className="text-lg px-2 fontInterReg">
					<span className="text-lg fontInterSB">Status: </span>{status}
				</p>}
				{category && <p className="text-lg px-2 fontInterReg">
					<span className="text-lg fontInterSB">Category: </span>{category}
				</p>}
			</div>
		</div>
	)
}

export default BoxContainer;