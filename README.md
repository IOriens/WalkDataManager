## Intro
阿西，移动智能终端作业, 等复习完了再好好改改readme

## 技术栈
前端：weex + webpack

后端: koa2 + koa-router + koa-jwt + mongoose

## How to run
```
# clone this repo
# cd to this repo on your pc
# install node and npm
# install and start mongodb

# run server
cd server
npm i
npm run server

# run client
cd client
npm i
npm run dev
```

## 要求
 >该功能模块包括：数据生成模拟程序、模拟数据访问API、个人健康数据查看面板、个人健康数据上传、接收数据的 java web服务；
 写一个模拟程序生成跑步数据、脉搏数据、能量消耗数据等日常健康运动数据，每隔10秒随机生成一组数据，保留最近5分钟的数据；
 模拟程序提供数据查询API，可以查询最近5分钟产生的数据；数据接口采用HTTP方式实现；
 在APP客户端中生成个人健康运动数据查看界面，数据来源于模拟程序产生的数据，并根据在模拟程序API中的数据查询频率实时刷新；
 在APP客户端将个人健康数据上传至特定的服务端，服务端程序为java web服务程序，提供HTTP访问接口，基于该接口可以上传数据,数据上传至web服务后以文件方式保存至磁盘上。
 以上应用程序之间的数据传输格式要求为JSON
 界面友好，完成开发文档

## 数据生成模拟程序
- 步数数据
- 脉搏数据
- 能量消耗数据

## Database: walkingMan
### health-data
```json
{
  "step": "this.step",
  "totalStep": "this.totalStep",
  "energyConsumption": "this.energyConsumption",
  "totalEnergyConsumption": "this.totalEnergyConsumption",
  "pulse": "this.pulse",
  "updateTime":"time"
}
```
### user
```json
{
  "name": "name",
  "password": "password",
  "weight": "weight",
  "height": "height",
  "health-data": []
}
```

## 模拟数据访问API
### `api/users`
- `POST`: 增加用户

### `api/users／{username}`
- `GET`: 获取用户信息
- `PUT`: 修改用户信息

### `api/users／{username}／health-data`
- `GET`: 获取用户健康信息
- `POST`: 上传用户健康信息

## 个人健康数据查看面板
## 个人健康数据上传
## 接收数据的 web服务
## 残留的问题
jwt一人一secret
