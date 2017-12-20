# sqltest

> testsql

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


#使用vue+mysql+express实现前后端分离的实例
#server部分是后端
在sql文件中写入的是用于处理数据库的语句
db文件负责连接数据库
userApi文件写入了连接数据库，利用pool，连接sql语句写成api
index负责调用api，启动后台文件
#src部分是前端
#弊端是无法用一条命令实现前后端一起构建，解决方法是有的，还未写入
