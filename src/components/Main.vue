<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import Menu from "./Menu.vue";
import { session, SessionGroup } from "../initialCards";

// Состояние меню
const isMenuOpen = ref<boolean>(false);
const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Функция получения текущей недели
const getCurrentWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 - вс, 1 - пн, ..., 6 - сб
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const sundayOffset = 7 + mondayOffset - 1;

  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);
  const sunday = new Date(today);
  sunday.setDate(today.getDate() + sundayOffset);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return {
    start: formatDate(monday),
    end: formatDate(sunday),
    today: formatDate(today),
  };
};

// Получаем текущую неделю
const currentWeek = getCurrentWeek();

// Текущее время (обновляется каждую секунду)
const now = ref(new Date());

// Обновление времени каждую секунду
let timer: ReturnType<typeof setInterval> | null = null;
onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date();
  }, 1000);
});
onUnmounted(() => {
  if (timer) clearInterval(timer);
});

// Фильтрация и сортировка занятий
const filteredSessions = computed(() => {
  return session
    .filter((s) => {
      const sessionDate = s.date.split(".").reverse().join("-"); // YYYY-MM-DD
      return (
        sessionDate >= currentWeek.today.split(".").reverse().join("-") &&
        sessionDate <= currentWeek.end.split(".").reverse().join("-")
      );
    })
    .map((s) => ({
      ...s,
      session: [...s.session]
        .filter((lesson) => {
          if (s.date === currentWeek.today) {
            return (
              lesson.end >
              now.value.toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              })
            );
          }
          return true;
        })
        .sort(
          (a, b) =>
            Number(a.start.replace(":", "")) - Number(b.start.replace(":", ""))
        ),
    }))
    .filter((s) => s.session.length > 0);
});

// Функция определения текущего занятия
const getCurrentLesson = (day: SessionGroup) => {
  const nowTime = Number(
    now.value
      .toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
      .replace(":", "")
  );
  return day.session.find(
    (lesson) =>
      Number(lesson.start.replace(":", "")) <= nowTime &&
      Number(lesson.end.replace(":", "")) > nowTime
  );
};

