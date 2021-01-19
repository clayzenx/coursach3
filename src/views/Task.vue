<template>
  <div class="card" v-if="task">
    <h2>{{ task.title }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.status" /></p>
    <p><strong>Дэдлайн</strong>: {{ task.deadLineDate }}</p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <button
          class="btn"
          v-if="task.status === 'Активен'"
          @click="changeStatus('Выполняется')">
        Взять в работу
      </button>
      <button
          class="btn primary"
          v-if="task.status === 'Выполняется'"
          @click="changeStatus('Завершен')">
        Завершить
      </button>
      <button
          class="btn danger"
          v-if="task.status === 'Выполняется'"
          @click="changeStatus('Отменен')">
        Отменить
      </button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ route.params.id }}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from '../components/AppStatus'
import { computed } from 'vue'
import { useRoute } from "vue-router";
import { useStore } from 'vuex'

export default {
  components: {AppStatus},
  setup(){
    const route = useRoute()
    const store = useStore()

    const taskId = route.params.id

    const task = computed(() => store.getters.task(taskId))

    const changeStatus = status => {
      store.dispatch('changeStatus', { taskId, status })
    }

    return {
      task, route, changeStatus
    }
  }
}
</script>

<style scoped>

</style>