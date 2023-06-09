<template>
  <section class="q-my-md w100" v-if="faqs.length > 0">
    <div class="container text-center">
      <h2 class="q-mb-md">Dúvidas Frequentes (F.A.Q) <q-btn v-if="is_admin" @click="add_faq.modal = true" icon="add" round
          color="primary" /></h2>
      <div v-for="(faq, index) in faqs" :key="index" class="q-pa-md" style="max-width: 800px; margin: 0 auto;">
        <q-expansion-item class="w100 shadow-1 overflow-hidden" style="border-radius: 15px 2px 15px 0" icon="help"
          :label="faq.question" header-class="bg-primary text-white" expand-icon-class="text-white">
          <q-card>
            <q-card-section>
              {{ faq.answer }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
    </div>

    <q-dialog v-model="add_faq.modal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section class="text-right">
          <q-btn class="q-mb-md" round color="red" @click="add_faq.modal = false">X</q-btn>
          <q-form greedy @submit="addFaq" class="q-gutter-md">

            <h4 class="text-center text-black">Adicionar nova pergunta</h4>
            <q-input filled v-model="add_faq.question" label="Pergunta" :clearable="true" />
            <q-input filled v-model="add_faq.answer" label="Resposta" :clearable="true" />

            <div>
              <q-btn label="Adicionar" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useFaqStore } from 'stores/faqStore'

const props = defineProps({
  is_admin: Boolean,
  question: String,
  answer: String,
})

const faq_store = useFaqStore()
const faqs = ref({})

const add_faq = ref({
  modal: false,
  question: '',
  answer: '',
})

onMounted(async () => {
  await getFaqs()
})

async function getFaqs() {
  faqs.value = await faq_store.getFaqs()
}

async function addFaq() {
  await faq_store.addNewFaq(add_faq.value.question, add_faq.value.answer)
  await getFaqs()
}

</script>

<style scoped lang="scss"></style>
