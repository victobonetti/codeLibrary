const axios = require('axios');
const urlPosts = 'api/posts/';
const urlEdit = 'api/posts/edit/';
const urlCategory = 'api/categories/'

async function axiosSearchPosts(txt) {
    return await axios.get(`${urlPosts}?search=${txt}`)
}

async function axiosGetPostById(id) {
    return await axios.get(`${urlEdit}?id=${id}`)
}

class postService {

    //get posts based on search input (if serach input == null, show all posts)
    static async allPosts(txt) {
        let data = '';
        await axiosSearchPosts(txt).then((a) => { data = a.data }).catch(() => console.log("FATAL"))
        return data

    }

    //post
    static async writePost(newPost) {
        return await axios.post(urlPosts, newPost)
    }

    //delete a post
    static async deletePost(id) {
        return await axios.delete(`${urlPosts}?id=${id}`)
    }

    //edit a post
    static async editPost(editPost) {
        console.log(editPost)
        return await axios.post(urlEdit, editPost)
    }

    //get data to show in the edit a post window
    static async getPostById(id) {
        let editData;
        await axiosGetPostById(id).then(data => { editData = data.data }).catch(e => console.log(e));
        return editData[0]
    }

    //get categories
    static async getCategories() {
        let data = ''
        await axios.get(urlCategory).then(a => {
            data = a
        })
        return data.data
    }

    //post a category 
    static async writeCategory(newCat) {
        console.log(newCat)
        return await axios.post(urlCategory, newCat)
    }

    //delete a category
    static async deleteCategory(id) {
        console.log(id)
        return await axios.delete(`${urlCategory}?id=${id}`)
    }
}

export default postService