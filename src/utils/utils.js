export default {
    formateDate(time){
        if(!time)return '';
        let date = new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    },
    pagination(data,callback){
      let total = data.length;
      return {
        onChange:(current)=>{//分页的回调函数，暂时没有用
          callback(current);
        },
        // current:data.result.page,
        pageSize:10,
        total: total,
        showTotal:()=>{
          return `共${total}条`
        },
        showQuickJumper:true
      }
    }
}