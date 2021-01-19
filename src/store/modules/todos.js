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
        .catch(() => console.log('Task is not created'))
    },
    fetchTodos({commit}) {
      try {
        db.ref('todos')
          .on('value', snapshot => {
            if(snapshot.val()) {
              let todos = []
              Object.entries(snapshot.val()).forEach(item => {
                item[1].id = item[0]
                todos.push(item[1])
              })
              commit('setTodos', todos)
            }
            else throw new Error('No data was received from the server')
          })
      } catch (error) { console.error(error) }
    },
    changeStatus(_, payload){
      db.ref('/todos/' + payload.taskId + '/status')
        .set(payload.status)
        .then(() => console.log('Status was successfully changed') )
        .catch(e => console.error(e))
    }
  },
}
