let Answer = {
  props: ["answer"],
  methods: {
    chosen(answer) {
      this.$emit("answer:chosen", answer);
    },
  },
  template: `
        <div>
            <label :for="'answer-' + answer.id">
                <input  type="radio" name="answer" :value="'answer-' + answer.id" @click="chosen(answer)"/>
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
  data() {
    return {
      showNextButton: false,
      answerChosen: null,
    };
  },
  methods: {
    answerClicked(answer) {
      this.showNextButton = true;
      this.answerChosen = answer;
    },
    nextQuestion() {
      this.$emit("answerGiven", this.answerChosen, this.question);
    },
  },
  template: `
        <div>
            <h4>{{ question.title }}</h4>
            
            <answer 
                v-for="answer in question.answers" 
                :answer="answer"
                v-on:answer:chosen="answerClicked"
            ></answer>

            <button v-if="showNextButton" @click.prevent="nextQuestion">Next</button>
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
      correctAnswers: [],
    };
  },
  mounted() {
    axios.get("../data.json").then((response) => {
      this.questions = response.data;
      this.currentQuestion = this.questions[0];
    });
  },
  methods: {
    answerGiven(answer, question) {
      this.correctAnswers.push({
        question: question,
        answer: answer,
      });

      console.log(this.correctAnswers);
    },
  },
  template: `
        <div>
            <h1>Question x of y</h1>
            <question 
                v-if="currentQuestion" 
                :question="currentQuestion"
                v-on:answerGiven="answerGiven"
            ></question>

            {{ correctAnswers }}
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
