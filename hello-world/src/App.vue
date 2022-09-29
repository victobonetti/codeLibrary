<template>
  <div class="myMain">
    <my-header
      @disable-except-posts="disableExceptPosts()"
      @disable-except-category="disableExceptCategory()"
      @clickNewPost="showNewPostProtocol()"
      @clickNewCategory="showNewCategoryProtocol()"
      @active-options="activeOptions()"
    />
    <my-main @show-edit-post="editPost" v-if="showMain" class="main" @disableAll="disableAll()" />
    <new-post @close-post="showNewPost = false" v-if="showNewPost" />
    <new-category
    @close-category="showNewCategory= false"
      v-if="showNewCategory"
      @closeCat="showNewCategory = !showNewCategory"
    />
    <edit-post @close-edit="showEditPost = false" v-if="showEditPost" :_id="tempId" />
  </div>
</template>

<script>
import EditPost from "./components/editPost.vue";
import myHeader from "./components/myHeader.vue";
import MyMain from "./components/myMain.vue";
import newPost from "./components/newPost.vue";
import newCategory from "./components/newCategory.vue";

export default {
  name: "App",
  components: {
    myHeader,
    MyMain,
    newPost,
    EditPost,
    newCategory,
  },
  data() {
    return {
      showNewPost: false,
      showNewCategory: false,
      showMain: true,
      showEditPost: false,
      blurOn: true,

      tempId: "",
    };
  },
  methods: {
    showNewPostProtocol() {
      this.showNewPost = !this.showNewPost
    },
    showNewCategoryProtocol() {
      this.showNewCategory = !this.showNewCategory
    },
    activeOptions() {
      this.$emit("activeOptions");
      console.log("emit2");
    },
    async editPost(editId) {
      this.tempId = editId;
      console.log("THIS:" + this.tempId);
      if (this.showEditPost == false) {
        this.showEditPost = true;
      } else {
        this.showEditPost = false;
      }
    },
    disableExceptPosts() {
      console.log("ep")
      this.showEditPost = false;
      this.showNewCategory = false;
    },
    disableExceptCategory() {
      console.log("ec")
      this.showEditPost = false;
      this.showNewPost = false;
    },
    disableAll(){
      this.showNewPost = false;
      this.showEditPost = false;
      this.showNewCategory = false;
    }
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

.myMain {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main {
  margin: 10px 0 0 0;
}

#blur {
  position: absolute;
  filter: blur(4px);
  width: 100vw;
  height: 92vh;
  z-index: 3;
  bottom: -1px;
}
</style>
