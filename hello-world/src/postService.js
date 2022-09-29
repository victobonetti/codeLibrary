const axios = require('axios');
const urlPosts = 'api/posts/';
const urlEdit = 'api/posts/edit/';
const urlCat = 'api/categories/'

async function axiosConnectPosts(txt) {
    return await axios.get(`${urlPosts}?search=${txt}`)
}

class postService {

    //get
    static async allPosts(txt) {

        let data = '';
        
        await axiosConnectPosts(txt).then((a) => { data = a.data }).catch(() => console.log("FATAL"))

        return data

    }

    //post
    static async writePost(newPosting) {
        return await axios.post(urlPosts, newPosting)
    }

    //delete
    static async deletePost(id) {
        return await axios.delete(`${urlPosts}?id=${id}`)
    }

    //edit
    static async editPost(editPost) {
        console.log(editPost)
        return await axios.post(urlEdit, editPost)
    } 

    static async getPostById(id){
        let editData;
        await axios.get(`${urlEdit}?id=${id}`).then(data => {editData = data.data}).catch(e => console.log(e));
        return editData[0]
    }

    static async getCategories(){
        let data = ''
       await axios.get(urlCat).then(a => {
        data = a
       })
       return data.data
    }

    static async writeCategory(newCat){
        console.log(newCat)
        return await axios.post(urlCat, newCat)
    }

    static async deleteCategory(id){
        console.log(id)
        return await axios.delete(`${urlCat}?id=${id}`)
    }
}

export default postService