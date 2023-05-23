"use client";
import React from 'react'
import Select from "react-select";

function FilterOptions({ titleValue, categories, updateTitle, updateCategory, updateStatus, updateComplexity, updateSort }) {
	const categoriesList = categories.map(item => ({ value: item.category_id, label: item.category_name }))
	const statusList = ["On Voting", "Rejected", "Approved", "Waiting", "On Going", "Finished"].map(item => ({ value: item, label: item }));
	const complexityList = ["Easy", "Medium", "Hard"].map(item => ({ value: item, label: item }));
	const sortTypes = ["Name (A-Z)", "Name (Z-A)", "Creation (New-Old)", "Creation (Old-New)"].map(item => ({ value: item, label: item }));


	return (
		<section className="mt-6">
			<div className="flex items-center flex-wrap">
				<div className="flex items-center w-full md:w-4/12 mb-4">
					<label htmlFor="title" className="text-xl w-4/12 fontInterReg">Title:</label>
					<input id="title" className="border border-gray-300 border-solid rounded-sm sm:w-12/12 md:w-8/12 fontInterReg colorBlack px-2 py-1 md:mx-2 my-2 md:my-0"
						placeholder="Title to search" value={titleValue} onChange={updateTitle} />
				</div>

				<div className="flex items-center w-full md:w-4/12 mb-4 md:px-2">
					<label htmlFor="category" className="text-xl w-4/12 fontInterReg">Category:</label>
					<Select
						id="category" className="sm:w-12/12 md:w-8/12 fontInterReg colorBlack md:mx-2 my-2 md:my-0"
						closeMenuOnSelect={true} options={categoriesList} onChange={updateCategory}
					/>
				</div>

				<div className="flex items-center w-full md:w-4/12 mb-4">
					<label htmlFor="status" className="text-xl w-4/12 fontInterReg">Status:</label>
					<Select
						id="status" className="sm:w-12/12 md:w-8/12 fontInterReg colorBlack md:mx-2 my-2 md:my-0"
						closeMenuOnSelect={true} options={statusList} required onChange={updateStatus}
					/>
				</div>

				<div className="flex items-center w-full md:w-4/12 mb-4">
					<label htmlFor="complexity" className="text-xl w-4/12 fontInterReg">Complexity:</label>
					<Select
						id="complexity" className="sm:w-12/12 md:w-8/12 fontInterReg colorBlack md:mx-2 my-2 md:my-0"
						closeMenuOnSelect={true} options={complexityList} required onChange={updateComplexity}
					/>
				</div>

				<div className="flex items-center w-full md:w-4/12 mb-4 md:px-2">
					<label htmlFor="sort" className="text-xl w-4/12 fontInterReg">Sort by:</label>
					<Select
						id="sort" className="sm:w-12/12 md:w-8/12 fontInterReg colorBlack md:mx-2 my-2 md:my-0"
						closeMenuOnSelect={true} options={sortTypes} required onChange={updateSort}
					/>
				</div>
			</div>
		</section>
	);
};

export default FilterOptions;