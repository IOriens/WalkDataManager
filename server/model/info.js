import mongoose from 'mongoose'
const Schema = mongoose.Schema

var InfoSchema = new Schema({
  username: String,
  height: Number,
  weight: Number
})

InfoSchema.methods.update = function () {
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

export default mongoose.model('Info', InfoSchema)
