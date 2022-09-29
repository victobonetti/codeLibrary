const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

async function main() {
    await mongoose.connect('mongodb+srv://vbo:211276@cluster0.iuuchqe.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
}

main().then(() => console.log("connected to database")).catch((e) => console.log(e))

const postSchema = new mongoose.Schema({
    title: String,
    category: String,
    paragraph: String,
    code: String
})

const Post = new mongoose.model('Post', postSchema);

//ROUTER

router.get('/', async (req, res) => { //reffers to /api/posts
    let search = req.query.search;
    if(search == null){
        search = '';
    }
    console.log(req.query.search)
    const showPosts = await Post.find({"paragraph": {"$regex": search, "$options": 'i'}})
    res.send(await showPosts)
})

router.post('/', async (req, res) => {
    console.log('body: ' + req.body.title)
    const newPost = new Post({
        title: req.body.title,
        category: req.body.category,
        paragraph: req.body.paragraph,
        code: req.body.code,
    })
    await newPost.save().then(() => console.log("saved.")).catch(() => console.log("error saving post."))
    res.send();

})

router.delete('/', async (req, res) => {
    await Post.deleteOne({_id: mongoose.Types.ObjectId(req.query.id)})
    res.send();
})

router.post('/edit', async (req, res) => {
    console.log('RECEIVED:' + req.body.title)
    await Post.findOneAndUpdate({_id: req.body._id}, {
        title: req.body.title,
        category: req.body.category,
        paragraph: req.body.paragraph,
        code: req.body.code,
    })
})

router.get('/edit', async (req, res) => {
    if(req.query.id == null ){
        console.log('oops!')
    } else {
        console.log(req.query.id)
        const showPost = await Post.find({_id: mongoose.Types.ObjectId(req.query.id)})
        res.send(await showPost)
    }
})
// console.log(req.body.search)
//     const showPosts = await Post.find({paragraph: req.body.search});
//     res.send(await showPosts)
//     next()

module.exports = router;

