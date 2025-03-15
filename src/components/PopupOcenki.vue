<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { ref, computed, watchEffect } from "vue";

const props = defineProps({
  isOpene: {
    type: Boolean,
    required: true,
  },
  ocenk: Object,
});

const emit = defineEmits<{
  (event: "update:isOpene", value: boolean): void;
}>();

const handlePopupOcen = (event: Event): void => {
  const target = event.target as HTMLElement | null;

  if (target && !target.closest(".popupocen__popup")) {
    emit("update:isOpene", false);
    document.body.classList.remove("modal-open");
  }
};

const handleBtnPopupOcen = (): void => {
  emit("update:isOpene", false);
  document.body.classList.remove("modal-open");
};

// Массив для отслеживания активных кнопок
const activeButtons = ref<string[]>([]);

// Фильтрация оценок по нажатию на кнопки
const filteredOcenki = computed(() => {
  if (activeButtons.value.length === 0) {
    return props.ocenk?.ocenki || [];
  }
  return (props.ocenk?.ocenki || []).filter((oc: { name: string }) =>
    activeButtons.value.includes(oc.name)
  );
});

// Для вычисления уникальных имен
const uniqueNames = computed(() => {
  return props.ocenk && props.ocenk.ocenki
    ? Array.from(
        new Set(props.ocenk.ocenki.map((oc: { name: string }) => oc.name))
      )
    : [];
});

// Функция для обновления активных кнопок
const toggleButton = (name: string) => {
  if (activeButtons.value.includes(name)) {
    activeButtons.value = [];
  } else {
    activeButtons.value = [name];
  }
};


const ocenkinum = ref<number[]>([]);
const srbal = ref<number>(0);

const ocenkiScet = () => {
  if (!props.ocenk || !props.ocenk.ocenki) return;

  ocenkinum.value = props.ocenk.ocenki.map((oc: { ocenka: string }) =>
    parseFloat(oc.ocenka)
  );

  const sum = ocenkinum.value.reduce((acc, curr) => acc + curr, 0);
  srbal.value = ocenkinum.value.length
    ? Math.round((sum / ocenkinum.value.length) * 100) / 100
    : 0;
};

watchEffect(() => {
  ocenkiScet();
});
</script>

