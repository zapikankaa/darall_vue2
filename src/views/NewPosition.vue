<template>
  <div class="new-position">
    <router-link class="back" to="/">К списку позиций</router-link>
    <h1 class="app-container__heading">Новая позиция</h1>
    <b-form @submit="sendNewPosition" @reset="resetForm" class="new-position__form">
      <b-form-group
        label="Наименование*"
        label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="formData.name"
          required></b-form-input>
      </b-form-group>

      <b-form-group
        label="Описание"
        label-for="input-description">
        <b-form-textarea
          rows="3"
          id="input-description"
          v-model="formData.description"></b-form-textarea>
      </b-form-group>

      <b-form-group
        label="Состав"
        label-for="input-ingredients">
        <b-form-textarea
          rows="3"
          id="input-ingredients"
          v-model="formData.ingredients"></b-form-textarea>
      </b-form-group>

      <b-form-group
        label="Масса нетто"
        label-for="input-weight"
        description="Единица измерения - г">
        <b-form-input
          type="number"
          id="input-weight"
          v-model="formData.weight_g"></b-form-input>
      </b-form-group>

      <b-form-group
        label="Объем"
        label-for="input-volume"
        description="Единица измерения - мл">
        <b-form-input
          type="number"
          id="input-volume"
          v-model="formData.volume_ml"></b-form-input>
      </b-form-group>

      <b-form-group
        label="Цена*"
        label-for="input-price"
        description="Единица измерения - руб">
        <b-form-input
          type="number"
          id="input-price"
          v-model="formData.price_rub"
          required></b-form-input>
      </b-form-group>

      <b-form-group
        label="Категории"
        label-for="input-tags">
        <!-- <category-item
          v-for="cat in categories"
          :key="cat.id"
          class="category"
          :id="cat.id"
          :name="cat.name"
          :description="cat.description"
          :tags="cat.tags"
          mode="choose"
          :selected="cat.selected"
          @selectTag="onSelectTag($event, cat)">
        </category-item> -->
        <b-button
          v-if="formData.tags.length > 0"
          @click="clearTags"
          variant="danger">
          Очистить категории</b-button>
      </b-form-group>

      <div class="success" :class="{ shown: dataSent }">Позиция добавлена!</div>

      <b-button class="form-button" type="submit" variant="success">Добавить позицию</b-button>
      <b-button class="form-button" type="reset" variant="danger">Очистить форму</b-button>
    </b-form>
  </div>
</template>
<script>
// import CategoryItem from '../components/CategoryItem.vue'

export default {
  name: 'NewPosition',
  components: {
    // CategoryItem
  },
  data() {
    return {
      formData: {
        name: '',
        description: '',
        ingredients: '',
        weight_g: '',
        volume_ml: '',
        price_rub: '',
        tags: []
      },
      categories: [],
      dataSent: false
    }
  },
  methods: {
    onSelectTag(e, category) {
      this.formData.tags.push({ id: e.id })
      category.selected = e.id
    },
    clearTags() {
      this.formData.tags = []
      this.categories = this.categories.map(cat => {
        cat.selected = null
        return cat
      })
    },
    resetForm() {
      this.formData.name = ''
      this.formData.description = ''
      this.formData.ingredients = ''
      this.formData.weight_g = ''
      this.formData.volume_ml = ''
      this.formData.price_rub = ''
      this.clearTags()
    },
    sendNewPosition(e) {
      e.preventDefault()
      this.$store.dispatch('postNewPosition', {
        name: this.formData.name,
        description: this.formData.description,
        ingredients: this.formData.ingredients,
        weight_g: this.formData.weight_g,
        volume_ml: this.formData.volume_ml,
        price_rub: this.formData.price_rub,
        tags: this.formData.tags
      }).then((response) => {
        if (response.status === 200) {
          this.resetForm()
          this.dataSent = true
          setTimeout(() => { this.dataSent = false }, 2000)
        }
      })

    }
  },
  beforeMount() {
    if (this.$store.state.categories.length > 0) {
      this.categories = this.$store.state.categories
    } else {
      this.$store.dispatch('getCategories')
        .then(() => this.categories = this.$store.state.categories)
    }

    this.categories = this.categories.map(cat => {
      cat.selected = null
      return cat
    })
  }
}
</script>
<style scoped>

.new-position {
  padding-bottom: 60px;
}

.new-position__form {
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
}

.form-button {
  margin-right: 15px;
}

.warning {
  border-color: red;
}

.warning-text {
  color: red;
  display: none;
}

.warning-text.shown {
  display: block;
}

.success {
  margin-bottom: 10px;
  opacity: 0;
  text-align: center;
  background-color: yellow;
  padding: 5px;
  width: 180px;
  border-radius: 10px;
}

.success.shown {
  opacity: 1;
}

.category {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>