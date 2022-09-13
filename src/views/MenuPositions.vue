<template>
  <div class="positions">
    <h1 class="app-container__heading">Позиции меню</h1>
    <b-button-toolbar class="toolbar">
      <b-button-group class="toolbar__buttons">
        <b-button variant="success" @click="$router.push('/position/new')">Добавить позицию</b-button>
        <b-button variant="outline-primary" @click="$router.push('/categories')">Редактировать категории</b-button>
      </b-button-group>
    </b-button-toolbar>
    <b-container class="positions-container">
      <menu-positions-item
        :key="item.id"
        v-for="item in positions"
        :data="item">
      </menu-positions-item>
    </b-container>
  </div>
</template>

<script>
import MenuPositionsItem from '../components/MenuPositionsItem.vue'

export default {
  name: 'MenuPositions',
  components: {
    MenuPositionsItem
  },
  data() {
    return {
      
    }
  },
  computed: {
    positions() {
      return this.$store.state.positions
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
.toolbar {
  margin-bottom: 15px;
  padding: 0 15px;
  justify-content: flex-end;
}
</style>
