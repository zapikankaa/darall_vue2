<template>
  <div class="position">
    <router-link to="/">К списку позиций</router-link>
    <b-button variant="danger" @click="deletePosition">Удалить</b-button>
    <div class="group"
      v-b-tooltip.hover
      title="Нажмите, чтобы изменить"
      @click="mode = 'edit name'"
      v-if="mode !== 'edit name'">
      <h1 class="position__header">{{ name }}</h1>
    </div>
    <div class="group-edit"
      v-else-if="mode === 'edit name'">
      <b-form-input
        autofocus
        @blur="mode = 'show'"
        @keydown.enter="mode = 'show'"
        v-model="name"
        placeholder="Введите наименование позиции"></b-form-input>
    </div>

    <div class="group"
      v-b-tooltip.hover
      title="Нажмите, чтобы изменить"
      @click="mode = 'edit description'"
      v-if="mode !== 'edit description'">
      <h4>Описание</h4>
      <p>{{ description ? description : 'отсутствует' }}</p>
    </div>
    <div class="group-edit"
      v-else-if="mode === 'edit description'">
      <b-form-textarea
        rows="3"
        autofocus
        @blur="mode = 'show'"
        @keydown.enter="mode = 'show'"
        v-model="description"
        placeholder="Введите описание"></b-form-textarea>
    </div>
    
    <div class="group"
      v-b-tooltip.hover
      title="Нажмите, чтобы изменить"
      @click="mode = 'edit ingredients'"
      v-if="mode !== 'edit ingredients'">
      <h4>Состав</h4>
      <p>{{ ingredients ? ingredients : 'отсутствует' }}</p>
    </div>
    <div class="group-edit"
      v-else-if="mode === 'edit ingredients'">
      <b-form-textarea
        rows="3"
        autofocus
        @blur="mode = 'show'"
        @keydown.enter="mode = 'show'"
        v-model="ingredients"
        placeholder="Введите состав"></b-form-textarea>
    </div>

    <div @click="mode = 'edit weight'"
      v-b-tooltip.hover
      title="Нажмите, чтобы изменить"
      :class="{ group: mode !== 'edit weight', 'group-edit': mode === 'edit weight' }">
      <h4>Вес нетто:
        <strong v-if="mode !== 'edit weight'">{{ weight_g ? weight_g : '-' }}</strong>
        <b-form-input
          class="group-edit__input-number"
          type="number"
          autofocus
          v-else-if="mode === 'edit weight'"
          @blur="mode = 'show'"
          @keydown.enter="mode = 'show'"
          v-model="weight_g"></b-form-input> г
      </h4>
    </div>

    <div @click="mode = 'edit volume'"
      v-b-tooltip.hover
      title="Нажмите, чтобы изменить"
      :class="{ group: mode !== 'edit volume', 'group-edit': mode === 'edit volume' }">
      <h4>Объем: 
        <strong v-if="mode !== 'edit volume'">{{ volume_ml ? volume_ml : '-' }}</strong>
        <b-form-input
          class="group-edit__input-number"
          type="number"
          autofocus
          v-else-if="mode === 'edit volume'"
          @blur="mode = 'show'"
          @keydown.enter="mode = 'show'"
          v-model="volume_ml"></b-form-input> мл
      </h4>
    </div>

    <div @click="mode = 'edit price'"
      v-b-tooltip.hover
      title="Нажмите, чтобы изменить"
      :class="{ group: mode !== 'edit price', 'group-edit': mode === 'edit price' }">
      <h3>Цена: 
        <strong v-if="mode !== 'edit price'">{{ price_rub }}</strong>
        <b-form-input
          class="group-edit__input-number"
          type="number"
          autofocus
          v-else-if="mode === 'edit price'"
          @blur="mode = 'show'"
          @keydown.enter="mode = 'show'"
          v-model="price_rub"></b-form-input> руб
      </h3>
    </div>

    <div class="group">
      <h3>Категории</h3>
      <categories-list
        :selectedTags="tags"
        @selectTag="onSelectTag($event)"
        @removeTag="onRemoveTag($event)">
      </categories-list>
    </div>

  </div>
