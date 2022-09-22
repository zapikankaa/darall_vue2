<template>
<div class="category">
  <b-dropdown
    :text="dropdownText"
    :variant="variant">
    <b-dropdown-item
      @click="selectTag(tag)"
      :key="tag.id"
      v-for="tag in tags"
      :title="tag.value">
      {{ tag.value }}
    </b-dropdown-item>
    <b-dropdown-item
      v-if="mode === 'edit'"
      class="category__action"
      @click="editCategory"
      title="Редактировать">
      Редактировать
    </b-dropdown-item>
    <b-dropdown-item
      v-if="mode === 'edit'"
      class="category__action"
      @click="deleteCategory"
      title="Удалить">
      Удалить
    </b-dropdown-item>
    <b-dropdown-item
      v-if="mode === 'choose'"
      class="category__action"
      @click="removeTag"
      title="Убрать тег">
      Убрать тег
    </b-dropdown-item>
  </b-dropdown>

  <b-modal
    v-model="modalEditShown"
    title="Редактирование категории">
    <b-form>
      <b-form-group
        label="Наименование*"
        label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="editData.name"
          required></b-form-input>
      </b-form-group>
      <b-form-group
        label="Описание"
        label-for="input-description">
        <b-form-input
          id="input-description"
          v-model="editData.description"></b-form-input>
      </b-form-group>
      <b-form-tags
        placeholder="Введите значения категории через запятую"
        separator=","
        v-model="tagValues">
      </b-form-tags>
    </b-form>
    <template #modal-footer="{ cancel }">
      <b-button variant="danger" @click="cancel">
        Отмена
      </b-button>
      <b-button variant="success" @click="saveEdit">
        Сохранить
      </b-button>
    </template>
  </b-modal>
</div>
</template>
<script>
export default {
  name: 'CategoryItem',
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    tags: {
      type: Array,
      required: true
    },
    selected: {
      type: Number, // tagId
      default: null
    }
  },
  inject: ['mode'],
  data() {
    return {
      // mode: this.mode,
      modalEditShown: false,
      editData: {
        name: null,
        description: null,
        tags: {
          new: [],
          deleted: []
        }
      },
      tagValues: [],
      tagsData: {},
      deleteConfirm: ''
    }
  },
  computed: {
    dropdownText() {
      if (this.selected) {
        const tag = this.tags.find(tag => tag.id === this.selected)
        return tag.value
      } else return this.name
    },
    variant() {
      return this.selected ? 'info' : 'secondary'
    }
  },
  methods: {
    selectTag(tag) {
      if (this.mode === 'choose') {
        this.$emit('selectTag', { id: tag.id })
      } 
    },
    deleteCategory() {
      this.$bvModal.msgBoxConfirm('Удалить категорию?', {
        title: 'Удаление',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Да',
        cancelTitle: 'Нет',
        hideHeaderClose: false,
        centered: true
      }).then(value => {

          if (value) {
            this.$store.dispatch('deleteCategory', this.id)
              .then(response => {
                if (response.status === 200) {
                  this.showModalOk('Категория со всеми ее тегами удалена')
                }
              }).catch(err => {
                console.log(err)
              })
          }

        }).catch(err => {
          console.log(err)
        })
    },
    showModalOk(messageText) {
      this.$bvModal.msgBoxOk(messageText)
        .then(value => {
          return value
        })
        .catch(err => {
          console.log(err)
        })
    },
    editCategory() {
      this.editData.name = this.name
      this.editData.description = this.description
      for (let tag of this.tags) {
        this.tagsData[tag.value] = tag.id
        this.tagValues.push(tag.value)
      }
      this.modalEditShown = true
    },
    saveEdit() {
      const formData = { id: this.id }

      if (this.editData.name !== this.name) formData.name = this.editData.name
      if (this.editData.description !== this.description) formData.description = this.editData.description

      for (let tag of this.tagValues) {
        if (!this.tagsData[tag]) {
          this.editData.tags.new.push({ value: tag })
        } else {
          delete this.tagsData[tag]
        }
      }

      for (let tagName in this.tagsData) {
        this.editData.tags.deleted.push({ id: this.tagsData[tagName] })
      }

      formData.tags = this.editData.tags

      this.$store.dispatch('putCategory', formData)
        .then(response => {
          if (response.status === 200) {
            this.showModalOk('Категория успешно обновлена')
            this.modalEditShown = false
          }
        }).catch(err => {
          console.log(err)
        })
    },
    removeTag() {
      this.$emit('removeTag')
    }
  },

}
</script>
<style scoped>
.category {
  display: inline-flex;
}
</style>