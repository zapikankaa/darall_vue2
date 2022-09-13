<template>
  <div class="position">
    <router-link to="/">Назад к списку позиций</router-link>
    <div class="group"
      v-b-tooltip.hover
      title="Нажмите, чтобы изменить"
      @click="mode = 'edit name'"
      v-if="mode !== 'edit name'">
      <h1 class="position__header">{{ position.name }}</h1>
    </div>
    <div class="group-edit"
      v-else-if="mode === 'edit name'">
      <b-form-input
        autofocus
        @blur="mode = 'show'"
        @keydown.enter="mode = 'show'"
        v-model="position.name"
        placeholder="Введите наименование позиции"></b-form-input>
    </div>

    <div class="group"
      v-b-tooltip.hover
      title="Нажмите, чтобы изменить"
      @click="mode = 'edit description'"
      v-if="mode !== 'edit description'">
      <h4>Описание</h4>
      <p>{{ position.description ? position.description : 'отсутствует' }}</p>
    </div>
    <div class="group-edit"
      v-else-if="mode === 'edit description'">
      <b-form-textarea
        rows="3"
        autofocus
        @blur="mode = 'show'"
        @keydown.enter="mode = 'show'"
        v-model="position.description"
        placeholder="Введите описание"></b-form-textarea>
    </div>
    
    <div class="group"
      v-b-tooltip.hover
      title="Нажмите, чтобы изменить"
      @click="mode = 'edit ingredients'"
      v-if="mode !== 'edit ingredients'">
      <h4>Состав</h4>
      <p>{{ position.ingredients ? position.ingredients : 'отсутствует' }}</p>
    </div>
    <div class="group-edit"
      v-else-if="mode === 'edit ingredients'">
      <b-form-textarea
        rows="3"
        autofocus
        @blur="mode = 'show'"
        @keydown.enter="mode = 'show'"
        v-model="position.ingredients"
        placeholder="Введите состав"></b-form-textarea>
    </div>

    <div @click="mode = 'edit weight'"
      v-b-tooltip.hover
      title="Нажмите, чтобы изменить"
      :class="{ group: mode !== 'edit weight', 'group-edit': mode === 'edit weight' }">
      <h4>Вес нетто:
        <strong v-if="mode !== 'edit weight'">{{ position.weight_g ? position.weight_g : '-' }}</strong>
        <b-form-input
          class="group-edit__input-number"
          type="number"
          autofocus
          v-else-if="mode === 'edit weight'"
          @blur="mode = 'show'"
          @keydown.enter="mode = 'show'"
          v-model="position.weight_g"></b-form-input> г
      </h4>
    </div>

    <div @click="mode = 'edit volume'"
      v-b-tooltip.hover
      title="Нажмите, чтобы изменить"
      :class="{ group: mode !== 'edit volume', 'group-edit': mode === 'edit volume' }">
      <h4>Объем: 
        <strong v-if="mode !== 'edit volume'">{{ position.volume_ml ? position.volume_ml : '-' }}</strong>
        <b-form-input
          class="group-edit__input-number"
          type="number"
          autofocus
          v-else-if="mode === 'edit volume'"
          @blur="mode = 'show'"
          @keydown.enter="mode = 'show'"
          v-model="position.volume_ml"></b-form-input> мл
      </h4>
    </div>

    <div @click="mode = 'edit price'"
      v-b-tooltip.hover
      title="Нажмите, чтобы изменить"
      :class="{ group: mode !== 'edit price', 'group-edit': mode === 'edit price' }">
      <h3>Цена: 
        <strong v-if="mode !== 'edit price'">{{ position.price_rub }}</strong>
        <b-form-input
          class="group-edit__input-number"
          type="number"
          autofocus
          v-else-if="mode === 'edit price'"
          @blur="mode = 'show'"
          @keydown.enter="mode = 'show'"
          v-model="position.price_rub"></b-form-input> руб
      </h3>
    </div>

    <div class="group">
      <h3>Категории</h3>
    </div>

  </div>
</template>
<script>
export default {
  name: 'Position',
  data() {
    return {
      mode: 'show' // show/edit mode
    }
  },
  props: [ 'id' ],
  created() {
    console.log(this.$store.state.positions)
    if (this.$store.state.positions.length > 0) {
      this.$store.commit({
          type: 'setCurrentPosition',
          currentPosition: this.$store.state.positions.find(position => position.id === +this.id)
        })
    } else {
      this.$store.dispatch('getPositionById', this.id)
    }
  },
  computed: {
    position() {
      return this.$store.state.currentPosition ?
        this.$store.state.currentPosition :
        { 
          name: 'Наименование позиции отсутствует',
          description: 'отсутствует',
          ingredients: 'отсутствует',
          weight_g: '-',
          volume_ml: '-',
          price_rub: '-'
        }
    }
  },
  beforeDestroy() {
    this.$store.commit({
      type: 'setCurrentPosition',
      currentPosition: null
    })
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

.group:hover {
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