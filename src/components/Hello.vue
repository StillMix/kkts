<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const handleHello = (e: Event): void => {
  router.push("/main");
};
</script>

<template>
  <div class="hello">
    <img alt="logo" src="../assets/logo.svg" class="hello__logo" />
    <img alt="book" src="../assets/helloBook.svg" class="hello__book" />
    <div class="hello__linear"></div>
    <div class="hello__cont">
      <p class="hello__cont__title">ВАШ ЭЛЕКТРОННЫЙ ДНЕВНИК</p>
      <p class="hello__cont__subtitle">
        Расписание группы, ваши оценки, предметы и другое уже настроены.
      </p>
      <button @click="handleHello" class="hello__cont__btn">
        НАЧАТЬ ИСПОЛЬЗОВАНИЕ
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hello {
  width: 100vw;
  height: 100vh;
  background: #2c3b88;
  overflow: hidden;
  position: relative;
  &__logo {
    width: 19.417vw;
    height: 5.097vw;
    margin-top: 7.282vw;
    margin-left: 5.583vw;
  }
  &__book {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
  }
  &__linear {
    width: 228.641vw;
    height: 132.282vw;
    background: linear-gradient(180deg, rgba(44, 59, 136, 0) 0%, #2c3b88 100%);
    transform: rotate(15deg);
    position: absolute;
    z-index: 2;
    bottom: -43.689vw;
    left: -84.951vw;
  }
  &__cont {
    width: 89.806vw;
    position: absolute;
    z-index: 3;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 3.406vh;
    &__title {
      font-family: var(--second-family);
      font-weight: 900;
      font-size: 7.282vw;
      color: #fff;
    }
    &__subtitle {
      margin-top: 1.214vw;
      font-family: var(--second-family);
      font-weight: 500;
      font-size: 4.369vw;
      color: #fff;
      opacity: 0.5;
    }
    &__btn {
      width: 89.806vw;
      height: 13.107vw;
      margin-top: 4.126vw;
      background: #fff;
      border-radius: 48.544vw;
      font-family: var(--second-family);
      font-weight: 900;
      font-size: 4.369vw;
      text-align: center;
      color: #2c3b88;
    }
  }
}
</style>
