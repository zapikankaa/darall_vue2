<template>
  <div class="categories">
    <router-link class="back" to="/">Назад к списку позиций</router-link>
    <h1 class="app-container__heading">Категории</h1>
    <categories-list
      class="categories__list">
    </categories-list>
    <div class="categories__new">
      <b-button class="new-button" :variant="showForm ? 'danger' : 'success'" @click="showForm = !showForm">{{ showForm ? 'Закрыть форму' : 'Новая категория' }}</b-button>
      <b-form v-if="showForm" @submit.prevent="sendNewCategory" class="new-form">
        <b-form-input
          placeholder="Название категории"
          v-model="newCategory.name"
          required></b-form-input>
        <b-form-input
          placeholder="Описание категории"
          v-model="newCategory.description"></b-form-input>
        <b-form-tags
          placeholder="Введите значения категории через запятую"
          separator=","
          :input-attrs="{ 'aria-describedby': 'tags-validation-help' }"
          v-model="newCategory.tags">
        </b-form-tags>
        <p>Минимум 2 тега (значения)</p>
        
        <b-button variant="success" type="submit">Создать</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
import CategoriesList from '../components/CategoriesList.vue'

export default {
  name: 'Categories',
  components: {
    CategoriesList
  },
  provide() {
    return {
      mode: 'edit'
    }
  },
  data() {
    return {
      showForm: false,
      newCategory: {
        name: '',
        description: null,
        tags: []
      }
    }
  },
  methods: {
    sendNewCategory() {
      if (this.newCategory.tags.length >= 2) 
        this.$store.dispatch('postNewCategory', {
          name: this.newCategory.name,
          description: this.newCategory.description,
          tags: this.newCategory.tags
        }).then(response => {
          if (response.status === 200) {
            this.showModalOk()
            this.clearForm()
          }
        })
    },
    clearForm() {
      this.newCategory.name = ''
      this.newCategory.description = ''
      this.newCategory.tags = []
    },
    showModalOk() {
      this.$bvModal.msgBoxOk('Категория успешно сохранена')
        .then(value => {
          return value
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>
.categories__list {
  margin-bottom: 30px;
}

.categories__new {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.new-button {
  margin-bottom: 10px;
}

.new-form {
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.new-form *:not(:nth-child(3)) {
  margin-bottom: 10px;
}

</style>