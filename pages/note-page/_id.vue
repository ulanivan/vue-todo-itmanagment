<template>
  <div v-if="note" class="edit-note-page-container">
    <div class="edit-note-page-container__form">
      <div class="edit-note-page-container__header">
        <h1 class="note-title">{{ note.title }}</h1>
        <button class="remove-note-button" @click.prevent="openModelAgree(removeNote)">
          <svg height="12px" viewBox="0 0 365.71733 365" width="12px" xmlns="http://www.w3.org/2000/svg"><g fill="#f44336"><path d="m356.339844 296.347656-286.613282-286.613281c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503906-12.5 32.769532 0 45.25l286.613281 286.613282c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082032c12.523438-12.480468 12.523438-32.75.019532-45.25zm0 0"/><path d="m295.988281 9.734375-286.613281 286.613281c-12.5 12.5-12.5 32.769532 0 45.25l15.082031 15.082032c12.503907 12.5 32.769531 12.5 45.25 0l286.632813-286.59375c12.503906-12.5 12.503906-32.765626 0-45.246094l-15.082032-15.082032c-12.5-12.523437-32.765624-12.523437-45.269531-.023437zm0 0"/></g></svg>
        </button>
      </div>
      <template v-if="note.todos.length > 0">
        <div v-for="todo in note.todos"
             :key="todo.id"
             class="todo-item-wrap"
        >
          <app-checkbox
            :value="todo"
            :id="todo.id"
            :label="todo.name"
            v-model="selectedTodos"
            @updateLabel="updateCheckboxLabel"
          />
        </div>
      </template>
      <p v-else>No current tasks</p>
      <div class="edit-panel mt20px" v-if="selectedTodos.length > 0">
        <button class="dfl-btn button red" @click="openModelAgree(removeTodos)">
          Remove
        </button>
        <button class="dfl-btn button blue" @click.prevent="doneTodo">
          Done
        </button>
      </div>
      <add-todo @addTodo="addTodo" class="add-todo-form mt20px" :note="note" />
      <button @click="$store.commit('notes/updateNote', note), $router.push('/')" class="w-100 dfl-btn blue button">
        Save
      </button>
      <button @click.prevent="openModelAgree(() => $router.push('/'))" class="dfl-btn red w-100 mt10px button">
        Cancel changes
      </button>
    </div>
    <modal-agree :method="modalFunc" v-if="modalAgree" @getAgree="getAgree" />
  </div>
</template>

<script>
  import Checkbox from "@/components/Checkbox";
  import AddTodo from "@/components/AddTodo";
  import ModalAgree from "@/components/ModalAgree";
  import _ from 'lodash';

  export default {
    components: {
      AppCheckbox: Checkbox,
      AddTodo,
      ModalAgree
    },
    asyncData(ctx) {
      const {id, note} = ctx.params;
      return {id, cloneNote: _.cloneDeep(note)};
    },
    data() {
      return {
        selectedTodos: [],
        todo: null,
        modalAgree: false,
        modalFunc: null,
        note: null
      }
    },
    mounted() {
        this.note = this.cloneNote;
    },
    methods: {
      updateCheckboxLabel(data) {
        const {currentTodo, newValue} = data;
        this.note.todos.map(todo => {
          if (todo.id === currentTodo.id) {
            todo.name = newValue;
          }
        });
      },
      doneTodo() {
          this.note.todos.map(todo => {
            if (this.selectedTodos.includes(todo)) {
              todo.done = true;
            }
          });
      },
      removeTodos() {
        this.note.todos = this.note.todos.filter(todo => !this.selectedTodos.includes(todo));
        this.selectedTodos = [];
      },
      addTodo(todo) {
        this.note.todos = this.note.todos.concat(todo);
      },
      removeNote() {
        this.$router.push('/');
        this.$store.commit('notes/removeNote', this.note.id);
      },
      openModelAgree(func) {
        this.modalAgree = true;
        this.modalFunc = func;
      },
      getAgree(data) {
        const [method, resultAgree] = data;
        if (resultAgree) {
          method();
        }
        this.modalAgree = false;
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "assets/scss/variables";
  .edit-note-page-container__form {
    max-width: 600px;
  }
  .button {
    font-size: 14px;
    color: $white;
    font-weight: 600;
  }
  .todo-item-wrap {
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    word-break: break-all;
  }
  .edit-note-page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
  }
  .edit-note-page-container__header {
    display: flex;
    justify-content: space-between;
    h1 {
      margin-bottom: 20px;
    }
  }
  .remove-note-button {
    background-color: #FFFFFF;
    border: none;
    outline: none;
    cursor: pointer;
    margin-top: 4px;
    height: 20px;
  }
</style>
