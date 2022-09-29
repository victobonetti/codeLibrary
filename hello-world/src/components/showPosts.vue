<template>
  <section>
    <div class="show-delete" v-if="showDelete">
      <h3>Você tem certeza disto?</h3>
      <em>Excluindo post: {{title}}</em>
      <span
        ><button @click="this.showDelete = false">Manter postagem</button
        ><button @click="deleteThis(_id)">Excluir postagem</button></span
      >
    </div>
    <div v-if="!showDelete">
      <div class="space-between">
        <strong class="title">{{ title }}</strong>

        <i
          class="fa-solid fa-ellipsis-vertical dots"
          @click="options = !options"
        ></i>
      </div>
      <div class="columns">
        <div v-if="options" class="options">
          <button @click="deleteQuote()">Excluir</button>
          <button @click="editThis()">Editar</button>
        </div>
      </div>
      <br />
      <em class="category">{{ category }}</em>
      <p class="paragraph">{{ paragraph }}</p>
      <br />
      <pre class="language-js">
      <code>{{ code }}</code>
    </pre>
    </div>
  </section>
</template>

<script>
import postService from "@/postService";

export default {
  name: "showPosts",
  data() {
    return {
      options: false, //
      showDelete: false,
    };
  },
  components: {},
  methods: {
    async deleteThis(id) {
      this.showDelete = false;
      this.options = false;
      //
      console.log("sent!");
      await postService.deletePost(id);
      this.$emit("refresh");
    },
    deleteQuote() {
      this.options = false;
      this.showDelete = true;
    },
    editThis() {
      this.options = false;
      this.$emit("editPost");
    },
  },
  props: {
    _id: String,
    title: String,
    category: String,
    paragraph: String,
    code: String,
  },
};
</script>

<style scoped>
section {
  /* // */
  background-color: #eeeeee;
  border-radius: 10px;
  width: 100%;
  min-height: 20vh;
  margin: 5px;
}

.title {
  /* // */
  width: 90%;
  margin-top: 10px;
  margin-left: 10px;
  font-size: 24px;
}

.category {
  /* // */
  margin-left: 14px;
  opacity: 0.5;
  font-size: 13px;
}

.paragraph {
  /* // */
  font-size: 13px;
  margin: 10px 0 10px 10px;
}

.space-between {
  display: flex;
  margin: 10px 0 10px 0;
  align-items: center;
  justify-content: space-between;
}
.options {
  /* // */
  content: "";
  background-color: rgb(236, 236, 236);
  position: relative;
  z-index: 5;
  bottom: 10px;
  margin: 5px;
  height: 70px;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  filter: drop-shadow(0 0 0.75rem rgb(0, 0, 0));
}

.options button {
  /* // */
  background-color: #eeeeee;
  text-align: left;
  width: 100%;
  border: none;
  border-bottom: 1px solid gray;
  transition: 0.1s;
}

.options button:hover {
  background-color: #d5d5d5;
}

.dots {
  margin-top: 10px;
  margin-right: 10px;
  text-align: center;
  font-size: 32px;
  width: 10%;
}

.dots:hover {
  cursor: pointer;
  opacity: 0.9;
}

.columns {
  display: flex;
  justify-content: flex-end;
}

.show-delete {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 11;
  width: 67vw;
  height: 20vh;
  background-color: rgb(255, 61, 61);
}
</style>