import axios from "../utils/request";
import base from "./base";

const api={
    //登录
    getLogin(params){
        // console.log(base.baseUrl + base.login);
        return axios.post(base.baseUrl + base.login,params);
    },
    //商品查询
    getSelectTbItemAllByPage(params){
        return axios.get(base.baseUrl + base.selectTbItemAllByPage,{
            params:params
        })
    },
    getTotal(){
        return axios.get(base.baseUrl + base.total)
    },
    /**
     * 商品删除接口
     */
     getDeleteItemById(params){
        return axios.get(base.baseUrl + base.deleteItemById,{
            params:params
        })
    },
    postAddItem(params){
        return axios.post(base.baseUrl+base.addItem,params)
    }
}

export default api;