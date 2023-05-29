<template>
  <section class="q-my-lg w100">
    <div class="container w100">
      <h2 class="text-center">Depoimentos <q-btn v-if="is_admin" @click="add_testimony.modal = true" icon="add" round
          color="primary" /></h2>
      <div class="products flex justify-left w100 q-mt-lg">
        <TestimonyCard @openEditTestimony="openEditTestimony" @deleteTestimony="deleteTestimony" :is_admin="is_admin"
          v-for="testimony in testimonies" :key="testimony.id" :id="testimony.id" class="w33 q-mr-sm q-mb-md"
          :text="testimony.text" :name="testimony.name" />
      </div>
    </div>

    <q-dialog v-model="add_testimony.modal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section class="text-right">
          <q-btn class="q-mb-md" round color="red" @click="add_testimony.modal = false">X</q-btn>
          <q-form greedy @submit="addTestimony" class="q-gutter-md">

            <h4 class="text-center text-black">Adicionar novo depoimento</h4>
            <q-input type="textarea" filled v-model="add_testimony.text" label="Depoimento" :clearable="true" />
            <q-input filled v-model="add_testimony.name" label="Nome do autor do depoimento" :clearable="true" />

            <div>
              <q-btn label="Adicionar" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="edit_testimony.modal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section class="text-right">
          <q-btn class="q-mb-md" round color="red" @click="edit_testimony.modal = false">X</q-btn>
          <q-form greedy @submit="editTestimony" class="q-gutter-md">

            <h4 class="text-center text-black">Adicionar novo depoimento</h4>
            <q-input type="textarea" filled v-model="edit_testimony.text" label="Depoimento" :clearable="true" />
            <q-input filled v-model="edit_testimony.name" label="Nome do autor do depoimento" :clearable="true" />

            <div>
              <q-btn label="Editar" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

  </section>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue'
import { useTestimoniesStore } from 'stores/testimoniesStore.js'
import TestimonyCard from '@components/Utils/TestimonyCard.vue'

const testimonies_store = useTestimoniesStore()
const testimonies = ref([])

const add_testimony = ref({
  modal: false,
  text: '',
  name: '',
})

const edit_testimony = ref({
  modal: false,
  text: '',
  name: '',
  testimony_id: -1,
})

const props = defineProps({
  is_admin: {
    type: Boolean,
    default: false
  }
})

onMounted(async () => {
  const fetched_testimonies = await testimonies_store.getTestimonies()

  testimonies.value = fetched_testimonies
})

async function addTestimony() {
  await testimonies_store.addTestimony(add_testimony.value.text, add_testimony.value.name)
  const fetched_testimonies = await testimonies_store.getTestimonies()

  testimonies.value = fetched_testimonies
}

async function openEditTestimony(testimony_id, text, author) {
  edit_testimony.value.modal = true
  edit_testimony.value.testimony_id = testimony_id
  edit_testimony.value.text = text
  edit_testimony.value.name = author
}

async function editTestimony() {
  await testimonies_store.editTestimony(edit_testimony.value.testimony_id, edit_testimony.value.text, edit_testimony.value.name)
  const fetched_testimonies = await testimonies_store.getTestimonies()

  testimonies.value = fetched_testimonies
}

async function deleteTestimony(testimony_id) {
  await testimonies_store.deleteTestimony(testimony_id)
  const fetched_testimonies = await testimonies_store.getTestimonies()

  testimonies.value = fetched_testimonies
}

</script>

<style></style>
