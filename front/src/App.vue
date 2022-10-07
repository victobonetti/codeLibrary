<template>
  <div class="page">
    <header-page
      @close-all-windows-except-this="closeAllWindowsExceptThis"
      @open-write-post-window="showNewPostProtocol()"
      @open-categories-window="showNewCategoryProtocol()"
    />

    <posts-section
      @open-post-edit-window="editPost"
      v-if="showMain"
      class="main"
      @close-all-windows="closeAllWindows()"
    />

    <!-- new-post, new-category and edit-post are windows that are openned mannually by the user -->
    <new-post @close-post="showNewPost = false" v-if="showNewPost" />
    <new-category
      @close-category="showNewCategory = false"
      v-if="showNewCategory"
      @closeCat="showNewCategory = !showNewCategory"
    />
    <edit-post
      @close-edit="openPostEditWindow = false"
      v-if="openPostEditWindow"
      :_id="idOfThePostBeingEdited"
    />
  </div>
    <!-- new-post, new-category and edit-post are windows that are openned mannually by the user -->
</template>

<script>
import EditPost from "./components/postEditWindow.vue";
import headerPage from "./components/headerPage.vue";
import postsSection from "./components/postsSection.vue";
import newPost from "./components/writePostWindow.vue";
import newCategory from "./components/categoriesWindow.vue";

export default {
  name: "App",
  components: {
    headerPage,
    postsSection,
    newPost,
    EditPost,
    newCategory,
  },
  data() {
    return {
      showNewPost: false,
      showNewCategory: false,
      showMain: true,
      openPostEditWindow: false,
      blurOn: true,

      idOfThePostBeingEdited: "",
    };
  },
  methods: {
    showNewPostProtocol() {
      this.showNewPost = !this.showNewPost;
    },
    showNewCategoryProtocol() {
      this.showNewCategory = !this.showNewCategory;
    },
    async editPost(id) {
      this.idOfThePostBeingEdited = id;
      if (this.openPostEditWindow == false) {
        this.openPostEditWindow = true;
      } else {
        this.openPostEditWindow = false;
      }
    },

    async closeAllWindowsExceptThis(element) {

      if (element == "newPost" && this.showNewPost == false) {
        await this.closeAllWindows();
        this.showNewPost = true;
      } else if (element == "editPost" && this.openPostEditWindow == false) {
        await this.closeAllWindows();
        this.openPostEditWindow = true;
      } else if (element == "newCategory" && this.showNewCategory == false) {
        await this.closeAllWindows();
        this.showNewCategory = true;
      }
      
    },
    async closeAllWindows() {
      this.showNewPost = false;
      this.openPostEditWindow = false;
      this.showNewCategory = false;
    },
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

.page {
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
