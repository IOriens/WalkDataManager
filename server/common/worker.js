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

  async run () {
    // await this.init()
    this.generateDataAndSave()
    setInterval(this.generateDataAndSave.bind(this), 10 * 1000)
    setInterval(this.cleanData, 120 * 1000)
  }

  async cleanData () {
    await HealthData.removeExpiredData()
    debug('cleanData')
  }
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
