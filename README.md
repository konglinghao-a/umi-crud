# 安装umi 3

```
yarn global add umi
umi -v
```

此时运行 `umi-v`的时候可能会出现'umi' 不是内部或外部命令的错误，我们可以在cmd中通过`yarn global bin`获取路径，再将此路径添加到环境变量中即可。

# 搭建项目

```
yarn create @umijs/umi-app
```

此时搭建的项目还是没有依赖的，因此需要通过命令`yarn install`来安装。安装完了依赖以后就可以通过命令`yarn start`来启动项目。关于搭建好的目录结构可以看官方文档[https://umijs.org/zh-CN/docs/directory-structure#mock-%E7%9B%AE%E5%BD%95](https://umijs.org/zh-CN/docs/directory-structure#mock-目录)。

## 配置环境变量env

在根目录下创建一个`.env`文件。

```
PORT=8899		--配置端口号
```

这样配置了以后，等到项目启动的时候它就会经过环境变量，比如设置了端口后，他最后启动了就运行在8899端口号。

# umi中使用antd

umi直接集成了antd，因此直接用就行。

# 路由跳转

定义路由的时候 `@`表示文件`src`。相对路径会从`src/pages`开始找起

```javascript
// .umirc.ts
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/', 
      component: '@/layout/index',
      //定义子路由
      routes: [
        {
          path: '/',
          redirect: '/path'
        },
        {
          path: "/course",
          component: "./Course"
        },
        {
          path: "/about",
          component: "./About"
        }
      ],
    }
  ],
});


```

```javascript
import React from 'react';
import { Layout, Menu } from 'antd';
import styles from './index.less';
import { Link, useHistory } from 'umi';


const { Header, Content, Footer, Sider } = Layout;

const index = (props: {children: React.ReactNode}) => {
  //通过location拿到路径，再将路径给menu的selectedKeys，这样就实现了不写死选中
  const { location } = useHistory();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className={styles.logo} >konglinghao</div>
        <Menu
          selectedKeys={[location.pathname]}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="/course">
            <Link to="/course">课程记录</Link>
          </Menu.Item>
          <Menu.Item key="/about">
            <Link to="/about">关于我们</Link>
          </Menu.Item>
        </Menu>

      </Sider>
      <Layout className={styles['site-layout']}>
        <Header className={styles['site-layout-background']} />
        <Content className={styles['site-layout-background']} style={{
          margin: '24px 16px',
          padding: 24, minHeight: 'max-content'
        }}>
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>curd page ©2020 created by xue yi</Footer>
      </Layout>

    </Layout>
  )
}

export default index;
```

# mock

可以参照官方文档 <https://umijs.org/zh-CN/docs/mock>。

```javascript
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
  }
]

export default {
  "/api/courseList": courseList
}
```

数据的请求

```javascript
    axios.get('/api/courseList').then((res: any) => {
      setDatas(res.data);
    })
```

# 表格的渲染

```javascript
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios, { AxiosResponse } from 'axios';

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
        <a>查看课程</a>
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
  useEffect(() => {
    getDatas();
  }, [])

  const getDatas = () => {
    axios.get('/api/courseList').then((res: AxiosResponse<Data[]>) => {
      //这里的数据类型要和定义的数据类型一致
      setDatas(res.data);
    })
  }



  return (
    <div>
      <Table columns={columns} dataSource={datas} rowKey={(datas: { id: string }) => datas.id} />
    </div>
  )
}
export default index;
```

