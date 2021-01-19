<template >
  <div class="card">
    <h2 class="card-title">
      {{ taskData.title }}
      <app-status :type="taskData.status"/>
    </h2>
    <p><strong><small>{{ taskData.deadLineDate }}</small></strong></p>
    <button class="btn primary" @click="openTask">Посмотреть</button>
  </div>
</template>

<script>
import AppStatus from "./AppStatus";
import { useRouter } from 'vue-router'

export default {
  components: {AppStatus},
  props: {
    taskData: {
      type: Object,
      default: null,
      required: true,
    },
  },
  setup(props){
    const router = useRouter()

    const openTask = () => {
      router.push('/task/' + props.taskData.id)
    }

    return{
      openTask
    }
  }
}
</script>

<style scoped>

</style>