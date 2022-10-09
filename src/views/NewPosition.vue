<template>
  <div class="new-position">
    <router-link class="back" to="/">К списку позиций</router-link>
    <h1 class="app-container__heading">Новая позиция</h1>
    <b-form @submit="onSubmit" @reset="resetForm" class="new-position__form">
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
        label="Фото"
        label-for="input-picture">
        <b-form-file
          id="input-picture"
          v-model="formData.picture"
          accept=".jpeg,.jpg,.png"
          placeholder="Выберите файл или перетащите его в эту зону"
          plain></b-form-file>
          <b-button
            class="delete-picture"
            v-if="formData.picture"
            @click="formData.picture = null"
            variant="danger">
            Удалить выбранный файл
          </b-button>
      </b-form-group>

      <b-form-group
        label="Категории"
        label-for="input-tags">
        <categories-list
          :selectedTags="formData.tags"
          @selectTag="onSelectTag($event)"
          @removeTag="onRemoveTag($event)">
        </categories-list>
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
import CategoriesList from '../components/CategoriesList.vue'

export default {
  name: 'NewPosition',
  components: {
    CategoriesList
  },
  provide() {
    return {
      mode: 'choose'
    }
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
        picture: null,
        tags: []
      },
      dataSent: false
    }
  },
  methods: {
    onSelectTag(e) {
      // проверяем и, при необходимости, удаляем выбранный ранее тег той же категории
      const rmTagIndex = this.formData.tags.findIndex(tag => tag.categoryId === e.tag.categoryId)
      if (rmTagIndex >= 0) this.formData.tags.splice(rmTagIndex, 1, e.tag)
      // либо просто добавляем тег в список
      else this.formData.tags.push(e.tag)
    },
    onRemoveTag(e) {
      const rmTagIndex = this.formData.tags.findIndex(tag => tag.categoryId === e.categoryId)
      this.formData.tags.splice(rmTagIndex, 1)
    },
    clearTags() {
      this.formData.tags = []
    },
    resetForm() {
      this.formData.name = ''
      this.formData.description = ''
      this.formData.ingredients = ''
      this.formData.weight_g = ''
      this.formData.volume_ml = ''
      this.formData.price_rub = ''
      this.formData.picture = null
      this.clearTags()
    },
    onSubmit(e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', this.formData.name)
      formData.append('description', this.formData.description)
      formData.append('ingredients', this.formData.ingredients)
      formData.append('weight_g', this.formData.weight_g)
      formData.append('volume_ml', this.formData.volume_ml)
      formData.append('price_rub', this.formData.price_rub)
      formData.append('tags',
        JSON.stringify( this.formData.tags.map(tag => { return { id: tag.id } })) )
      if (this.formData.picture) formData.append('picture', this.formData.picture)
      else formData.append('picture', null)

      this.sendNewPosition(formData)
    },
    sendNewPosition(formData) {
      this.$store.dispatch('postNewPosition', formData).then((response) => {
        if (response.status === 200) {
          this.dataSent = true
          setTimeout(() => { this.dataSent = false }, 2000)
          this.resetForm()
        }
      })

    }
  }
}
</script>
<style scoped>

.new-position {
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 60px;
}

.new-position__form {
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

.delete-picture {
  margin-top: 10px;
}
</style>