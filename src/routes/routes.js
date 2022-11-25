import MainComponent from '@/components/MainComponent.vue';
import CurrencyConverter from '@/components/CurrencyConverter.vue';

import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: MainComponent
    },
    {
        path: '/converter',
        component: CurrencyConverter
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;