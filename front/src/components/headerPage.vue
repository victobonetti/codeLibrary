<template>
  <div>
    <nav>
      <ul>
        <li @click="openWritePostWindow()"><i class="fa fa-pencil" aria-hidden="true"></i> Escrever...</li>
        <li @click="openCategoriesWindow()"><i class="fa fa-plus" aria-hidden="true"></i> Nova categoria...</li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "myHeader",
  data() {
    return {

    };
  },
  methods:{
    openWritePostWindow(){
      this.$emit('closeAllWindowsExceptThis', 'newPost')
      this.$emit('openWritePostWindow')
    },
    openCategoriesWindow(){
      this.$emit('closeAllWindowsExceptThis', 'newCategory')
      this.$emit('openCategoriesWindow')
    },
  },
  emits: ['openWritePostWindow', 'openCategoriesWindow', 'closeAllWindowsExceptThis']
};
</script>

<style scoped>
div {
  position: absolute;
  z-index: 10;
  width: 100vw;
  height: 60px;
  background-color: #222831;
}

i {
  margin-right: 10px;
}

nav {
  color: #EEEEEE;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

ul {
  display: flex;
  width: 50%;
  height: 100%;
  justify-content: space-around;
  list-style: none;
  align-items: center;
}

li {
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .2s;
}

li:hover {
  background-color: #00ADB5;
  cursor: pointer;
}
</style>