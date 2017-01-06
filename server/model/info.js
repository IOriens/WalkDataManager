import mongoose from 'mongoose'
const Schema = mongoose.Schema

var InfoSchema = new Schema({
  userid: Number,
  height: Number,
  weight: Number,
  birthday: Date
})

InfoSchema.static('updateInfo', function (id, newInfo) {
  return new Promise((resolve, reject) => {
    console.log(newInfo)
    this.findOneAndUpdate({ userid: id }, newInfo, {upsert: true}, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
})

InfoSchema.static('findByUserId', function (id) {
  return new Promise((resolve, reject) => {
    this.findOne({ userid: id }, (err, user) => {
      if (err) {
        reject(err)
      } else {
        resolve(user)
      }
    })
  })
})

export default mongoose.model('Info', InfoSchema)
