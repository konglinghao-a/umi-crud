import axios from 'axios';


export const getList = (params: object) => {
  return axios.get('/api/courseList', { params })
  .then((res: any) => {
    //这里的数据类型要和定义的数据类型一致
    console.log(res);
  })
}