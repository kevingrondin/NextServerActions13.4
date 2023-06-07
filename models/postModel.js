import { Schema, model, models } from 'mongoose'

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title.']
    },
    image: {
        type: String,
        required: [true, 'Please provide an image.']
    },
}, { timestamps: true })

const Post = models.Post || model('Post', postSchema)

export default Post