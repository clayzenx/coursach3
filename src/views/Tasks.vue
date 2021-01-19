<template>
  <h1 class="text-white center" v-if="$store.getters.todos.length === 0">
    Задач пока нет!
  </h1>
  <div class="task-list" v-else>
    <h3 class="text-white">
      Всего активных задач: {{ $store.getters.totalActive }}
    </h3>
    <task-item
        v-for="task in $store.getters.todos"
        :key="task.id"
        :task-data="task"/>
  </div>
  <p>{{ $store.getters.todos }}</p>

</template>

<script>
import TaskItem from "../components/TaskItem";


export default {
  components: {TaskItem},
}
</script>
