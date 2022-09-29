<template>
  <main>
    <label for="search">Procurar Post</label>
    <span>
      <input
        type="text"
        id="search"
        v-model="search"
        autocomplete="off"
        placeholder="Digite aqui para pesquisar..."
      />

      <button @click="searchPosts()" type="button" id="button" autofocus>
        <i class="fa-solid fa-magnifying-glass"></i> Buscar 
      </button>
    </span>

    <div class="show">
      
      <ShowPosts 
      v-for="post in posts" 
      :_id="post._id" 
      :title="post.title"
      :category="post.category" 
      :paragraph="post.paragraph" 
      :code="post.code"
      v-bind:key="post._id"
      @refresh="searchPosts()"
      @edit-post="$emit('showEditPost', post._id)"
      />

      <div v-if="posts == '' && startSearch == false">
        <h2>Olá! Para buscar um arquivo, <br />use o campo de busca acima.</h2>
      </div>

      <div v-if="posts == '' && startSearch == true">
        <h2>
          Não foram encontrados resultados para esta pesquisa... <br />
          tente buscar novamente inserindo outros dados!
        </h2>
      </div>
      <div v-if="loading" class="loading"><h2>Loading...</h2></div>
    </div>
  </main>
</template>

<script>
import postService from "@/postService";
import ShowPosts from "./showPosts.vue";

export default {
  name: "myMain",
  components: {
    ShowPosts,
  },
  data() {
    return {
      search: "",
      loading: false,
      id: "", //
      startSearch: false,
      posts: []
    };
  },
  methods: {
    async searchPosts() {
      this.startSearch = true;
      this.loading = true;
      let search = document.getElementById("search");
      this.posts = await postService.allPosts(search.value);
      this.loading = false;
      search.value = "";
      this.$emit('disableAll')
    },
  },
  emits: ['showEditPost', 'disableAll']
};
</script>

<style scoped>
main {
  width: 70vw;
  margin-top: 10vh;
}

span {
  display: flex;
}

input {
  width: 80%;
  height: 5vh;
  font-size: 4vh;
}

.show {
  margin: 5px;
  padding: 5px;
  height: 75vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

.show::-webkit-scrollbar {
  width: 8px;               /* width of the entire scrollbar */
}

.show::-webkit-scrollbar-track {
  background: #222831;        /* color of the tracking area */
}
.show::-webkit-scrollbar-thumb {
  background-color: #00adb5;    /* color of the scroll thumb */      /* roundness of the scroll thumb */  /* creates padding around scroll thumb */
}

button {
  width: 20%;
  height: 5vh;
  background-color: #00adb5;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  transition: 0.2s;
}

button:hover {
  background-color: none;
  border: 2px solid #00adb5;
  color: #00adb5;
  background-color: white;
  cursor: pointer;
}

label {
  margin-top: 10px;
}


</style>