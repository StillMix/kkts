<script setup lang="ts">
import { ref, computed, onMounted, watchEffect  } from "vue";// Импортируем computed
import { defineProps, defineEmits } from "vue"; // Импортируем defineProps и defineEmits

// Определяем пропсы
const props = defineProps({
  isOpene: {
    type: Boolean,
    required: true,
  },
  teach: {
    type: Object,
    required: true,
  }, // предполагаем, что teach это объект с полем name
});



onMounted(() => {
  console.log(props.teach.value)// Используем teacher.value для логирования
});



// Эмитируем событие
const emit = defineEmits<{
  (event: "update:isOpene", value: boolean): void;
}>();

const handlePopupTeach = (event: Event): void => {
  const target = event.target as HTMLElement | null;

  if (target && !target.closest(".popupteach__popup")) {
    emit("update:isOpene", false);
    document.body.classList.remove("modal-open");
  }
};

const handleBtnPopupTeach = (): void => {
  emit("update:isOpene", false);
  document.body.classList.remove("modal-open");
};



const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Не удалось скопировать в буфер обмена: ", err);
  }
};




</script>

<template>
  <div v-if="props.isOpene" @click="handlePopupTeach" class="popupteach">
    <div v-if="props.teach" class="popupteach__popup" @click.stop>
      <div class="popupteach__popup__header">
        <img
          src="../assets/mainteachbck.svg"
          class="popupteach__popup__header__imgbck"
        />
        <img
          src="../assets/mainTeachW.svg"
          class="popupteach__popup__header__imgteach"
        />
        <!-- Отображаем fullname преподавателя -->
        <p class="popupteach__popup__header__teach">{{ props.teach.fullname }}</p>
        <div class="popupteach__popup__header__con">
          <p class="popupteach__popup__header__con__gmail">
            <img src="../assets/mainGmail.svg" />
            {{ props.teach.gmail }}
          </p>
          <button
            @click="copyToClipboard(props.teach.gmail)"
            class="popupteach__popup__header__con__btn"
          >
            Скопировать <img src="../assets/mainArrW.svg" />
          </button>
        </div>
      </div>
      <div class="popupteach__popup__main">
        <a
          class="popupteach__popup__main__text"
          :href="props.teach.vk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="../assets/url.svg" />
          {{ props.teach.vk }}
        </a>
        <button
          @click="handleBtnPopupTeach()"
          class="popupteach__popup__main__btn"
        >
          НАЗАД
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popupteach {
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 2;
  &__popup {
    overflow: hidden;
    border-radius: 7.282vw 7.282vw 0 0;
    width: 100vw;
    min-height: 89.563vw;
    background: #fff;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    bottom: 0;
    &__header {
      width: 100vw;
      height: 51.699vw;
      background: #2c3b88;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: end;
      padding-left: 2.67vw;
      &__imgbck {
        height: 51.699vw;
        width: 80.097vw;
        position: absolute;
        left: 0;
        top: 0;
      }
      &__imgteach {
        width: 7.282vw;
        height: 7.282vw;
      }
      &__teach {
        margin-bottom: 2.427vw;
        font-family: var(--font-family);
        font-weight: 900;
        font-size: 5.825vw;
        color: #fff;
      }
      &__con {
        margin-bottom: 3.398vw;
        width: 93.204vw;
        height: 8.495vw;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        &__gmail {
          display: flex;
          align-items: center;
          gap: 1.214vw;
          font-family: var(--font-family);
          font-weight: 500;
          font-size: 3.398vw;
          line-height: 100%;
          color: #fff;
        }
        &__btn {
          display: flex;
          align-items: center;
          font-family: var(--font-family);
          font-weight: 500;
          font-size: 3.398vw;
          text-align: right;
          color: #fff;
        }
      }
    }
    &__main {
      &__text {
        font-family: var(--font-family);
        font-weight: 500;
        font-size: 3.398vw;
        width: 93.204vw;
        margin-top: 3.398vw;
        line-height: 100%;
        color: #000;
        opacity: 0.4;
        display: flex;
        align-items: center;
        gap: 3.883vw;
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
        margin-top: 7.282vw;
      }
    }
  }
}
</style>
