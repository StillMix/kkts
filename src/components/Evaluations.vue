<script setup lang="ts">
import { ref, computed } from "vue";
import Menu from "./Menu.vue";
import { student, StudentGroup, StudentGroupOcenki } from "../initialCards";
import PopupOcenki from "./PopupOcenki.vue";
const isMenuOpen = ref<boolean>(false);

const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value;
};

const currentOcen = ref<any>(null);
const isPopupOcenOpen = ref<boolean>(false);

const togglePopupOcen = (less: any): void => {
  currentOcen.value = less;  // Сохраняем информацию о выбранном уроке
  isPopupOcenOpen.value = !isPopupOcenOpen.value;  // Переключаем состояние попапа
  
  // Добавляем или удаляем класс для блокировки прокрутки
  if (isPopupOcenOpen.value) {
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
  }
};

const ocenkinum = ref<number[]>([]);
const srbal = ref<number>(0);
const studentoc = ref<any[]>(student.flatMap((stud) => stud.ocenki));

const ocenkiScet = () => {
  student.forEach((stud) => {
    stud.ocenki.forEach((oc) => {
      ocenkinum.value.push(parseFloat(oc.srbal));
    });
  });

  const sum = ocenkinum.value.reduce((acc, curr) => acc + curr, 0);

  srbal.value = sum / ocenkinum.value.length;
};

ocenkiScet();
</script>

<template>
  <div class="evaluations">
    <Menu :isOpen="isMenuOpen" @update:isOpen="isMenuOpen = $event" />
    <PopupOcenki :isOpene="isPopupOcenOpen" :ocenk="currentOcen || {}" @update:isOpene="isPopupOcenOpen = $event"/>
    <header class="evaluations__header">
      <button @click="toggleMenu" class="evaluations__header__btn">
        <img alt="menu" src="../assets/menu.svg" />
      </button>
      <p class="evaluations__header__title">Оценки</p>
    </header>
    <div class="evaluations__srbal">
      <img src="../assets/evaluations.svg" class="evaluations__srbal__imgbck" />
      <p class="evaluations__srbal__num">{{ srbal }}</p>
      <p class="evaluations__srbal__title">Средний балл</p>
    </div>
    <div class="evaluations__cards">
      <button
        v-for="(subject, index) in studentoc"
        :key="index"
        class="evaluations__cards__card"
        @click="togglePopupOcen(subject)"
      >
        <div
          :style="{ backgroundColor: subject.color }"
          class="evaluations__cards__card__color"
        ></div>
        <div class="evaluations__cards__card__infoco">
          <p class="evaluations__cards__card__infoco__title">
            {{ subject.predmet }}
          </p>
          <div class="evaluations__cards__card__infoco__ocen">
            <p class="evaluations__cards__card__infoco__ocen__pokaz">
              <img src="../assets/star.svg" />
              {{
                subject.srbal >= 4.5
                  ? "Отлично"
                  : subject.srbal >= 3.5
                  ? "Хорошо"
                  : subject.srbal >= 2.5
                  ? "Удовлет."
                  : subject.srbal >= 2
                  ? "Неудовлет."
                  : "Неверная оценка"
              }}
            </p>
            <p class="evaluations__cards__card__infoco__ocen__pokaz">
              <img src="../assets/ocenka.svg" />
              Всего оценок: {{ subject.ocenki.length }}
            </p>
          </div>
        </div>
        <div class="evaluations__cards__card__srbal">
          <p class="evaluations__cards__card__srbal__text">
            {{ subject.srbal }}
          </p>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.evaluations {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f3f5ff;
  position: relative;
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
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 5.825vw;
      color: #484848;
    }
  }
  &__srbal {
    margin-top: 5.34vw;
    border-radius: 2.427vw;
    width: 92.961vw;
    height: 55.825vw;
    background: #2c3b88;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &__imgbck {
      width: 73.058vw;
      height: 73.058vw;
      transform: rotate(15deg);
      position: absolute;
      opacity: 0.3;
      left: -17.476vw;
      bottom: -15.049vw;
    }
    &__num {
      font-family: var(--font-family);
      font-weight: 500;
      font-size: 16.99vw;
      text-align: center;
      color: #fff;
    }
    &__title {
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 2.913vw;
      color: rgba(255, 255, 255, 0.5);
    }
  }
  &__cards {
    width: 92.961vw;
    margin-top: 4.854vw;
    display: flex;
    flex-direction: column;
    gap: 2.427vw;
    &__card {
      min-height: 21.602vw;
      background: #fff;
      width: 100%;
      border-radius: 2.427vw;
      display: flex;
      align-items: center;
      overflow: hidden;
      &__color {
        width: 0.971vw;
        height: 22.33vw;
        flex-shrink: 0;
      }
      &__infoco {
        width: 67.718vw;
        margin-left: 2.184vw;
        &__title {
          font-family: var(--font-family);
          font-weight: 500;
          font-size: 3.883vw;
          line-height: 100%;
          color: #000;
        }
        &__ocen {
          display: flex;
          width: 59.951vw;
          justify-content: space-between;
          margin-top: 1.942vw;
          &__pokaz {
            font-family: var(--font-family);
            font-weight: 500;
            font-size: 3.398vw;
            line-height: 100%;
            color: #000;
            opacity: 0.4;
            display: flex;
            align-items: center;
            img {
              width: 4.854vw;
              height: 4.854vw;
              margin-right: 0.971vw;
            }
          }
        }
      }
      &__srbal {
        margin-left: auto;
        margin-right: 2.427vw;
        &__text {
          font-family: var(--font-family);
          font-weight: 500;
          font-size: 5.825vw;
          line-height: 100%;
          text-align: right;
          color: #000;
        }
      }
    }
  }
}
</style>
