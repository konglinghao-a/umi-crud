import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import { getList } from '@/services/courseApi';
const { Search } = Input;

const columns = [
  {
    title: '课程类别',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '课程名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '课程总价',
    dataIndex: 'totalPrice',
    key: 'totalPrice'
  },
  {
    title: '课程数量',
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: '课程地址',
    dataIndex: 'address',
    key: 'address',
    render: (text: string) => (
      <>
        <a target="blank" href={text}>查看课程</a>
      </>
    )
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    render: (record: { id: string }) => (
      <>
        <a>查看课程</a> &nbsp;
        <a>查看课程</a>
      </>
    )
  }
]

const index = () => {
  //定义类型
  interface Data {
    id: string;
    type: string;
    name: string;
    totalPrice: string;
    amount: string;
    address: string;
  }

  const [datas, setDatas] = useState<Data[]>([]);
  const [keywords, setKeywords] = useState('');

  useEffect(() => {
    getDatas({ keywords });
  }, [])

  const getDatas = (params: object) => {
    getList(params);
  }

  const handleSearch = (keywords: string) => {
    setKeywords(keywords);
    //搜索
    getDatas({ keywords })
  }

  return (
    <div>
      <Search 
        placeholder="请输入要搜索的值"
        onSearch={handleSearch}
        style={{width: 200}}
      />
      <Table columns={columns} dataSource={datas} rowKey={(datas: { id: string }) => datas.id} />
    </div>
  )
}
export default index;