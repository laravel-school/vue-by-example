let Task = {
  props: ["task"],
  template: `
    <div>
        <span :class="{ done: task.done === true }">{{ task.title }}</span>
        <a href="" @click.prevent="toggleDone(task.id)">Make is done</a> |
        <a href="">Delete</a>
    </div>
  `,
  methods: {
    toggleDone(id) {
      let task = this.tasks.find((task) => {
        return task.id === id;
      });

      if (task) {
        task.done = true;
      }
    },
  },
};

let Tasks = {
  components: {
    task: Task,
  },
  data() {
    return {
      tasks: [
        { id: 1, title: "Go to University", done: false },
        { id: 2, title: "Teach UG Student", done: false },
        { id: 3, title: "Disucss with Prof.", done: false },
      ],
    };
  },
  template: `
        <div>
            <div class="tasks">
                <ul>
                    <li v-for="task in tasks">
                        <task :key="task.id" :task="task"></task>
                    </li>
                </ul>
            </div>
        </div>
    `,
};

let app = new Vue({
  el: "#app",
  components: {
    tasks: Tasks,
  },
});
