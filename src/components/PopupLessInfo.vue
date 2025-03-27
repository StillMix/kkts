<script setup lang="ts">
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  lesson: Object,
});

import { ref } from "vue";
import PopupTeacher from "./PopupTeacher.vue";

const currentTeach = ref<any>([]);
const isPopupOpen = ref<boolean>(false);

interface Teachers {
  id: string;
  fullname: string;
  gmail: string;
  vk: string;
}
const togglePopup = (teach: string): void => {
  let teachers: Teachers[] = JSON.parse(
    localStorage.getItem("teachers") || "[]"
  );

  const foundTeacher = teachers.find((i) => i.id.toString() === teach);

  if (foundTeacher) {
    currentTeach.value = foundTeacher;
  }

  isPopupOpen.value = !isPopupOpen.value;
};

const emit = defineEmits<{
  (event: "update:isOpen", value: boolean): void;
}>();
const handlePopupLess = (event: Event): void => {
  const target = event.target as HTMLElement | null;

  if (target && !target.closest(".popupless__popup")) {
    emit("update:isOpen", false);
    document.body.classList.remove("modal-open");
  }
};

const handleBtnPopupLess = (): void => {
  emit("update:isOpen", false);
  document.body.classList.remove("modal-open");
};

interface Teacher {
  id: string;
  name: string;
}

const fetchTeacher = (id: string): string | undefined => {
  // Получаем данные о учителях из localStorage
  let teachers: Teacher[] = JSON.parse(
    localStorage.getItem("teachers") || "[]"
  );

  // Ищем учителя с нужным id
  const teacher = teachers.find((i) => i.id.toString() === id);

  // Если учитель найден, возвращаем его имя
  if (teacher) {
    return teacher.name;
  } else {
    return undefined;
  }
};
</script>

<template>
  <div v-if="isOpen" @click="handlePopupLess" class="popupless">
    <PopupTeacher
      :isOpene="isPopupOpen"
      :teach="currentTeach"
      @update:isOpene="isPopupOpen = $event"
    />
    <div class="popupless__popup" v-if="lesson">
      <div class="popupless__popup__contt">
        <div class="popupless__popup__contt__colors">
          <div
            class="popupless__popup__contt__colors__color"
            :style="{ backgroundColor: lesson.color }"
          ></div>
        </div>
        <div class="popupless__popup__contt__text">
          <p class="popupless__popup__contt__text__title">{{ lesson.name }}</p>
        </div>
      </div>
      <button class="popupless__popup__el" @click="togglePopup(lesson.teacher)">
        <img src="../assets/mainTeacher.svg" />
        <div class="popupless__popup__el__con">
          <p class="popupless__popup__el__con__title">
            {{ fetchTeacher(lesson.teacher) }}
          </p>
          <img
            src="../assets/mainArr.svg"
            class="popupless__popup__el__con__arr"
          />
        </div>
      </button>
      <button
        class="popupless__popup__el"
        @click="togglePopup(lesson.teacher2)"
        v-if="lesson.teacher2"
      >
        <img src="../assets/mainTeacher.svg" />
        <div class="popupless__popup__el__con">
          <p class="popupless__popup__el__con__title">{{ lesson.teacher2 }}</p>
          <img
            src="../assets/mainArr.svg"
            class="popupless__popup__el__con__arr"
          />
        </div>
      </button>
      <div class="popupless__popup__el">
        <img src="../assets/mainClock.svg" />
        <div class="popupless__popup__el__con">
          <p class="popupless__popup__el__con__title">
            {{ lesson.start }} - {{ lesson.end }}
          </p>
        </div>
      </div>
      <div class="popupless__popup__el">
        <img src="../assets/mainTeacher.svg" />
        <div class="popupless__popup__el__con">
          <p class="popupless__popup__el__con__title">
            {{ lesson.class }} · {{ lesson.adress }}
          </p>
        </div>
      </div>
      <button @click="handleBtnPopupLess()" class="popupless__popup__btn">
        НАЗАД
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popupless {
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 1;
  &__popup {
    border-radius: 7.282vw 7.282vw 0 0;
    width: 100vw;
    min-height: 89.563vw;
    background: #fff;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.427vw;
    bottom: 0;
    &__contt {
      display: flex;
      margin-top: 7.282vw;
      width: 87.136vw;
      gap: 3.641vw;
      &__colors {
        flex-shrink: 0;
        width: 5.825vw;
        &__color {
          width: 3.398vw;
          height: 3.398vw;
          border-radius: 100%;
        }
      }
      &__text {
        &__title {
          font-family: var(--font-family);
          font-weight: 500;
          font-size: 4.854vw;
          line-height: 100%;
          color: #000;
        }
      }
    }
    &__el {
      height: 8.495vw;
      display: flex;
      align-items: end;
      gap: 3.641vw;
      position: relative;
      width: 87.136vw;
      &__con {
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
        height: 100%;

        &__title {
          font-family: var(--font-family);
          font-weight: 500;
          font-size: 3.398vw;
          line-height: 100%;
          color: rgba(0, 0, 0, 0.4);
          height: 5.825vw;
          display: flex;
          align-items: center;
        }
        &__arr {
          width: 5.825vw;
          height: 5.825vw;
        }
      }
    }
    &__btn {
      font-family: var(--font-family);
      font-weight: 900;
      font-size: 4.369vw;
      text-align: center;
      color: #fff;
      border-radius: 48.544vw;
      width: 89.078vw;
      height: 13.107vw;
      background: #2c3b88;
    }
  }
}
</style>
