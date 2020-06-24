import Vue from 'vue'
import VueRouter from 'vue-router'
import Manage from "@/views/Manage";
import ZBEditor from "@/views/ZBEditor";
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Manage',
        component: Manage
    },
    {
        path: '/yuqing',
        name: 'Yuqing',
        component: ZBEditor
    }
]

const router = new VueRouter({
    routes
})

export default router