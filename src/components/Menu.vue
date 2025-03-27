<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import ActiveHome from "../assets/home.svg";
import DisactiveHome from "../assets/homeB.svg";
import ActiveEvaluations from "../assets/evaluations.svg";
import DisctiveEvaluations from "../assets/evaluationsB.svg";

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits<{
  (event: "update:isOpen", value: boolean): void;
}>();

const router = useRouter();

const handleMenu = (event: Event): void => {
  const target = event.target as HTMLElement | null;

  if (target && !target.closest(".menu__popup")) {
    emit("update:isOpen", false);
  }
};

interface Link {
  name: string;
  Active: string;
  Disactive: string;
  to: string;
}

const initialLinks: Link[] = [
  {
    name: "Обзор",
    Active: ActiveHome,
    Disactive: DisactiveHome,
    to: "/main",
  },
  {
    name: "Оценки",
    Active: ActiveEvaluations,
    Disactive: DisctiveEvaluations,
    to: "/evaluations",
  },
];

const logout = (): void => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
  router.push("/");
};
</script>

<template>
  <div v-if="isOpen" @click="handleMenu" class="menu">
    <div class="menu__popup">
      <div class="menu__popup__info">
        <p class="menu__popup__info__title">1 ПЕД Б</p>
      </div>
      <nav class="menu__popup__links">
        <RouterLink
          v-for="(link, index) in initialLinks"
          :key="index"
          :to="link.to"
          :class="['menu__popup__link', { active: $route.path === link.to }]"
        >
          <img
            :src="$route.path === link.to ? link.Disactive : link.Active"
            :alt="link.name"
            class="menu__popup__link__icon"
          />
          <p class="menu__popup__link__text">{{ link.name }}</p>
        </RouterLink>
      </nav>
      <div class="menu__popup__exit">
        <button @click="logout" class="menu__popup__exit__btn">
          <img alt="exit" src="../assets/exit.svg" />Выйти
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: #000000ac;
  z-index: 50;
  &__popup {
    border-radius: 0 30px 30px 0;
    width: 76.456vw;
    height: 100vh;
    background: #f3f5ff;
    position: absolute;
    z-index: 51;
    display: flex;
    align-items: center;
    flex-direction: column;
    &__info {
      width: 66.99vw;
      border-bottom: 1px solid #00000064;
      padding-bottom: 1.825vh;
      margin-top: 5.839vh;
      &__title {
        font-family: var(--font-family);
        font-weight: 900;
        font-size: 5.825vw;
        margin-left: 0.728vw;
        color: #484848;
      }
    }
    &__links {
      width: 66.99vw;
      border-bottom: 1px solid #00000064;
      margin-top: 1.214vw;
      display: flex;
      flex-direction: column;
      gap: 1.214vw;
      padding-bottom: 1.214vw;
    }
    &__link {
      display: flex;
      align-items: center;
      border-radius: 70px;
      width: 66.99vw;
      height: 12.136vw;
      gap: 1.214vw;
      cursor: pointer;
      &__icon {
        width: 4.854vw;
        height: 4.854vw;
        object-fit: contain;
        margin-left: 4.854vw;
      }
      &__text {
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 4.369vw;
        color: #484848;
      }
    }
    &__link.active {
      background: #a0b0ff73;
    }
    &__link.active &__link__text {
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 4.369vw;
      color: #2c3b88;
    }
    &__exit {
      height: 11.165vw;
      width: 66.99vw;
      margin-top: auto;
      margin-bottom: 24px;
      border-top: 1px solid #00000064;
      display: flex;
      flex-direction: column;
      &__btn {
        display: flex;
        align-items: center;
        gap: 1.214vw;
        margin-top: auto;
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 18px;
        color: #484848;
        margin-left: 13px;
        img {
          width: 4.854vw;
          height: 4.854vw;
        }
      }
    }
  }
}
</style>
