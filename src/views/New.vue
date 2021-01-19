<template>
  <form class="card" @submit.prevent="createTask">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input v-model="task.title" type="text" id="title">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input v-model="task.deadLineDate" type="date" id="date">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea v-model="task.description" id="description"></textarea>
    </div>

    <button class="btn primary" :disabled="!isValid">Создать</button>
  </form>
</template>


<script>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup(){
    const store = useStore()
    const router = useRouter()

    const task = reactive({
      status: 'Активен',
      id: Date.now().toString(),
      title: '',
      deadLineDate: '',
      description: '',
    })

    const isExpired = () => {
      let today = new Date(Date.now())
      let deadLine = new Date(task.deadLineDate)
      return deadLine < today
    }

    const isValid = computed(() => {
      let valid = true
      Object.values(task).forEach(field => field === ''? valid = false: null)
      return valid
    })

    const createTask = () => {
      if(isValid.value){
        if(isExpired()) task.status = 'Отменен'
        store.dispatch('postTask', task)
        router.push('/')
      }
    }

    return {
      task,
      isValid,
      createTask,
      store
    }
  }
}

</script>