<template>
  <div>
    <note-item :note="note"
               v-for="note in notesList"
               :key="note.id"
    />
  </div>
</template>

<script>
  import NoteItem from '@/components/NoteItem';

  export default {
      components: {
          NoteItem
      },
      computed: {
          notesList() {
              try {
                  return this.$store.getters['notes/notesList'];
              } catch (e) {
                  console.log(error(e));
              }
          }
      }
  }
</script>
