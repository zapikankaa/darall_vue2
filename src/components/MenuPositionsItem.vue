<template>
  <b-row
    class="item"
    @click="$router.push({ name: 'Position', params: { id: data.id } })"
    v-b-tooltip.hover
    title="Нажмите, чтобы просмотреть подробности">
    <b-col class="item__name">{{ data.name }}</b-col>
    <b-col class="item__price" lg="2">{{ data.price_rub }} руб</b-col>
  </b-row>
</template>
<script>
export default {
  name: 'MenuPositionsItem',
  props: {
    data: Object
  }
}
</script>
<style scoped>
.item {
  font-size: 23px;
  margin-bottom: 3px;
  cursor: pointer;
}

.item:hover {
  background-color: gainsboro;
}

.item__name {
  text-align: left;
}

.item__price {
  font-weight: bold;
}
</style>