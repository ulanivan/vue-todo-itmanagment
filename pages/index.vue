<template>
  <section class="container">
    <div class="content">
      <div class="header">
        <h1 class="header_title">
          Notes
        </h1>
        <button @click.prevent="showModal = !showModal" class="create-new-note-button">+</button>
      </div>
      <note-adding-form v-if="showModal" @closeModal="showModal = !showModal" />
      <h3 class="mt20px" v-if="notesList.length < 1">Add note</h3>
      <list-of-notes v-else class="list-of-notes" />
    </div>
  </section>
</template>

<script>
  import ListOfNotes from '@/components/ListOfNotes';
  import NoteAddingForm from '@/components/NoteAddingForm';

  export default {
    components: {
      ListOfNotes,
      NoteAddingForm
    },
    data() {
      return {
        showModal: false
      }
    },
    computed: {
      notesList() {
        return this.$store.getters['notes/notesList'];
      }
    }
  }
</script>

<style scoped>
  .content {
    width: 500px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .header {
    display: flex;
  }
  .container {
    min-height: 100vh;
    text-align: center;
    display: flex;
    justify-content: center;
  }

  .list-of-notes {
    margin-top: 50px;
    width: 100%;
  }

  .create-new-note-button {
    cursor: pointer;
    margin-left: 10px;
    border-radius: 6px;
    border: none;
    outline: none;
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
    transition: .5s;
  }

  .header_title {
    display: block;
    font-weight: 300;
    font-size: 32px;
    color: #35495e;
    letter-spacing: 1px;
  }
</style>

