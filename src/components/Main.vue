<script setup lang="ts">
import { ref } from 'vue';
import Menu from './Menu.vue';

const isMenuOpen = ref<boolean>(false);

const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>


<template>
  <div class="main">
    <Menu :isOpen="isMenuOpen" @update:isOpen="isMenuOpen = $event" />
    <header class="main__header">
      <button @click="toggleMenu" class="main__header__btn">
        <img alt="menu" src="../assets/menu.svg" />
      </button>
      <p class="main__header__title">Здравствуйте, Георгий!</p>
    </header>
  </div>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  align-items: center;
  flex-direction: column;
  &__header {
    margin-top: 5.34vw;
    width: 92.961vw;
    display: flex;
    align-items: center;
    &__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 5.825vw;
      height: 5.825vw;
      img {
        width: 5.825vw;
        height: 5.825vw;
        object-fit: contain;
      }
    }
    &__title {
      margin-left: 4.854vw;
      font-family: var(--second-family);
      font-weight: 400;
      font-size: 5.825vw;
      color: #484848;
    }
  }
}

</style>
