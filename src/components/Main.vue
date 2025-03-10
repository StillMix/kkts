<script setup>
import { ref } from 'vue'; // Импортируем ref из Vue
import Menu from './Menu.vue';

// Создаем реактивную переменную для состояния меню
const isMenuOpen = ref(false); // Состояние меню

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value; // Функция для переключения меню
};
</script>

<template>
  <div class="main">
    <!-- Передаем состояние меню в компонент Menu -->
    <Menu :isOpen="isMenuOpen" @update:isOpen="isMenuOpen = $event"  />
    <header class="main__header">
      <!-- Добавляем обработчик клика на кнопку -->
      <button @click="toggleMenu" class="main__header__btn">
        <img alt="menu" src="../assets/menu.svg" />
      </button>
      <p class="main__header__title">Здравствуйте, Георгий!</p>
    </header>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.main__header {
  margin-top: 5.34vw;
  width: 92.961vw;
  display: flex;
  align-items: center;
}

.main__header__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5.825vw;
  height: 5.825vw;
}

.main__header__btn img {
  width: 5.825vw;
  height: 5.825vw;
  object-fit: contain;
}

.main__header__title {
  margin-left: 4.854vw;
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 5.825vw;
  color: #484848;
}
</style>
