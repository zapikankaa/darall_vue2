<template>
  <div class="positions">
    <h1 class="app-container__heading">Позиции меню</h1>
    <b-button-toolbar class="toolbar">
      <div class="toolbar__filters">
        <h3>Фильтры</h3>
        <b-button v-if="filters.length > 0" variant="danger" @click="clearFilters">Сбросить</b-button>
      </div>
      <b-button-group class="toolbar__buttons">
        <b-button variant="success" @click="$router.push('/position/new')">Добавить позицию</b-button>
        <b-button variant="outline-primary" @click="$router.push('/categories')">Редактировать категории</b-button>
      </b-button-group>
    </b-button-toolbar>
    <div class="filters">
      <categories-list
        :selectedTags="filters"
        @selectTag="onSelectTag($event)"
        @removeTag="onRemoveTag($event)"
      ></categories-list>
    </div>
    <b-container class="positions-container">
      <menu-positions-item
        :key="item.id"
        v-for="item in filteredPositions"
        :data="item">
      </menu-positions-item>
    </b-container>
  </div>
</template>

<script>
import MenuPositionsItem from '../components/MenuPositionsItem.vue'
import CategoriesList from '../components/CategoriesList.vue'

export default {
  name: 'MenuPositions',
  components: {
    MenuPositionsItem,
    CategoriesList
  },
  provide() {
    return {
      mode: 'choose'
    }
  },
  data() {
    return {
      filters: []
    }
  },
  computed: {
    filteredPositions() {
      if (this.filters.length > 0)
      return this.$store.getters.filteredPositions(this.filters)
      else return this.$store.state.positions
    }
  },
  methods: {
    onSelectTag(e) {
      // проверяем и, при необходимости, удаляем выбранный ранее тег той же категории
      const rmTagIndex = this.filters.findIndex(tag => tag.categoryId === e.tag.categoryId)
      if (rmTagIndex >= 0) this.filters.splice(rmTagIndex, 1, e.tag)
      // либо просто добавляем тег в список
      else this.filters.push(e.tag)
    },
    onRemoveTag(e) {
      const rmTagIndex = this.filters.findIndex(tag => tag.categoryId === e.categoryId)
      this.filters.splice(rmTagIndex, 1)
    },
    clearFilters() {
      this.filters = []
    }
  },
  created() {
    if (this.$store.state.positions.length === 0) {
      this.$store.dispatch('getPositions')
    }
  }
}
</script>

<style scoped>
.positions {
  padding-bottom: 150px;
}

.toolbar {
  margin-bottom: 10px;
  padding: 0 15px;
  justify-content: space-between;
}

.toolbar__filters {
  display: flex;
}

.toolbar__filters h3 {
  margin-bottom: 0;
  margin-right: 10px;
}

.filters {
  margin-bottom: 30px;
  padding: 0 15px;
}
</style>
