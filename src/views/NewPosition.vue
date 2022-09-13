<template>
  <div class="new-position">
    <router-link class="back" to="/">Назад к списку позиций</router-link>
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
        <b-form-tags
          tag-pills
          tag-variant="success"
          id="input-tags"
          v-model="formData.tags"></b-form-tags>
      </b-form-group>

      <div class="success" :class="{ shown: dataSent }">Позиция добавлена!</div>

      <b-button class="form-button" type="submit" variant="success">Добавить позицию</b-button>
      <b-button class="form-button" type="reset" variant="danger">Очистить форму</b-button>
    </b-form>
  </div>
</template>
<script>
export default {
  name: 'NewPosition',
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
      dataSent: false
    }
  },
  methods: {
    resetForm() {
      this.formData.name = '',
      this.formData.description = '',
      this.formData.ingredients = '',
      this.formData.weight_g = '',
      this.formData.volume_ml = '',
      this.formData.price_rub = '',
      this.formData.tags = []
    },
    async sendNewPosition(e) {
      e.preventDefault()
      await this.$store.dispatch('postNewPosition', {
        name: this.formData.name,
        description: this.formData.description,
        ingredients: this.formData.ingredients,
        weight_g: this.formData.weight_g,
        volume_ml: this.formData.volume_ml,
        price_rub: this.formData.price_rub,
        tags: this.formData.tags
      }).then((response) => {
        this.$store.commit({
          type: 'pushToPositions',
          position: response.data
        })
        this.resetForm()
        this.dataSent = true
        setTimeout(() => { this.dataSent = false }, 2000)
      })

    }
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
</style>