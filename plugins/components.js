import Vue from 'vue'
import parseBooks from '~/components/parseBooks.vue'

Object.values({
    parseBooks
}).forEach(c => Vue.component(c.name, c))