import { createRouter, createWebHistory } from 'vue-router'
import Tasks from "../views/Tasks";
import New from '../views/New';
import Task from '../views/Task'

const routes = [
  {
    path: '/',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/new-task',
    name: 'new task',
    component: New,
  },
  {
    path: '/task/:id',
    name: 'task',
    component: Task,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active'
})

export default router
