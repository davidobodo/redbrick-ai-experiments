import { OPTIONS } from "./constants";
import { useCallback, useState, memo } from "react";

export default function Dropdown({ options = OPTIONS }) {
	const [selected, setSelected] = useState<{ value: string; tree_key: string; tree_level: string }[]>([]);
	const onSelectOption = useCallback((e, pos, selected) => {
		const { value, tree_key, tree_level } = e.currentTarget.dataset;

		const newTree = [
			{
				value,
				tree_key,
				tree_level,
			},
		];

		let curr = e.currentTarget;
		while (curr.parentElement.className !== "dropdown") {
			curr = curr.parentElement;
			if (curr.dataset.value) {
				newTree.push({ ...curr.dataset });
			}
		}

		setSelected(newTree.reverse());

		// const clonedState = JSON.parse(JSON.stringify(selected));
		// clonedState.splice(pos, 1, {
		// 	value,
		// 	tree_key,
		// 	tree_level,
		// });

		// // Clear other tree values
		// const nextValue = clonedState[pos + 1];
		// if (nextValue && (nextValue?.tree_key !== tree_key || nextValue?.tree_level !== tree_level)) {
		// 	clonedState.length = pos + 1;
		// }

		// setSelected(clonedState);
	}, []);

	const [inputValue, setInputValue] = useState("");
	const handleChange = (e) => {
		const { value } = e.target;
		setInputValue(value);
		/**
		 * METHOD 1
		 * Go through every tree everytime
		 *
		 * METHOD 2
		 * Precomputation
		 */
	};

	return (
		<div className="wrapper">
			<input type="text" placeholder="Search" value={inputValue} onChange={handleChange} />
			<div className="display-selected">{JSON.stringify(selected)}</div>
			<ul className="dropdown">
				{options.map((item, index) => {
					const { label, key, children } = item;
					return (
						<Option
							key={key}
							value={key}
							label={label}
							children={children}
							pos={0}
							onSelectOption={onSelectOption}
							isSelected={selected[0]?.value === key}
							selected={selected}
							index={index}
						/>
					);
				})}
			</ul>
		</div>
	);
}

const Option = memo(({ value, label, children, pos, onSelectOption, selected, isSelected, index }) => {
	return (
		<li
			value={value}
			data-value={value}
			data-tree_key={index}
			data-tree_level={pos}
			className="option"
			onClick={(e) => {
				e.stopPropagation();
				onSelectOption(e, pos, selected);
			}}
		>
			<span className={isSelected ? "selected label" : "label"}>
				{label} - <span style={{ color: "blue" }}>{pos}</span>
			</span>
			{/* {isSelected && children?.length > 0 ? ( */}
			{(selected.length === 0 || isSelected) && children?.length > 0 ? (
				<ul className="option-children">
					{children.map((item) => {
						const { label, key, children } = item;
						return (
							<Option
								key={key}
								value={key}
								label={label}
								children={children}
								pos={pos + 1}
								onSelectOption={onSelectOption}
								isSelected={selected[pos + 1]?.value === key}
								selected={selected}
								index={index}
							/>
						);
					})}
				</ul>
			) : (
				<></>
			)}
		</li>
	);
});
