export interface RoadMapData {
	id?: string;
	name: string;
	children?: Array<any>;
}

export interface RoadMapDataItem {
	id: string;
	name: string;
	date?: string;
	done?: boolean;
	progress?: number;
	startDate?: string;
	endDate?: string;
}
