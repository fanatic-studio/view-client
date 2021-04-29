import localStore from '@/localStore';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosPromise } from 'axios';
import qs from 'qs';
const noAuthApi = ['/login', '/api/v1/getCaptcha'];

export default class AxiosRequest {
    private timeOut = 5000;
    private url: string;
    private instance: AxiosInstance;

    constructor(baseUrl: string) {
        this.url = baseUrl;
        this.instance = axios.create();
        // 响应时间
        this.instance.defaults.timeout = this.timeOut;
        // 配置请求头
        this.instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        // 配置接口url
        this.instance.defaults.baseURL = this.url;
        this.interceptors(this.instance);
    }

    private interceptors(instance: AxiosInstance) {
        // 请求拦截
        instance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                const accountToken = localStorage.getItem('AccountToken');
                if (accountToken) {
                    config.headers['Authorization'] = `Bearer ${accountToken}`;
                }
                // 添加全局的loading...
                return config;
            },
            (error: any) => {
                console.error(error);
            }
        );

        // 响应拦截
        instance.interceptors.response.use(
            (res: AxiosResponse) => {
                const { data, status } = res;
                // 请求成功
                if (status === 200) {
                    return Promise.resolve(res);
                } else {
                    // 失败回调
                    return this.requestFail(res);
                }
            },
            (error: any) => {
                console.error(error);
            }
        );
    }

    private requestFail(res: AxiosResponse): AxiosPromise {
        return Promise.reject(res);
    }

    private apiToUrl(api: string): string {
        if (api === "/login/phone" || api==="/login/verifyCode") {
			const url = "http://192.168.11.168:7018" + api; // http://cs.daieco.com http://192.168.11.168:7018
			return url;
		} else {
			const url = 'http://192.168.11.168:7020' + api;  // http://packing.daieco.com http://192.168.11.168:7020
			return url;
		}
        return this.url + api;
    }

    private updateParams(params: any): any {
        return {
            ...params
        };
    }
    
     private async updateHeaders(params: any, api: string) {
        let hData: any = {}
        const noAuthApi = [
            "/login/phone",
            "/login/verifyCode"
        ];
        hData = {
			appKey: "ABBBD884A51C42D87099AFE63453141E",
            packingStationCode:"001"
		};
		let checkApiAuth = noAuthApi.indexOf(api) > -1;
		if (!checkApiAuth) {
            const accountToken = await localStore.getItem('AccountToken');
            hData.token = accountToken
		} 
        return hData;
	}

    public async postData(api: string, param?: any): Promise<any> {
        const paramsData = this.updateParams(param);
        const paramStr = qs.stringify(paramsData);
        const header = await this.updateHeaders(param, api);        
        return new Promise((resolve, reject) => {
            this.instance
                .request({
                    headers: header,
                    method: 'POST',
                    url: this.apiToUrl(api),
                    data: paramStr
                })
                .then(
                    (response) => {
                        if (response.data.code === 200) {
                            resolve(response.data);
                        } else {
                            reject({
                                code: response.data.code,
                                msg: response.data.msg
                            });
                        }
                    },
                    (err) => {
                        reject(err);
                    }
                )
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public async getData(api: string, param?: any): Promise<any> {
        const paramsData = this.updateParams(param);
        const header = await this.updateHeaders(param, api);
        return new Promise((resolve, reject) => {
            this.instance
                .request({
                    headers: header,
                    method: 'GET',
                    url: this.apiToUrl(api),
                    params: paramsData
                })
                .then(
                    (response) => {
                        if (response) {
                            if (response.data.id) {
                                resolve(response.data);
                            } else if (response.data.code === 200) {
                                resolve(response.data.data);
                            } else {
                                resolve(response.data);
                            }
                        } else {
                            reject('获取数据失败，请重试（404）');
                        }
                    },
                    (err) => {
                        reject(err);
                    }
                )
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
