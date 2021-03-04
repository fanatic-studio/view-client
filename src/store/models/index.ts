export { default as account } from './account';
export { default as team } from './team';
export { default as project } from './project';
export { default as plan } from './plan';
export { default as application } from './application';
export { default as requirement } from './requirement';
export { default as milestone } from './milestone';
export { default as issues } from './issues';

export interface IResponse {
    ret: number;
    code?: string;
    msg?: string;
}

export interface IListParams {
    pageIndex?: number;
    pageSize?: number;
}
