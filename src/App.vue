<template>
  <div id="app">
    <div class="app-container">
      <router-view/>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;700&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: 'Source Sans Pro', sans-serif;
}

.app-container {
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 15px;
  background-color: whitesmoke;
}

.app-container__heading {
  font-weight: bold;
  margin-bottom: 30px;
}

.back {
  text-align: left;
  display: block;
  max-width: 600px;
  margin: 0 auto;
}

.category__action a  {
  color: #007bff;
}
</style>
