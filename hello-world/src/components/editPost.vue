<template>
  <!-- <div class="shadow"></div> -->
  <form>
    <label for="title">Título</label><br />
    <input id="title" name="title" type="text" v-model="title" />
    <br />

    <label for="category">Categoria</label><br />
    <select id="category" name="category">
    <option value=""></option>
    <option v-for="category in categories" v-bind:key="category._id">{{category.category}}, {{category.language}}</option>
    </select>
    <br />

    <label for="paragraph">Parágrafo</label>
    <textarea name="paragraph" id="paragraph" v-model="paragraph"></textarea>
    <br />

    <label for="code">Código</label><br />
    <textarea name="code" id="code" v-model="code"></textarea>
    <br />

    <span class="align-center">
      <button @click="$emit('close-edit')">Cancelar</button>
      <button @click="changePost()">Enviar</button>
    </span>
  </form>
</template>
  
  <script>
import postService from "@/postService";

export default {
  name: "newPost",
  data() {
    return {
      title: "Loading...",
      paragraph: "Loading...",
      code: "Loading...",
      categories: []
    };
  },
  methods: {
    async changePost() {
      const cat = document.getElementById('category')
      await postService.editPost({
        _id: this._id,
        title: this.title,
        category: cat.value,
        paragraph: this.paragraph,
        code: this.code,
      });
    },
  },
  created() {
    console.log(this._id);
    async function getPost(id) {
      return await postService.getPostById(id);
    }

    async function getCats(){
      return await postService.getCategories()
    }

    let cats = getCats()
    
    cats
    .then(cats => this.categories = cats)
    .catch(e => console.log(e))

    let post = getPost(this._id);
    post.then((a) => {
      const cat = document.getElementById('category')
      this.title = a.title;
      cat.value = a.category;
      this.paragraph = a.paragraph;
      this.code = a.code;
      console.log(a.code);
    });
  },
  props: {
    _id: String,
  },
  emits: ['close-edit']
};
</script>
  
  <style scoped>

form {
  background-color: #00adb5;
  position: absolute;
  width: 40vw;
  height: 80vh;
  bottom: 10vh;
  z-index: 3;
  border-radius: 10px;
  padding: 10px;
}

div {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: black;
  bottom: 1px;
  opacity: 0.6;
}

span {
  position: absolute;
}

label {
  font-size: 18px;
}

input {
  font-size: 18px;
  border-radius: 5px;
  border: none;
}

#paragraph {
  width: 100%;
  height: 30%;
  resize: none;
  border-radius: 5px;
  border: none;
}

#code {
  width: 100%;
  height: 30%;
  resize: none;
  background-color: #222831;
  color: greenyellow;
  font-family: "Courier New", Courier, monospace;
}

.align-center {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

button {
  margin-top: 20px;
  width: 18vw;
  height: 5vh;
  background-color: #393e46;
  border: none;
  border-radius: 10px;
  color: #eeeeee;
  font-size: 18px;
  transition: 0.2s;
  cursor: pointer;
}
</style>