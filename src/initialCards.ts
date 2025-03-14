// session.ts

export interface SessionItem {
  name: string;
  teacher: string;
  teacher2: string;
  start: string;
  end: string;
  class: string;
  color: string;
}

export interface SessionGroup {
  group: string;
  date: string;
  session: SessionItem[];
}

// Экспортируем массив с расписанием
export const session: SessionGroup[] = [
  {
    group: "1 ПЕД Б",
    date: "14.03.2025",
    session: [
      {
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефремова О.В.",
        teacher2: '',
        start: "8:30",
        end: "10:00",
        class: "КГУ373",
        color: "#dc08d3",
      },
      {
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефремова О.В.",
        teacher2: '',
        start: "12:15",
        end: "13:45",
        class: "КГУ373",
        color: "#dc08d3",
      },
      {
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефремова О.В.",
        teacher2: '',
        start: "10:15",
        end: "11:45",
        class: "КГУ373",
        color: "#dc08d3",
      },

      {
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефремова О.В.",
        teacher2: '',
        start: "17:00",
        end: "21:45",
        class: "КГУ373",
        color: "#dc08d3",
      },
      {
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефремова О.В.",
        teacher2: "Ефремова О.В.",
        start: "21:45",
        end: "23:59",
        class: "КГУ373",
        color: "#dc08d3",
      },
      
    ],
  },
  {
    group: "1 ПЕД Б",
    date: "15.03.2025",
    session: [
      {
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефремова О.В.",
        teacher2: '',
        start: "8:30",
        end: "10:00",
        class: "КГУ373",
        color: "#dc08d3",
      },
      {
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефремова О.В.",
        teacher2: '',
        start: "12:15",
        end: "13:45",
        class: "КГУ373",
        color: "#dc08d3",
      },
      {
        name: "Русский язык с методикой преподавания",
        teacher: "Ефремова О.В.",
        teacher2: '',
        start: "10:15",
        end: "11:45",
        class: "315",
        color: "#dca108",
      },
      {
        name: "Русский язык с методикой преподавания",
        teacher: "Ефремова О.В.",
        teacher2: '',
        start: "14:00",
        end: "15:30",
        class: "315",
        color: "#dca108",
      },
    ],
  },
  {
    group: "1 ПЕД Б",
    date: "16.03.2025",
    session: [
      {
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефремова О.В.",
        teacher2: '',
        start: "8:30",
        end: "10:00",
        class: "КГУ373",
        color: "#dc08d3",
      },
      {
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефремова О.В.",
        teacher2: 'Ефремова О.В.',
        start: "12:15",
        end: "13:45",
        class: "КГУ373",
        color: "#dc08d3",
      },
      {
        name: "Русский язык с методикой преподавания",
        teacher: "Ефремова О.В.",
        teacher2: '',
        start: "10:15",
        end: "11:45",
        class: "315",
        color: "#dca108",
      },
      {
        name: "Русский язык с методикой преподавания",
        teacher: "Ефремова О.В.",
        teacher2: '',
        start: "14:00",
        end: "15:30",
        class: "315",
        color: "#dca108",
      },
    ],
  },
];
