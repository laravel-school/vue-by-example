let bus = new Vue();

let Item = {
  data() {
    return {
      form: {
        item: "",
        done: false,
      },
    };
  },
  methods: {
    add() {
      this.$emit("task:add", this.form);
      this.form.item = "";
    },
  },
  template: `
        <div>
            <hr/>
            <h4>Add a new item</h4>
            <form @submit.prevent="add">
                <div>
                    <textarea v-model="form.item"></textarea>
                </div>
                <div>
                    <input type="checkbox" v-model="form.done"> Is completed?
                </div>
                <div>
                    <button>Add Now</button>
                </div>
            </form>
        </div>
    `,
};

let Task = {
  props: ["task"],
  template: `
    <div>
        <span :class="{ done: task.done }">{{ task.title }}</span>
        <a href="" @click.prevent="toggleDone(task.id)">
            Make it {{ task.done ? 'not done' : 'done' }}
        </a> |
        <a href="" @click.prevent="deleteTask(task.id)">Delete</a>
    </div>
  `,
  methods: {
    toggleDone(id) {
      bus.$emit("task:toggleDone", id);
    },
    deleteTask(id) {
      bus.$emit("task:delete", id);
    },
  },
};

let Tasks = {
  components: {
    task: Task,
    item: Item,
  },
  data() {
    return {
      tasks: [
        { id: 1, title: "Go to University", done: true },
        { id: 2, title: "Teach UG Student", done: false },
        { id: 3, title: "Disucss with Prof.", done: false },
      ],
    };
  },
  methods: {
    toggleDone(id) {
      this.tasks.map((task) => {
        if (task.id === id) {
          task.done = !task.done;
        }
      });
    },
    delete(id) {
      this.tasks = this.tasks.filter((task) => {
        return task.id !== id;
      });
    },
    add(form) {
      let newItem = {
        id: this.getId(),
        title: form.item,
        done: form.done,
      };

      this.tasks.unshift(newItem);
    },
    getId() {
      return this.tasks.length + 1;
    },
  },
  mounted() {
    bus.$on("task:toggleDone", (id) => {
      this.toggleDone(id);
    });
    bus.$on("task:delete", (id) => {
      this.delete(id);
    });
  },
  template: `
        <div>
            <div class="tasks">
                <template v-if="tasks.length > 0">
                    <ul>
                        <li v-for="task in tasks">
                            <task :key="task.id" :task="task"></task>
                        </li>
                    </ul>
                </template>
                <template v-else>
                    <p>No task yet.</p>
                </template>

                <item v-on:task:add="add"></item>
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
