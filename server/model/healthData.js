import mongoose from 'mongoose'

const Schema = mongoose.Schema

const HealthDataSchema = new Schema({
  userid: String,
  totalStep: Number,
  energyConsumption: Number,
  totalEnergyConsumption: Number,
  pulse: Number,
  updateTime: Date
})

HealthDataSchema.methods.add = function () {
  this.updateTime = new Date().getTime()

  return new Promise((resolve, reject) => {
    this.save((err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

HealthDataSchema.static('findLatestById', function (id) {
  return new Promise((resolve, reject) => {
    this.findOne({ userid: id }, null, {
      sort: {
        updateTime: -1 // Sort by Date Added DESC
      }
    }, (err, user) => {
      if (err) {
        reject(err)
      } else {
        resolve(user)
      }
    })
  })
})

HealthDataSchema.static('findByUserId', function (id, skip, limit) {
  return new Promise((resolve, reject) => {
    this.find({ userid: id }, null, {
      skip,
      limit,
      sort: {
        updateTime: -1 // Sort by Date Added DESC
      }
    }, (err, user) => {
      if (err) {
        reject(err)
      } else {
        resolve(user)
      }
    })
  })
})

HealthDataSchema.static('removeExpiredData', function () {
  return new Promise((resolve, reject) => {
    const date = new Date() - 5 * 60 * 1000
    this.remove({ updateTime: {$lt: date} }, (err, user) => {
      if (err) {
        reject(err)
      } else {
        resolve(user)
      }
    })
  })
})

export default mongoose.model('HealthData', HealthDataSchema)
