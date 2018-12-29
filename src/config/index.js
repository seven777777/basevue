//系统配置文件，
let apiPath = '';
if (process.env.NODE_ENV == 'development') {
  apiPath = 'http://localhost:9992/';

} else if (process.env.NODE_ENV == 'production') {

  apiPath = "";
}


export default {
  apiPath
}
