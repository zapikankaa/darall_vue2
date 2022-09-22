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
      @removeTag="onRemoveTag(cat.id)">
    </category-item>
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
      
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories.map(cat => {
        const selectedTag = this.selectedTags.find(tag => tag.categoryId === cat.id)
        cat.selected = selectedTag?.id
        return cat
      })
    }
  },
  methods: {
    onSelectTag(e, category) {
      const tag = category.tags.find(tag => tag.id === e.id)
      this.$emit('selectTag', { tag: tag })
    },
    onRemoveTag(categoryId) {
      this.$emit('removeTag', { categoryId: categoryId })
    }
  },
  beforeMount() {
    if (this.$store.state.categories.length === 0) {
      this.$store.dispatch('getCategories')
    }
  }
}
</script>

<style scoped>
.categories-list__item {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>