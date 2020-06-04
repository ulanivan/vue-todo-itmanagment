export const state = () => ({
  notesList: [],
  savedNote: null
});

export const mutations = {
  addNote(state, note) {
    state.notesList.unshift({
      id: state.notesList.length,
      title: note.title,
      todos: note.todos
    });
  },
  removeNote(state, noteId) {
    state.notesList = state.notesList.filter(note => note.id !== noteId);
  },
  updateNote(state, note) {
    state.notesList = state.notesList.reduce((acc, n) => {
      return (n.id === note.id) ? acc.concat(note) : acc.concat(n);
    }, []);
  }
};

export const getters = {
  notesList: state => state.notesList,
};
