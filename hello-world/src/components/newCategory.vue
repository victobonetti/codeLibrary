<template>
  <div class="main">
    <div class="show">
      <span class="sub" v-for="category in categories" :key="category._id">
        <div>
          <div class="category">{{ category.category }}</div>
          <div class="language">{{ category.language }}</div>
        </div>
        <strong class="delete" @click="deleteCat(category._id)">X</strong>
      </span>
    </div>
    <form>
      <label for="category">Category</label>
      <input v-model="category" id="category" name="category" type="text" />
      <label for="language">Language</label>
      <input v-model="language" id="language" name="language" type="text" />
      <div class="display-flex">
        <button @click="$emit('close-category')">Cancelar</button>
        <button @click="createNewCat">Criar categoria</button>
      </div>
    </form>
  </div>
</template>

<script>
import postService from "../postService";

export default {
  name: "newCategory",
  data() {
    return {
      categories: [],
      category: "",
      language: "",
    };
  },
  methods: {
    async getCats() {
      let data = await postService.getCategories();
      return data;
    },
    async createNewCat() {
      postService.writeCategory({
        category: this.category,
        language: this.language,
      });
    },
    async deleteCat(id) {
      console.log(id);
      this.$emit("closeCat");
      await postService.deleteCategory(id);
    },
  },
  created() {
    async function getCats() {
      let data = await postService.getCategories();
      return data;
    }

    getCats().then((data) => (this.categories = data));
  },
};
</script>

<style scoped>
.shadow {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: black;
  bottom: 1px;
  opacity: 0.6;
}

.main {
  position: absolute;
  top: 100px;
  width: 40vw;
  height: 80vh;
  background-color: #222831;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.delete {
  font-size: 32px;
  color: rgb(255, 96, 96);
  margin-right: 5px;
}

.delete:hover {
  color: red;
  cursor: pointer;
}

.show {
  height: 75%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.show::-webkit-scrollbar {
  width: 10px; /* width of the entire scrollbar */
}

.show::-webkit-scrollbar-track {
  background: #222831; /* color of the tracking area */
}
.show::-webkit-scrollbar-thumb {
  background-color: #00adb5; /* color of the scroll thumb */ /* roundness of the scroll thumb */ /* creates padding around scroll thumb */
}

.sub {
  margin-top: 5px;
}

.category {
  font-size: 24px;
  margin-left: 5px;
}

.language {
  font-size: 12px;
  font-style: italic;
  margin-left: 10px;
  opacity: 0.5;
}

form {
  background-color: #00adb5;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 25%;
  align-items: center;
}

span {
  background-color: #313740;
  color: rgb(213, 213, 213);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

span:hover {
  background-color: #1b2027;
  color: #00adb5;
}

form input {
  height: 30px;
  font-size: 24px;
}

form button {
  width: 40%;
  height: 5vh;
  margin-top: 10px;
  cursor: pointer;
}

.display-flex {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
</style>