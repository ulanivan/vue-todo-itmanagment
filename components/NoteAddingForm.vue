<template>
  <div class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Add new note</h3>
          <button @click.prevent="$emit('closeModal')" class="close-button">×</button>
        </div>
        <div class="modal-body">
          <div class="group">
            <input v-model="noteTitle" id="note-title" type="text" required>
            <span class="bar"></span>
            <label for="note-title">Note title</label>
          </div>
          <div>
            <h3>Todos</h3>
            <ul class="todo-list">
              <li class="todo-list_item"
                  style="text-align: start"
                  v-for="item in todos" :key="item.id"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <add-todo @addTodo="addTodo" class="add-todo-form mt20px" />
          <button @click.prevent="saveNote" class="save-note-button">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AddTodo from "./AddTodo";
  export default {
      data() {
          return {
              noteTitle: null,
              todos: [],
          }
      },
      components: {
        AddTodo
      },
      methods: {
          saveNote() {
              const note = {
                  title: this.noteTitle,
                  todos: this.todos,
              };

              this.$store.commit('notes/addNote', note);
              this.$emit('closeModal');
          },
          addTodo(todo) {
            this.todos.push(todo);
          }
      }
  }
</script>

<style scoped lang="scss">
  .add-todo-button {
    border: none;
    outline: none;
    padding: 0;
    background-color: #FFFFFF;
    cursor: pointer;
    margin-top: -12px;
  }
  .add-todo-form {
    display: flex;
    margin-top: 20px;
  }
  .todo-list {
    margin-top: 20px;
  }
  .save-note-button {
    border: none;
    border-radius: 6px;
    padding: 0 16px;
    height: 36px;
    text-align: center;
    text-transform: uppercase;
    color: #FFFFFF;
    background-color: rgb(33, 150, 243);
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    font-family: sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 36px;
    outline: none;
    cursor: pointer;
    transition: .5s;
    &:hover {
      background-color: rgb(33, 140, 278);
    }
  }
  .group {
    position: relative;
    margin-bottom: 30px;
  }
  input {
    font-size: 16px;
    padding: 10px;
    display: block;
    width: 300px;
    border: none;
    border-bottom: 1px solid #ccc;
    &:focus {
      outline: none;
    }
  }
  label {
    color: #999;
    font-size: 18px;
    position: absolute;
    pointer-events: none;
    left: 10px;
    top: 15px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }
  input:focus ~ label, input:valid ~ label {
    top: -15px;
    font-size: 14px;
    color: #5264AE;
  }
  .bar {
    position: relative;
    display: block;
    width: 320px;
  }
  .bar:before, .bar:after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 0;
    position: absolute;
    background: #5264AE;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }
  .bar:before {
    left: 50%;
  }
  .bar:after {
    right: 50%;
  }
  input:focus ~ .bar:before,
  input:focus ~ .bar:after {
    width: 50%;
  }
  .modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1011;
    opacity: 1;
    pointer-events: auto;
    overflow-y: auto;
    -webkit-transition: opacity 400ms ease-in;
    -moz-transition: opacity 400ms ease-in;
    transition: opacity 400ms ease-in;
  }
  .modal-dialog {
    position: relative;
    width: auto;
    margin: 10px;
    @media (min-width: 576px) {
      & {
        max-width: 500px;
        margin: 100px auto;
      }
    }
  }
  .modal-content {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    background-color: #fff;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: .3rem;
    outline: 0;
    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
    box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
  }
  .modal-header {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid #eceeef;
  }
  .modal-title {
    margin-top: 0;
    margin-bottom: 0;
    line-height: 1.5;
    font-size: 1.25rem;
    font-weight: 500;
  }
  .close-button {
    float: right;
    font-family: sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .5;
    text-decoration: none;
    border: none;
    background-color: #FFFFFF;
    cursor: pointer;
    outline: none;
  }
  .close-button:focus,
  .close-button:hover {
    color: #000;
    opacity: .75;
  }
  .modal-body {
    position: relative;
    -webkit-box-flex: 1;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 15px;
    overflow: auto;
  }
</style>
