import appConfig from '@/config/app.config';

export default class globalMethods {
	public static setBaseUrl() {
		let baseUrl = '';
		switch (process.env.NODE_ENV) {
			case 'development':
				baseUrl = appConfig.HTTP_HOST_DEV;
				break;
			case 'ch':
				baseUrl = appConfig.HTTP_HOST_CH;
				break;
			default:
				baseUrl = appConfig.HTTP_HOST_PROD;
				break;
		}
		return baseUrl;
	}

	/**
	 * 将一个数据分割为多个小数组
	 * packagesparam data 数组
	 * packagesparam size 分割块数
	 */
	public static chunkArray(data: any[], size: number) {
		// 处理成len个一组的数据
		const data_len = data.length;
		const arrOuter_len =
			data_len % size === 0
				? data_len / size
				: parseInt(data_len / size + '') + 1;
		const arrSec_len = data_len > size ? size : data_len; // 内层数组的长度
		const arrOuter: any[] = new Array(arrOuter_len); // 最外层数组
		let arrOuter_index = 0; // 外层数组的子元素下标
		// console.log(data_len % len);
		for (let i = 0; i < data_len; i++) {
			if (i % size === 0) {
				arrOuter_index++;
				let len = arrSec_len * arrOuter_index;
				// 将内层数组的长度最小取决于数据长度对len取余，平时最内层由下面赋值决定
				arrOuter[arrOuter_index - 1] = new Array(data_len % size);
				if (arrOuter_index === arrOuter_len) {
					// 最后一组
					data_len % size === 0
						? (len = (data_len % size) + size * arrOuter_index)
						: (len = (data_len % size) + size * (arrOuter_index - 1));
				}
				let arrSec_index = 0; // 第二层数组的索引
				for (let k = i; k < len; k++) {
					// 第一层数组的开始取决于第二层数组长度*当前第一层的索引
					arrOuter[arrOuter_index - 1][arrSec_index] = data[k];
					arrSec_index++;
				}
			}
		}
		return arrOuter;
	}

	/**
	 * 字符串加密
	 * packagesparam name
	 */
	public static formatName(name: any) {
		let newStr: any = '';
		if (name.length === 2) {
			newStr = name.substr(0, 1) + '*';
		} else if (name.length > 2) {
			const char = '***';
			// for (let i = 0; i < name.length - 6; i++) {
			//   char += '*';
			// }
			newStr = name.substr(0, 3) + char + name.substr(-4, 4);
		} else {
			newStr = name;
		}

		return newStr;
	}

	public static getLocalTime(nS: string) {
		return new Date(parseInt(nS) * 1000)
			.toLocaleString()
			.replace(/:\d{1,2}$/, ' ');
	}
}
