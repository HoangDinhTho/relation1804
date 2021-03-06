require('./lib/dbconnect');
const { hash } = require('./lib/bcrypt');
const { UserModel } = require('./models/User.model');
const { PostModel } = require('./models/Post.model');
const { CommentModel } = require('./models/Comment.model');
// 4.15
PostModel.find({
    $where: 'this.likes.length < 5' // <= >= < > ==
})
.then(post=>{
    // get all id push arr
    UserModel.find(
        {
            // $in //where
        },
        { 
            // $pull:  // update
        }
    )
    CommentModel.remove({
         // $in //where
    })
    PostModel.remove({
        // $in //where
    })
    console.log(post)
})
.catch(err=>console.log({ error: err.message}))

//4.14
// PostModel.findOneAndUpdate(
//     {_id: '5ce94c6e59c66e2d00fbb3b1'},
//     { content: "Nội dung đã được update" },
//     { new: true }
// )
// .then(post=>{
//     if(!post) throw new Error('Cannot find post')
//     console.log(post)
// })
// .catch(err=>console.log({ error: err.message}))


// 4.13
// PostModel.findOne({_id: '5ce94efce57ecb2d765ce0e3'})
// .populate({
//     path: 'author',
//     match: {
//         email: 'admin@gmail.com'
//     },
//     select: { _id: 0, email: 1}
// })
// .populate({
//     path: 'comments',
//     options: { limit: 1 }
// })
// .then(post=>{
//     if(!post) throw new Error('Cannot find post!')
//     console.log(post.comments[0].likes.length)
// })
// .catch(err=>console.log({ error: err.message}))
    

//4.12
// PostModel.findOne({ _id: '5ce94efce57ecb2d765ce0e3' })
// .select('_id content likes')
// .populate('author', { _id: 0, name: 1})
// .populate({
//     path: 'comments', 
//     select: { _id: 0, content: 1},
//     populate: {
//         path: 'author', // author create cmt
//         select: { _id: 0, name: 1}
//     }
// })
// .then(post=>{
//     if(!post) throw new Error('Cannot find post!')
//     console.log('Post: ', post.content)
//     console.log('Author: ', post.author.name)
//     console.log('Likes: ', post.likes.length)
//     console.log('List CMT: ')
//     post.comments.forEach(cmt=>{
//         console.log('- Content: ', cmt.content)
//         console.log('  Author: ', cmt.author.name)
//     })
// })
// .catch(err=>console.log({ error: err.message}))


//4.9
// UserModel.findOne({email:'manager@gmail.com'})
// .select({ _id: 0, email: 1, name: 1})
// // .populate('posts','content likes')
// .populate('posts',{ content: 1, _id: 0})
// .then(user=>{
//     if(!user) throw new Error('Cannot find user!')
//     console.log(user.posts.length)
// })
// .catch(err=>console.log({ error: err.message}))


//4.7
// UserModel.findOne({ email: 'manager@gmail.com'})
// .then(user=>{
//     if(!user) throw new Error('Cannot find user!')
//     return UserModel.findOneAndUpdate(
//         { email: 'guest@gmail.com' },
//         {
//             $addToSet: {friends: user._id},
//             $pull: { receiveRequests : user._id }
//         },
//         {new: true}
//     )
// })
// .then(user=>{
//     return UserModel.findOneAndUpdate(
//         { email: 'manager@gmail.com' },
//         {
//             $addToSet: {friends: user._id},
//             $pull: { sendRequests : user._id }
//         },
//         {new: true}
//     )
// })
// .then(user=>console.log(user))
// .catch(err=>console.log({ error: err.message}))
// 4.6
// UserModel.findOne({ email: 'guest@gmail.com' })
// .then(receiver=>{
//     if(!receiver) throw new Error('Cannot find user!')
//     return UserModel.findOneAndUpdate(
//         { email: 'manager@gmail.com'},
//         {
//             $addToSet: { sendRequests: receiver._id }
//         },
//         { new: true }
//     )
// })
// .then(sender=>{
//     return UserModel.findOneAndUpdate(
//         { email: 'guest@gmail.com'},
//         {
//             $addToSet: { receiveRequests: sender._id}
//         },
//         { new: true }
//     )
// })
// .then(receiver=>console.log(receiver))
// .catch(err=>console.log({ error: err.message}))

// 4.5
// UserModel.findOne({ email: { $eq : 'manager@gmail.com'} })
// .then(user=>{
//     if(!user) throw new Error('Cannot find user!');
//     // update post
//     return PostModel.findOneAndUpdate(
//         {_id: '5ce94efce57ecb2d765ce0e3'},
//         {
//             $pull: {
//                 likes: user._id
//             }
//         },
//         { new : true }
//     )
// })
// .then(post=> console.log(post))
// .catch(err=>console.log({ error: err.message}))
// 4.4
// UserModel.findOne({ email: { $eq : 'manager@gmail.cm'} })
// .then(user=>{
//     if(!user) throw new Error('Cannot find user!');
//     // update post
//     return PostModel.findOneAndUpdate(
//         {_id: '5ce94efce57ecb2d765ce0e3'},
//         {
//             $addToSet: {
//                 likes: user._id
//             }
//         },
//         { new : true }
//     )
// })
// .then(post=> console.log(post))
// .catch(err=>console.log({ error: err.message}))



//4.3
// post 01: 5ce94efce57ecb2d765ce0e3 do admin tạo
// guest: 5ce946fc85f39a2c4663461f
// CommentModel.create({
//     author: '5ce946fc85f39a2c4663461f',
//     post: '5ce94efce57ecb2d765ce0e3',
//     content: 'Comment của guest trên bài post 01 (của admin)'
// })
// .then(comment=>{
//     return PostModel.findOneAndUpdate(
//         { _id: '5ce94efce57ecb2d765ce0e3' },
//         { 
//             $push: {
//                 comments: comment._id
//             }
//         },
//         { new: true }
//     )
// })
// .then(post=>console.log(post))
// .catch(err=>console.log(err.message))

//admin 5ce945c3de0e822c0114803f
// PostModel.create({
//     author: '5ce945c3de0e822c0114803f',
//     content: 'Post 01 của admin'
// })
// .then(post=>{
//     return UserModel.findOneAndUpdate(
//         {_id: '5ce945c3de0e822c0114803f'},
//         { 
//             $push: {
//                posts: post._id
//             } 
//         },
//         { new: true }
//     )
// })
// .then(user=>console.log(user))
// .catch(err=>console.log(err.message))

//4.2

//4.1
// hash('111111')
// .then(hash=> UserModel.insertMany([
//     {
//         email: 'admin02@gmail.com',
//         password: hash,
//         name: 'Nguyen Admin 02'
//     },
//     {
//         email: 'guest@gmail.com',
//         password: hash,
//         name: 'Nguyen guest'
//     },
//     {
//         email: 'manager@gmail.com',
//         password: hash,
//         name: 'Manager'
//     }
// ]))
// .then(users=>console.log(users))
// .catch(err=>console.log(err.message))