<template>
  <div v-if="props.isOpene" @click="handlePopupOcen" class="popupocen">
    <div v-if="ocenk" class="popupocen__popup">
      <div class="popupocen__popup__header">
        <p class="popupocen__popup__header__title">{{ ocenk.predmet }}</p>
        <p class="popupocen__popup__header__text">{{ srbal }}</p>
      </div>
      <div class="popupocen__popup__info">
        <p class="popupocen__popup__info__pokaz">
          <img src="../assets/star.svg" />
          {{
            ocenk.srbal >= 4.5
              ? "Отлично"
              : ocenk.srbal >= 3.5
              ? "Хорошо"
              : ocenk.srbal >= 2.5
              ? "Удовлет."
              : ocenk.srbal >= 2
              ? "Неудовлет."
              : "Неверная оценка"
          }}
        </p>
        <p class="popupocen__popup__info__kolvo">
          <img src="../assets/ocenka.svg" />
          Всего оценок: {{ ocenk.ocenki.length }}
        </p>
        <p
          class="popupocen__popup__info__attest"
          :style="{
            color: ocenk.attes === 'Аттестован' ? '#169a00' : '#9a0000',
          }"
        >
          {{ ocenk.attes }}
        </p>
      </div>
      <div class="popupocen__popup__btns">
        <button
          class="popupocen__popup__btns__btn"
          v-for="(subject, index) in uniqueNames"
          :key="index"
          :class="{
            'active-btn': activeButtons.includes(subject as string),
            'inactive-btn': !activeButtons.includes(subject as string)
          }"
          @click="toggleButton(subject as string)"
        >
          {{ subject }}
        </button>
      </div>
      <table class="popupocen__popup__table">
        <tbody class="popupocen__popup__table__tbody">
          <tr
            class="popupocen__popup__table__tbody__tr"
            v-for="(subject, index) in filteredOcenki"
            :key="index"
          >
            <th class="popupocen__popup__table__tbody__tr__name">
              {{ subject.name }}
            </th>
            <th class="popupocen__popup__table__tbody__tr__data">
              {{ subject.data }}
            </th>
            <th class="popupocen__popup__table__tbody__tr__ocenka">
              {{ subject.ocenka }}
            </th>
          </tr>
        </tbody>
      </table>
      <button @click="handleBtnPopupOcen" class="popupocen__popup__btn">
        НАЗАД
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popupocen {
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 1;
  &__popup {
    overflow: hidden;
    border-radius: 7.282vw 7.282vw 0 0;
    width: 100vw;
    min-height: 577px;
    background: #fff;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    bottom: 0;
    &__header {
      width: 372px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;
      &__title {
        font-family: var(--font-family);
        font-weight: 500;
        font-size: 16px;
        line-height: 100%;
        color: #000;
        opacity: 0.5;
      }
      &__text {
        font-family: var(--font-family);
        font-weight: 500;
        font-size: 20px;
        line-height: 100%;
        text-align: right;
        color: #000;
      }
    }
    &__info {
      height: 31px;
      width: 372px;
      border-top: 1px solid #000;
      opacity: 0.4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      &__pokaz {
        display: flex;
        align-items: center;
        gap: 4px;
        font-family: var(--font-family);
        font-weight: 500;
        font-size: 14px;
        line-height: 100%;
        color: #000;
      }
      &__kolvo {
        display: flex;
        align-items: center;
        gap: 4px;
        font-family: var(--font-family);
        font-weight: 500;
        font-size: 14px;
        line-height: 100%;
        color: #000;
      }
      &__attest {
        font-family: var(--font-family);
        font-weight: 500;
        font-size: 14px;
        line-height: 100%;
        text-align: right;
      }
    }
    &__btns {
      display: flex;
      flex-wrap: nowrap;
      width: 372px;
      overflow-y: scroll;
      gap: 10px;
      height: 41px;
      align-items: end;
      margin-top: 5px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      &__btn {
        border-radius: 70px;
        width: 167px;
        height: 30px;
        min-width: 167px;
        font-family: var(--font-family);
        font-weight: 500;
        font-size: 14px;
        line-height: 100%;
      }
      &__btn {
        border-radius: 70px;
        width: 167px;
        height: 30px;
        min-width: 167px;
        font-family: var(--font-family);
        font-weight: 500;
        font-size: 14px;
        line-height: 100%;
      }
      &__btn.active-btn {
          color: #2c3b88;
          background: rgba(160, 176, 255, 0.2);
        }
        &__btn.inactive-btn {
          color: #808080;
          background: rgba(175, 175, 175, 0.2);
        }
    }
    &__btns::-webkit-scrollbar {
      display: none;
    }
    &__table {
      width: 372px;
      height: 303px;
      overflow-y: auto;
      margin-top: 10px;
      border-collapse: collapse;
      &__tbody {
        display: flex;
        flex-direction: column-reverse;
        overflow-y: auto;
        max-height: 303px;
        border-collapse: collapse;
        &__tr {
          margin-bottom: 10px;
          &__name {
            font-family: var(--font-family);
            font-weight: 500;
            font-size: 14px;
            line-height: 100%;
            color: #000;
            width: 232px;
            opacity: 0.5;
            text-align: left;
          }
          &__data {
            font-family: var(--font-family);
            font-weight: 500;
            font-size: 14px;
            line-height: 100%;
            color: #000;
            width: 102px;
            opacity: 0.5;
            border-left: 1px solid rgba(0, 0, 0, 0.2);
            border-right: 1px solid rgba(0, 0, 0, 0.2);
          }
          &__ocenka {
            font-family: var(--font-family);
            font-weight: 500;
            font-size: 14px;
            line-height: 100%;
            color: #000;
            width: 30px;
          }
        }
      }
    }
    &__btn {
      border-radius: 200px;
      width: 367px;
      height: 54px;
      background: #2c3b88;
      margin-top: 16px;
      font-family: var(--font-family);
      font-weight: 900;
      font-size: 18px;
      text-align: center;
      color: #fff;
    }
  }
}
</style>
