type TOption = {
	label: string;
	key: string;
	children?: TOption[];
};
class Option {
	label: string;
	key: string;
	children?: TOption[];

	constructor(label: string, key: string, children?: TOption[]) {
		this.label = label;
		this.key = key;
		this.children = children;
	}
}
const OPTIONS = [
	new Option("1", "1", [
		new Option("1.0", "1.0"),
		new Option("1.1", "1.1", [
			new Option("1.1.1", "1.1.1"),
			new Option("1.1.2", "1.1.2"),
			new Option("1.1.3", "1.1.3", [new Option("1.1.3.1", "1.1.3.1"), new Option("1.1.3.2", "1.1.3.2")]),
		]),
		new Option("1.2", "1.2"),
	]),
	new Option("2", "2", [
		new Option("2.0", "2.0", [new Option("2.0.1", "2.0.1"), new Option("2.0.2", "2.0.2")]),
		new Option("2.1", "2.1"),
		new Option("2.2", "2.2"),
	]),
	new Option("3", "3", [new Option("3.0", "3.0"), new Option("3.1", "3.1"), new Option("3.2", "3.2")]),
];

export { OPTIONS };
