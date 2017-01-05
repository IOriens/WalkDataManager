import mongoose from 'mongoose'
import md5 from 'md5'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  userid: Number
})

UserSchema.methods.add = function () {
  this.password = md5(this.password)

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

UserSchema.static('findByName', function (username) {
  return new Promise((resolve, reject) => {
    this.findOne({ username: username }, (err, user) => {
      if (err) {
        reject(err)
      } else {
        resolve(user)
      }
    })
  })
})

UserSchema.static('findByMail', function (email) {
  return new Promise((resolve, reject) => {
    this.findOne({ email: email }, (err, user) => {
      if (err) {
        reject(err)
      } else {
        resolve(user)
      }
    })
  })
})

UserSchema.static('countUser', function () {
  return new Promise((resolve, reject) => {
    this.count({}, (err, user) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log(user)
        resolve(user)
      }
    })
  })
})

export default mongoose.model('User', UserSchema)
