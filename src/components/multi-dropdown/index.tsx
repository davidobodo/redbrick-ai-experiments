import { OPTIONS } from "./constants";
import { useCallback, useState, memo } from "react";

export default function Dropdown({ options = OPTIONS }) {
	const [selected, setSelected] = useState([]);
	const onSelectOption = useCallback((e, pos, selected) => {
		const { value, tree_key, tree_level } = e.target.dataset;
		const clonedState = JSON.parse(JSON.stringify(selected));
		clonedState.splice(pos, 1, {
			value,
			tree_key,
			tree_level,
		});

		// Clear other tree values
		const nextValue = clonedState[pos + 1];
		if (nextValue && (nextValue?.tree_key !== tree_key || nextValue?.tree_level !== tree_level)) {
			clonedState.length = pos + 1;
		}
		setSelected(clonedState);
	}, []);

	return (
		<div className="wrapper">
			<div
				style={{
					marginBottom: "30px",
				}}
			>
				{JSON.stringify(selected)}
			</div>
			<ul className="dropdown" onClick={onSelectOption}>
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
		<>
			<li
				value={value}
				data-value={value}
				data-tree_key={index}
				data-tree_level={pos}
				className={isSelected ? "selected option" : "option"}
				onClick={(e) => {
					e.stopPropagation();
					onSelectOption(e, pos, selected);
				}}
			>
				{label} - <span style={{ color: "blue" }}>{pos}</span>
			</li>
			{isSelected && children?.length > 0 ? (
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
		</>
	);
});
