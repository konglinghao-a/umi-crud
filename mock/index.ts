//ts中提供的定义类型
type CourseList = {
  id: string;
  type: string;
  name: string;
  totalPrice: string;
  amount: string;
  address: string;
}

let courseList: CourseList[] = [
  {
    id: "1",
    type: "React",
    name: "dvajs",
    totalPrice: "￥38",
    amount: "999",
    address: "http://www.baidu.com"
  },
  {
    id: "2",
    type: "React2",
    name: "dvajs2",
    totalPrice: "￥38",
    amount: "999",
    address: "http://www.baidu.com"
  },
  {
    id: "3",
    type: "React3",
    name: "dvajs3",
    totalPrice: "￥38",
    amount: "999",
    address: "http://www.baidu.com"
  },
  {
    id: "4",
    type: "React4",
    name: "dvajs4",
    totalPrice: "￥38",
    amount: "999",
    address: "http://www.baidu.com"
  },
  {
    id: "5",
    type: "React5",
    name: "dvajs5",
    totalPrice: "￥38",
    amount: "999",
    address: "http://www.baidu.com"
  },
  {
    id: "6",
    type: "React6",
    name: "dvajs6",
    totalPrice: "￥38",
    amount: "999",
    address: "http://www.baidu.com"
  }
]

//获取路径参数
function getUrlParams(url: string, key: string) {
  // 获取参数
  var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)'); //匹配目标参数
  var result = url.split("?")[1].match(reg); //返回参数值
  var keywords = result ? decodeURIComponent(result[2]) : '';
  return keywords;
}

const getCourseList = (req: {url: string}, res: any) => {
  let keywords = getUrlParams(req.url, 'keywords');
  let fileterList = !keywords || keywords === '' ? courseList : 
  courseList.filter((item: { type: string; name: string }) => {
    return item.type.includes(keywords) || item.name.includes(keywords);
  })
  res.send({
    success: true,
    datas: fileterList,
    keywords: keywords
  })
}

export default {
  "/api/courseList": getCourseList
}