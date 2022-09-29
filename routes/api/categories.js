const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


main().then(() => console.log("connected to database")).catch((e) => console.log(e))

async function main() {
    db = mongoose.connect('mongodb+srv://vbo:211276@cluster0.iuuchqe.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
}

const categorySchema = new mongoose.Schema({

    category: String,
    language: String,

})

const Category = new mongoose.model('Category', categorySchema)

router.get("/", async (req, res) =>{
    const showCats = await Category.find({})
    res.send(await showCats);
})

router.post("/", async (req, res) => {
    const addCat = new Category({
        category: req.body.category,
        language: req.body.language
    })
    await addCat.save().then(()=> console.log(addCat)).catch(e => console.log(e))
    res.send(await addCat)
})

router.delete("/", async (req, res) => {
    await Category.deleteOne({_id: mongoose.Types.ObjectId(req.query.id)})
})

module.exports = router;
