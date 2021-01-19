import firebase from 'firebase'
const db = firebase.database()

export default {
  state: { todos: [], conditions: ['Активен', 'Выполняется', 'Завершен', 'Отменен' ] },
  getters: {
    todos: state => { return state.todos },
    totalActive: state => { return state.todos.filter(task => task.status === 'Активен').length },
    task: state => id => { return state.todos.find(task => task.id === id) },
    conditions: state => { return state.conditions }
  },
  mutations: {
    setTodos: (state, payload) => { state.todos = payload }
  },
  actions: {
    postTask(_, task){
      db.ref('todos').push(task)
        .catch(() => console.log('task is not created'))
    },
    fetchTodos({commit}) {
      try {
        db.ref('todos')
          .on('value', snapshot => {
            if(snapshot.val()) commit('setTodos', Object.values(snapshot.val()))
            else throw new Error('Данные с сервера не были получены')
          })
      } catch (error) { console.error(error) }
    },
    changeStatus(_, payload){
      console.log(payload.status, payload.taskId)
      console.log('asd')
      db.ref('/todos/').orderByChild('id').equalTo(payload.taskId).set('NEWVAL')

    }
  },
}
