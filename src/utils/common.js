
/**
 * 获取当前时间
 * @param fmt 格式化字符串
 */
export function getNowTime(fmt = 'yyyy-MM-dd hh:mm:ss') {
  Date.prototype.format = function (fmt) {
    let o = {
      'M+': this.getMonth() + 1, //月份
      'd+': this.getDate(), //日
      'h+': this.getHours(), //小时
      'm+': this.getMinutes(), //分
      's+': this.getSeconds(), //秒
      'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
      S: this.getMilliseconds(), // 毫秒
    }

    // 根据y的长度来截取年
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (this.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
    }
    return fmt
  }
  let NowTime = new Date().format(fmt)
  return NowTime
}

/** 随机生成固定位数或者一定范围内的字符串数字组合
 * @param {Number} min 范围最小值
 * @param {Number} max 范围最大值，当不传递时表示生成指定位数的组合
 * @param {String} charStr指定的字符串中生成组合
 * @returns {String} 返回字符串结果
 * */
export function randomWord(min=10, max=20, charStr){
 var returnStr = "",
  range;
  if(typeof max == 'string'){
   charStr = max;
  }
  range = ((max && typeof max == 'number') ? Math.round(Math.random() * (max-min)) + min : min);
  charStr = charStr || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 for(var i=0; i<range; i++){
  var index = Math.round(Math.random() * (charStr.length-1));
  returnStr += charStr.substring(index,index+1);
 }
 return returnStr;
}


// 数组拍平
export function flatHandle(arr) {
  let temparr = []
  arr.forEach((item) => {
    temparr.push(item)
    Array.isArray(item.children) &&
      item.children.forEach((temp) => temparr.push(temp))
  })
  return temparr
}

// 路径
export function pushrouter(text, routes) {
  let arr = []
  routes.forEach((A) => {
    if (A.path == text) {
      arr.push(A)
    } else if (Array.isArray(A.children)) {
      A.children.forEach((B) => {
        if (B.path == text) {
          arr.push(A)
          arr.push(B)
        }
      })
    }
  })
  return arr
}

// 检验请求是是否成功
export function checkStatus(text) {
  return /^[23]\d{2}$/.test(text)
}

// 数组拼接字符串请求路径
export function awaryToUrl(awary, param) {
  // ?blogscondition=1&blogscondition=2
  let result = awary.reduce((pre, cur) => {
    pre = `${param}=` + cur + '&' + pre
    return pre
  }, '')
  result = '?' + result.substr(0, result.length - 1)
  return result
}

// 读取JSON文件
export function  readJsonFile(){
  return new Promise(function(resolve, reject) {
    window.onload = function () {
        var url = "./BackGround.json"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
        var request = new XMLHttpRequest();
        request.open("get", url);/*设置请求方法与路径*/
        request.send(null);/*不发送数据到服务器*/
        request.onload = function () {/*XHR对象获取到返回信息后执行*/
            if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
                var json = JSON.parse(request.responseText);
                for(var i=0;i<json.length;i++){
                    console.log(json[i].name);
                }
                resolve(json)
            }
        }
    }
})
}