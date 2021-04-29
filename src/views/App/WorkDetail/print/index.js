import { getLodop } from './Lodop.js' //这块就是引用的上面一大坨暴露出来的方法喽

const PrintAccount = (elemt) => {
	// let qrAccount = `${url}/#/?type=${codetype}&code=${code}`
	// 调用打印对象
	LODOP = getLodop()

    LODOP.SET_PRINT_PAGESIZE(2, '148mm', '210mm');
    var html = document.getElementById(elemt).innerHTML;
    LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", html);
    //LODOP.PREVIEW();
    LODOP.PRINT();
}

export { PrintAccount }