let Answer = {
  props: ["answer"],
  template: `
        <div>
            <label :for="'answer-' + answer.id">
                <input  type="radio" name="answer" :value="'answer-' + answer.id" />
                {{ answer.title }}
            </label>
        </div>   
    `,
};

let Question = {
  props: ["question"],
  components: {
    answer: Answer,
  },
  template: `
        <div>
            <h4>{{ question.title }}</h4>
            
            <answer v-for="answer in question.answers" :answer="answer"></answer>
        </div>
    `,
};

let Quiz = {
  components: {
    question: Question,
  },
  data() {
    return {
      questions: [],
      currentQuestion: null,
    };
  },
  mounted() {
    axios.get("../data.json").then((response) => {
      this.questions = response.data;
      this.currentQuestion = this.questions[0];

      // console.log(this.currentQuestion.answers);
    });
  },
  template: `
        <div>
            <h1>Question x of y</h1>
            <question v-if="currentQuestion" :question="currentQuestion"></question>
        </div>
    `,
};

let app = new Vue({
  el: "#app",
  data: {},
  components: {
    quiz: Quiz,
  },
});
