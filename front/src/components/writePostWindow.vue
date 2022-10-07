<template>
  <form>
    <label for="title">Título</label><br />
    <input id="title" name="title" type="text" v-model="title" />
    <br />

    <label for="category">Categoria</label><br />
    <select id="category" name="category">
      <option value=""></option>
      <option v-for="category in categories" v-bind:key="category._id">
        {{ category.category }}, {{ category.language }}
      </option>
    </select>
    <br />

    <label for="paragraph">Parágrafo</label>
    <textarea name="paragraph" id="paragraph" v-model="paragraph"></textarea>
    <br />

    <label for="code">Código</label><br />
    <textarea name="code" id="code" v-model="code"></textarea>
    <br />

    <span class="align-center">
      <button @click="$emit('close-post')">Cancelar</button>
      <button @click="createPost()">Enviar</button>
    </span>
  </form>
</template>

<script>
import postService from "@/postService";

export default {
  name: "newPost",
  data() {
    return {
      title: "",
      category: "",
      paragraph: "",
      code: "// type your code here...",
      categories: []
    };
  },
  methods: {
    async createPost() {
      const cats = document.getElementById('category')
      await postService.writePost({
        title: this.title,
        category: cats.value,
        paragraph: this.paragraph,
        code: this.code,
      });
    },
  },
  created() {
    async function getCats() {
      return await postService.getCategories();
    }

    let cats = getCats();

    cats.then((cats) => (this.categories = cats)).catch((e) => console.log(e));
  },
  emits: ['close-post']
};
</script>

<style scoped>
form {
  background-color: #222831;
  color: #eeeeee;
  position: absolute;
  width: 40vw;
  height: 80vh;
  bottom: 10vh;
  z-index: 3;
  border-radius: 10px;
  padding: 10px;
}

.shadow {
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
  margin-bottom: 5px;
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
  background-color: #eeeeee;
  color: rgb(0, 89, 37);
  font-weight: 500;
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
  background-color: #00adb5;
  border: none;
  border-radius: 10px;
  color: #eeeeee;
  font-size: 18px;
  transition: 0.2s;
  cursor: pointer;
}
</style>