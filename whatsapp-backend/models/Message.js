
const mongoose = require('mongoose') 
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useCreateIndex', true);

const opts = {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
    toJSON: {
        // whenever the comment is converted to JSON
        transform(doc, json) {
        delete json.__v
        return json
        }
      }
  };
  const messageSchema = mongoose.Schema({
    message:{type:String,required:true, maxLength: 350},
    name: {type:String,required:true,maxLength: 100},
    received:{type:Boolean,required:true}
  }, opts);

messageSchema.plugin(uniqueValidator)  
module.exports = mongoose.model('Message',messageSchema) 