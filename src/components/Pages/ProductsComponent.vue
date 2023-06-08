<template>
  <section class="q-my-lg w100">
    <div class="container w100">
      <h2 class="text-center">{{ product_label }} <q-btn v-if="is_admin" @click="add_product.modal = true" icon="add"
          round color="primary" />
      </h2>
      <div class="products flex justify-between w100 q-mt-lg">
        <CtaCarousel @editProduct="editProduct" @deleteProduct="deleteProduct" :is_admin="is_admin" :ctas="ctas" />
      </div>
    </div>

    <q-dialog v-model="add_product.modal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section class="text-right">
          <q-btn class="q-mb-md" round color="red" @click="add_product.modal = false">X</q-btn>
          <q-form greedy @submit="addProduct" class="q-gutter-md">

            <h4 class="text-center text-black">Criar novo produto</h4>
            <q-input filled v-model="add_product.name" label="Nome do produto" :clearable="true" />
            <q-input filled v-model="add_product.description" label="Descrição do produto" :clearable="true" />
            <q-input filled v-model="add_product.purchase_link" label="Link de compra do produto" :clearable="true" />
            <q-file accept=".jpg, .png, .webp, .jpeg, image/*" v-model="add_product.image" label="Imagem do produto"
              filled :clearable="true" :filter="checkFile" @rejected="onRejected">
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>

            <div>
              <q-btn label="Criar" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="edit_product.modal">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section class="text-right">
          <q-btn class="q-mb-md" round color="red" @click="edit_product.modal = false">X</q-btn>
          <q-form greedy @submit="onEditProduct" class="q-gutter-md">

            <h4 class="text-center text-black">Editar produto</h4>
            <q-input filled v-model="edit_product.name" label="Nome do produto" :clearable="true" />
            <q-input filled v-model="edit_product.description" label="Descrição do produto" :clearable="true" />
            <q-input filled v-model="edit_product.purchase_link" label="Link de compra do produto" :clearable="true" />
            <q-file accept=".jpg, .png, .webp, .jpeg, image/*" v-model="edit_product.image" label="Imagem do produto"
              filled :clearable="true" :filter="checkFile" @rejected="onRejected">
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>

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
import { ref, onMounted, defineProps } from 'vue'
import CtaCarousel from '@components/Utils/CtaCarousel.vue'
import { useProductsStore } from 'stores/productsStore.js'
import { useConfigsStore } from 'stores/configsStore.js'
import { storeToRefs } from 'pinia'

const props = defineProps({
  is_admin: Boolean,
})

const config_store = useConfigsStore()
const { product_label } = storeToRefs(config_store)
const products_store = useProductsStore()
const ctas = ref([])
const add_product = ref({
  modal: false,
  name: '',
  description: '',
  image: null,
  purchase_link: '',
})

const edit_product = ref({
  modal: false,
  name: '',
  description: '',
  image: null,
  purchase_link: '',
  product_id: -1,
})



onMounted(async () => {
  const products = await products_store.getProducts()
  ctas.value = products
})

async function addProduct() {
  const formData = new FormData()

  formData.append('name', add_product.value.name)
  formData.append('description', add_product.value.description)
  formData.append('purchase_link', add_product.value.purchase_link)
  formData.append('image', add_product.value.image)

  const created = await products_store.addProduct(formData)
  if (!created) return;

  const products = await products_store.getProducts()
  ctas.value = products
  add_product.value = {
    modal: true,
    name: '',
    description: '',
    image: null,
    purchase_link: '',
  }
}

function checkFile(files) {
  const allow_types = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/webp',
  ]
  return files.filter(file => file.size < 1024 * 1000 && (allow_types.includes(file.type)))
}

function onRejected(rejectedEntries) {

  Notify.create({
    type: 'negative',
    message: `Arquivo inválido! Verifique se o arquivo não ultrapassa o tamanho máximo (1 mb) e se ele é um formato válido de imagem`
  })
}

function editProduct(product_id) {
  edit_product.value.product_id = product_id
  edit_product.value.modal = true
}

async function onEditProduct() {
  const formData = new FormData()

  formData.append('name', edit_product.value.name)
  formData.append('description', edit_product.value.description)
  formData.append('purchase_link', edit_product.value.purchase_link)
  formData.append('image', edit_product.value.image)

  const created = await products_store.editProduct(formData, edit_product.value.product_id)
  if (!created) return

  const products = await products_store.getProducts()
  ctas.value = products
  edit_product.value = {
    modal: true,
    name: '',
    description: '',
    image: null,
    purchase_link: '',
    product_id: -1,
  }
}

async function deleteProduct(product_id) {
  const deleted = await products_store.deleteProduct(product_id)
  if (!deleted) return

  const products = await products_store.getProducts()
  ctas.value = products
}

</script>

<style lang="scss" scoped>
.buttons {
  justify-content: right;

  button {
    margin: 0;
    margin-right: 16px;
    width: 48px;
    height: 48px;
  }
}
</style>
