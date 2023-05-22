"use client";

import React from 'react'

function FilterOptions({ titleValue, updateTitle, categories }) {
	const statusList = ["New", "On Voting", "Rejected", "Approved", "Waiting", "On Going", "Finished"];
	const complexityList = ["Easy", "Medium", "Hard"];
	const sortTypes = ["Name (A-Z)", "Name (Z-A)", "Creation (New-Old)", "Creation (Old-New)"];

	return (
		<section className="mt-6">
			<div className="flex items-center flex-wrap">
				<div className="flex items-center w-full md:w-4/12 mb-4">
					<label htmlFor="title" className="text-xl w-4/12 fontInterReg">Title:</label>
					<input id="title" className="border border-black border-solid rounded-sm w-8/12 fontInterReg colorBlack px-2 py-1 mx-2"
						placeholder="Title to search" value={titleValue} onChange={updateTitle} />
				</div>

				<div className="flex items-center w-full md:w-4/12 mb-4">
					<label htmlFor="category" className="text-xl w-4/12 fontInterReg">Category:</label>
					<select id="category" class="border border-black border-solid rounded-sm w-8/12 fontInterReg colorBlack px-2 py-2 mx-2">
						<option selected>Choose a category</option>
						{categories.map((category, index) => <option key={index} value={category.category_id}>{category.category_name}</option>)}
					</select>
				</div>

				<div className="flex items-center w-full md:w-4/12 mb-4">
					<label htmlFor="status" className="text-xl w-4/12 fontInterReg">Status:</label>
					<select id="status" class="border border-black border-solid rounded-sm w-8/12 fontInterReg colorBlack px-2 py-2 mx-2">
						<option selected>Choose a status</option>
						{statusList.map((status, index) => <option key={index} value={status}>{status}</option>)}
					</select>
				</div>

				<div className="flex items-center w-full md:w-4/12 mb-4">
					<label htmlFor="complexity" className="text-xl w-4/12 fontInterReg">Complexity:</label>
					<select id="complexity" class="border border-black border-solid rounded-sm w-8/12 fontInterReg colorBlack px-2 py-2 mx-2">
						<option selected>Choose a complexity</option>
						{complexityList.map((complexity, index) => <option key={index} value={complexity}>{complexity}</option>)}
					</select>
				</div>

				<div className="flex items-center w-full md:w-4/12 mb-4">
					<label htmlFor="sort" className="text-xl w-4/12 fontInterReg">Sort by:</label>
					<select id="complexity" class="border border-black border-solid rounded-sm w-8/12 fontInterReg colorBlack px-2 py-2 mx-2">
						<option selected>Choose a sort type</option>
						{sortTypes.map((sortType, index) => <option key={index} value={sortType}>{sortType}</option>)}
					</select>
				</div>
			</div>

		</section>
	)
}

export default FilterOptions;