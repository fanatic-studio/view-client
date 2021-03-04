export interface RouterItem {
  name?: string;
  component?: any;
  path: string;
  icon?: string;
  hidden?: boolean;
  permission?: string | string[] | boolean;
  redirect?: string | object;
  children?: RouterItem[];
  meta: metaModel;
}

export interface metaModel {
  label: string;
}
