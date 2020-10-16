import mongoose from 'mongoose'

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
  const whatsAppSchema = mongoose.Schema({
      message:String,
      name: String,
      received:Boolean
  }, opts);

const roomSchema = mongoose.Schema({
    name: String,
    image: String,
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
})

export default mongoose.model('Room', roomSchema)
