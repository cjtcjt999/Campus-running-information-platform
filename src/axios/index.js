// import JsonP from 'jsonp'
import axios from 'axios'
import {Modal} from 'antd'
export default class Axios{
    // static jsonp(options) {
    //     return new Promise((resolve, reject) => {
    //         JsonP(options.url, {
    //             param: 'callback'
    //         }, function (err, response) {
    //             if (response.code === 200) {
    //                 resolve(response);
    //                 console.log(response)
    //             } else {
    //                 reject(response.messsage);
    //             }
    //         })
    //     })
    // }

    static ajax(options){
      let loading;
      if(options.data && options.data.isShowLoading !=false){
        loading = document.getElementById('ajaxLoading');
        loading.style.display = 'block';
      }
      let baseApi = 'https://mock.yonyoucloud.com/mock/15265/xypt'
      return new Promise((resolve,reject)=>{
        axios({
          url:options.url,
          method:'get',
          data: {
            name: 'Fred'
          },
          baseURL:baseApi,
          timeout:5000,
          params:(options.data && options.data.params) ||''
        }).then((response)=>{
          if(options.data && options.data.isShowLoading !=false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'none';
          }
          if(response.status == '200'){
              let res = response.data;
              if(res.code == '200'){
                  resolve(res);
              }
              else{
                Modal.info({
                  title:"提示",
                  content:res.msg
                })
              }
          }
          else{
            reject(response.data);
          }
        })
      });
    }
}