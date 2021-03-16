export interface RouterItem {
	id: string;
	name?: string;
	public?: boolean;
	path: string;
	component?: any;
	icon?: string;
	hidden?: boolean;
	permission?: string | string[] | boolean;
	redirect?: string | object;
	children?: RouterItem[];
	meta?: metaModel;
	alias?: string;
	module?: Array<string>;
}

export interface metaModel {
	label: string;
}