// Функция получения времени до конца урока (чч:мм:сс)
const getTimeRemaining = (lessonEnd: string) => {
  const [endHours, endMinutes] = lessonEnd.split(":").map(Number);
  const nowTime = now.value;
  const endTime = new Date();
  endTime.setHours(endHours, endMinutes, 0, 0);

  let diff = Math.floor((endTime.getTime() - nowTime.getTime()) / 1000); // Разница в секундах

  if (diff <= 0) return "00:00:00"; // Если урок уже закончился

  const hours = String(Math.floor(diff / 3600)).padStart(2, "0");
  diff %= 3600;
  const minutes = String(Math.floor(diff / 60)).padStart(2, "0");
  const seconds = String(diff % 60).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
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

    <div class="main__main">
      <div
        v-for="day in filteredSessions"
        :key="day.date"
        class="main__main__card"
      >
        <p class="main__main__card__data">
          {{
            new Date(day.date.split(".").reverse().join("-"))
              .toLocaleDateString("ru-RU", {
                weekday: "long",
                day: "2-digit",
                month: "short",
              })
              .replace(/^./, (char) => char.toUpperCase())
          }}
        </p>

        <div
          v-for="lesson in day.session"
          :key="lesson.start"
          class="main__main__card__session"
          :class="{ 'current-lesson': getCurrentLesson(day) === lesson }"
        >
          <div class="color" :style="{ backgroundColor: lesson.color }"></div>
          <div class="main__main__card__session__info">
            <div class="main__main__card__session__info__cont">
              <div class="main__main__card__session__info__cont__classes">
                <p
                  class="main__main__card__session__info__cont__classes__title"
                >
                  {{ lesson.name }}
                </p>
                <div
                  class="main__main__card__session__info__cont__classes__clock"
                >
                  <p
                    class="main__main__card__session__info__cont__classes__clock__teacher"
                  >
                    <img src="../assets/mainTeacher.svg" /> {{ lesson.teacher }} {{ lesson.teacher2 }}
                  </p>
                  <p
                    class="main__main__card__session__info__cont__classes__clock__start"
                  >
                    <img src="../assets/mainClock.svg" />{{ lesson.start }} —
                    {{ lesson.end }}
                  </p>
                </div>
              </div>
              <div class="main__main__card__session__info__cont__class">
                <p class="main__main__card__session__info__cont__class__text">
                  {{ lesson.class }}
                </p>
              </div>
            </div>
            <div v-if="getCurrentLesson(day) === lesson" class="countdown">
              <p class="countdown__text">
                <img src="../assets/mainClockO.svg" />Сейчас идёт · Осталось
                {{ getTimeRemaining(lesson.end) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p v-if="filteredSessions.length === 0" class="no-sessions">
        Занятий больше нет на этой неделе
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.color {
  width: 0.971vw;
}
.main {
  padding-bottom: 7.282vw;
  min-height: 100vh;
  background-color: #f3f5ff;
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
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 5.825vw;
      color: #484848;
    }
  }

  &__main {
    width: 100%;
    display: flex;
    gap: 5.34vw;
    margin-top: 5.34vw;
    flex-direction: column;
    align-items: center;

    &__card {
      display: flex;
      flex-direction: column;
      gap: 2.427vw;
      width: 92.961vw;

      &__data {
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 7.282vw;
        color: #484848;
      }

      &__session {
        overflow: hidden;
        border-radius: 2.427vw;
        width: 92.961vw;
        display: flex;
        gap: 2.184vw;
        background: #fff;
        min-height: 21.602vw;
        &__info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          &__cont {
            display: flex;
            justify-content: space-between;
            width: 87.379vw;
            &__classes {
              &__title {
                font-family: var(--font-family);
                font-weight: 500;
                font-size: 3.883vw;
                line-height: 100%;
                color: #000;
              }
              &__clock {
                margin-top: 1.942vw;
                width: 61.165vw;
                display: flex;
                justify-content: space-between;
                &__teacher {
                  font-family: var(--font-family);
                  font-weight: 500;
                  font-size: 3.398vw;
                  line-height: 100%;
                  color: #000;
                  opacity: 0.4;
                  height: 4.854vw;
                  display: flex;
                  align-items: center;
                  img {
                    width: 4.854vw;
                    height: 4.854vw;
                    margin-right: 0.728vw;
                  }
                }
                &__start {
                  font-family: var(--font-family);
                  font-weight: 500;
                  font-size: 3.398vw;
                  line-height: 100%;
                  color: #000;
                  opacity: 0.4;
                  height: 4.854vw;
                  display: flex;
                  align-items: center;
                  flex-shrink: 0;
                  img {
                    width: 4.854vw;
                    height: 4.854vw;
                    margin-right: 0.728vw;
                  }
                }
              }
            }
            &__class {
              min-width: 18.689vw;
              height: 12.864vw;
              display: flex;
              align-items: center;
              justify-content: center;
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
        &.current-lesson {
          background: #2c3b88;
          min-height: 31.796vw;
          .main__main__card__session{
            &__info {
              &__cont {
               &__classes {
              &__title {
                color: #fff;
              }
          
              &__clock {
                &__teacher {
                  color: #fff;
                }
                &__start {
                  color: #fff;
                }
              }
            }
            &__class{
              &__text{
                color: #fff;
              }
            }
          }
        }
      }
    }

        .countdown {
          min-height: 8.495vw;
          margin-top: 2.427vw;
          border-top: 0.243vw solid rgba(255, 255, 255, 0.2);
          display: flex;
          flex-direction: column;
          justify-content: end;
          &__text {
            font-family: var(--font-family);
            font-weight: 500;
            font-size: 3.398vw;
            color: #fff;
            display: flex;
            align-items: center;
            img{
              width: 5.825vw;
              height: 5.825vw;
              margin-right: 0.728vw;
            }
          }
        }
      }
    }
  }

  .no-sessions {
    text-align: center;
    font-size: 3.883vw;
    color: gray;
  }
}
</style>
