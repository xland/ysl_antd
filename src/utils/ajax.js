import Axios from 'axios'
const ajax = Axios.create({
  baseURL:"http://localhost:51121/",
  timeout:59418,
  method: 'post',

});
export default ajax;
