import Axios from 'axios';

const domain = 'http://localhost:8888';
const config = {
  baseURL: domain,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8', // 发送数据类型
    Authorization: 'Bearer' // 授权
  },
  method: 'get',
};

export const AxiosAPI = Axios.create(Object.assign({}, config, { // API
  baseURL: domain
}));