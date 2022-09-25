<template>
  <div class="categories-list">
    <category-item
      class="categories-list__item"
      v-for="cat in categories"
      :key="cat.id"
      :id="cat.id"
      :name="cat.name"
      :description="cat.description"
      :tags="cat.tags"
      :selected="cat.selected"
      @selectTag="onSelectTag($event, cat)"
      @removeTag="onRemoveTag(cat.id)"
      @updateCategory="onUpdateCategory"
    ></category-item>
  </div>
</template>

<script>
import CategoryItem from './CategoryItem.vue'

export default {
  name: 'CategoriesList',
  components: {
    CategoryItem
  },
  props: {
    selectedTags: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      categories: []
    }
  },
  methods: {
    onSelectTag(e, category) {
      const tag = category.tags.find(tag => tag.id === e.id)
      this.$emit('selectTag', { tag: tag })
    },
    onRemoveTag(categoryId) {
      this.$emit('removeTag', { categoryId: categoryId })
    },
    onUpdateCategory() {
      this.updateCategories()
    },
    updateCategories() {
      this.categories = this.$store.state.categories.map(cat => {
        const selectedTag = this.selectedTags.find(tag => tag.categoryId === cat.id)
        cat.selected = selectedTag?.id
        return cat
      })
    }
  },
  beforeMount() {
    if (this.$store.state.categories.length === 0) {
      this.$store.dispatch('getCategories')
        .then(response => {
          if (response.status === 200) {
            this.updateCategories()
          }
        })
    } else this.updateCategories()
  },
  watch: {
    'selectedTags': function() {
      this.updateCategories()
    },
    '$store.state.categories': function() {
      this.updateCategories()
    }
  }
}
</script>

<style scoped>
.categories-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.categories-list__item {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>