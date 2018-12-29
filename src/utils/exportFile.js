/*
 * @Author: wyx 
 * @Date: 2018-12-27 14:16:13 
 * @Last Modified by: wyx
 * @Last Modified time: 2018-12-27 14:16:47
 * @description 导出文件
 */
import FileSaver from 'file-saver';
export default {
    /**
     * 导出Excel文件
     * @param {*} res   文件流
     * @param {*} name  文件名
     */
	getExcel(res,name){
        let blob = new Blob([res], {type: "application/vnd.ms-excel"});
        FileSaver.saveAs(blob,name+".xlsx");
    }
}