</template>
<script>
import CategoriesList from '../components/CategoriesList.vue'

export default {
  name: 'Position',
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
      mode: 'show', // show/edit mode
      name: 'Наименование позиции отсутствует',
      description: 'отсутствует',
      ingredients: 'отсутствует',
      weight_g: '-',
      volume_ml: '-',
      price_rub: '-',
      tags: []
    }
  },

  props: [ 'id' ],

  beforeMount() {
    if (this.$store.state.positions.length > 0) {
      this.$store.commit({
          type: 'setCurrentPosition',
          currentPosition: this.$store.state.positions.find(position => position.id === +this.id)
        })
      this.getPositionData()
    } else {
      this.$store.dispatch('getPositionById', this.id)
        .then(() => this.getPositionData())
    }
  },
  beforeDestroy() {
    this.$store.commit({
      type: 'setCurrentPosition',
      currentPosition: null
    })
  },
  methods: {
    getPositionData() {
      const data = this.$store.state.currentPosition

      this.name = data.name
      this.description = data.description
      this.ingredients = data.ingredients
      this.weight_g = data.weight_g
      this.volume_ml = data.volume_ml
      this.price_rub = data.price_rub
      this.tags = data.tags
    },
    deletePosition() {
      this.$bvModal.msgBoxConfirm('Удалить позицию?', {
        title: 'Удаление',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Да',
        cancelTitle: 'Нет',
        hideHeaderClose: false,
        centered: true
      }).then(value => {
        if (value) this.$store.dispatch('deletePosition', this.id)
          .then(res => {
            if (res.status === 200) {
              this.$bvModal.msgBoxOk('Позиция удалена! Возвращаемся к списку...')
              setTimeout(() => {
                this.$router.push('/')
              }, 2000)
            } else {
              // показать что что-то пошло не так
            }
          })
      })
    },
    onSelectTag(e) {
      const tagsData = {
        added: { id: e.tag.id }
      }
      // проверяем и, при необходимости, удаляем выбранный ранее тег той же категории
      const removingTag = this.tags.find(tag => tag.categoryId === e.tag.categoryId)
      if (removingTag) tagsData.removed = { id: removingTag.id }

      this.sendUpdate({
        id: this.id,
        tags: tagsData
      })    
    },
    onRemoveTag(e) {
      const removingTag = this.tags.find(tag => tag.categoryId === e.categoryId)

      const tagsData = {
        removed: { id: removingTag.id }
      }

      this.sendUpdate({
        id: this.id,
        tags: tagsData
      })
    },
    sendUpdate(data) {
      this.$store.dispatch('putPosition', data)
        .then(response => {
          if (response.status === 200)
            this.getPositionData()
        })
    }
  },
  watch: {
    mode: function(newVal, oldVal) {
      if (newVal !== 'show') return

      const formData = {
        id: this.id,
        name: null,
        description: null,
        ingredients: null,
        weight_g: null,
        volume_ml: null,
        price_rub: null
      }

      switch(oldVal) {
        case 'edit name':
          formData.name = this.name
          break
        case 'edit description':
          formData.description = this.description
          break
        case 'edit ingredients':
          formData.ingredients = this.ingredients
          break
        case 'edit weight':
          formData.weight_g = this.weight_g
          break
        case 'edit volume':
          formData.volume_ml = this.volume_ml
          break
        case 'edit price':
          formData.price_rub = this.price_rub
          break
      }

      this.sendUpdate(formData)
    }
  }
}
</script>
<style scoped>
p, h4 {
  margin-bottom: 0;
}

.position {
  text-align: left;
  max-width: 600px;
  margin: 0 auto;
}

.position__header {
  font-size: 32px;
  font-weight: bold;
}

.group {
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 10px 15px;
}

.group:not(:last-child):hover {
  border-color: lightslategray;
  background-color: lightgray;
}

.group-edit {
  padding: 15px 15px;
}

.group-edit__input-number {
  display: inline;
  width: 100px;
}

</style>