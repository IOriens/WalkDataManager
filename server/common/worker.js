import User from '../model/user'
import HealthData from '../model/healthData'
import DataGenerator from './DataGenerator'
import Debug from 'debug'
const debug = Debug('worker')

class DataWorker {
  constructor () {
    this.user = []
  }

  async init () {
    const userNum = await User.countUser()
    debug('totalnum', userNum)
    this.user = []
    for (let i = 1; i <= userNum; i++) {
      const result = await HealthData.findLatestById(i)
      this.user.push(result)
    }
    debug('info', this.user)
  }

  // 定期调用下面两个worker
  async run () {
    this.generateDataAndSave()
    setInterval(this.generateDataAndSave.bind(this), 10 * 1000)
    setInterval(this.cleanData, 150 * 1000)
  }

  // 清除过期信息
  async cleanData () {
    await HealthData.removeExpiredData()
    debug('cleanData')
  }

  // 为每个用户生成数据并保存
  async generateDataAndSave () {
    debug('this', this)
    await this.init()
    this.user.forEach(async (item, key) => {
      const dataGenerator = new DataGenerator(item)
      const data = dataGenerator.generateData()
      data.userid = key + 1
      const newHealthData = new HealthData(data)
      await newHealthData.add()
      debug('dataGenerator', data)
    })
  }
}

export default DataWorker
