<template>
  <div class="categories">
    <router-link class="back" to="/">Назад к списку позиций</router-link>
    <h1 class="app-container__heading">Категории</h1>
    <category-item
      v-for="item in categories"
      :key="item.id"
      class="category__item"
      :id="item.id"
      :name="item.name"
      :description="item.description"
      :tags="item.tags"
      mode="edit">
    </category-item>
    <b-button class="new-button" :variant="showForm ? 'danger' : 'success'" @click="showForm = !showForm">{{ showForm ? 'Закрыть форму' : 'Новая категория' }}</b-button>
    <b-form v-if="showForm" class="new-form">
      <b-form-input
        placeholder="Название категории"
        v-model="newCategory.name"></b-form-input>
      <b-form-input
        placeholder="Описание категории"
        v-model="newCategory.description"></b-form-input>
      <b-form-tags
        placeholder="Введите значения категории через запятую"
        separator=","
        v-model="newCategory.tags"></b-form-tags>
        <b-button @click="sendNewCategory">Создать</b-button>
    </b-form>
  </div>
</template>
<script>
import CategoryItem from '../components/CategoryItem.vue'

export default {
  name: 'Categories',
  components: {
    CategoryItem
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
  computed: {
    categories() {
      return this.$store.state.categories
    }
  },
  created() {
    if (this.$store.state.categories.length === 0) {
      this.$store.dispatch('getCategories')
    }
  },
  methods: {
    async sendNewCategory() {
      await this.$store.dispatch('postNewCategory', {
        name: this.newCategory.name,
        description: this.newCategory.description,
        tags: this.newCategory.tags
      }).then((response) => {
        console.log(response.data)
        this.showModalOk()
        this.clearForm()
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
.categories__new {
  margin-bottom: 30px;
}

.new-button {
  margin-bottom: 10px;
}

.new-form {
  max-width: 600px;
}

.new-form * {
  margin-bottom: 10px;
}

.category__item {
  margin-right: 10px;
  margin-bottom: 15px;
}
</style>