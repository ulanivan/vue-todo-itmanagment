<template>
  <div class="note-item">
    <h2>{{ note.title }}</h2>
    <template>
      <ul>
        <li v-for="todo in note.todos"
             :key="todo.id"
             class="todo-item-wrap"
        >
          <app-checkbox
            :notVisible="true"
            :value="todo"
            :label="todo.name"
          />
        </li>
      </ul>
    </template>
    <button class="remove-note-button" @click.prevent="openModelAgree(removeNote)">
      <svg height="12px" viewBox="0 0 365.71733 365" width="12px" xmlns="http://www.w3.org/2000/svg"><g fill="#f44336"><path d="m356.339844 296.347656-286.613282-286.613281c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503906-12.5 32.769532 0 45.25l286.613281 286.613282c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082032c12.523438-12.480468 12.523438-32.75.019532-45.25zm0 0"/><path d="m295.988281 9.734375-286.613281 286.613281c-12.5 12.5-12.5 32.769532 0 45.25l15.082031 15.082032c12.503907 12.5 32.769531 12.5 45.25 0l286.632813-286.59375c12.503906-12.5 12.503906-32.765626 0-45.246094l-15.082032-15.082032c-12.5-12.523437-32.765624-12.523437-45.269531-.023437zm0 0"/></g></svg>
    </button>
    <nuxt-link class="to-edit-page-link" :to="{name: 'note-page-id', params: { id: note.id, note: note } }">edit</nuxt-link>
    <modal-agree :method="modalFunc" v-if="modalAgree" @getAgree="getAgree" />
  </div>
</template>

<script>
  import Checkbox from "@/components/Checkbox";
  import ModalAgree from "@/components/ModalAgree";

  export default {
      components: {
          AppCheckbox: Checkbox,
          ModalAgree
      },
      props: {
          note: {
              type: Object
          }
      },
      data() {
          return {
              selectedTodos: [],
              modalFunc: null,
              modalAgree: false
          }
      },
      methods: {
          removeNote() {
              this.$store.commit('notes/removeNote', this.note.id);
          },
          getAgree(data) {
              const [method, resultAgree] = data;

              if (resultAgree) {
                  method();
              }

              this.modalAgree = false;
          },
          openModelAgree(func) {
              this.modalAgree = true;
              this.modalFunc = func;
          },
      }
  }
</script>

<style scoped lang="scss">
  .note-item {
    position: relative;
    -webkit-box-shadow: -1px 5px 22px -5px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: -1px 5px 22px -5px rgba(34, 60, 80, 0.2);
    box-shadow: -1px 5px 22px -5px rgba(34, 60, 80, 0.2);
    border-radius: 6px;
    margin-bottom: 20px;
    padding: 20px;
    h2 {
      margin-bottom: 20px;
    }
    @media (max-width: 720px) {
      margin-left: 15px;
      margin-right: 15px;
    }
  }
  .to-edit-page-link {
    position: absolute;
    right: 10px;
    bottom: 5px;
    text-decoration: none;
    color: #000000;
  }
  .todo-item-wrap {
    padding-bottom: 5px;
  }
  .remove-note-button {
    position: absolute;
    right: 10px;
    top: 10px;
    border: none;
    outline: none;
    background-color: #FFFFFF;
    cursor: pointer;
    padding: 0;
  }
</style>
