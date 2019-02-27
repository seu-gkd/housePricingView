<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    height: 100%;
  }

  section.app-section {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    width: calc(100% - 40px);
    width: -webkit-calc(100% - 40px);
    height: calc(100% - 40px);
    height: -webkit-calc(100% - 40px);
    overflow-y: auto;
    padding: 20px;
  }

  .sub-route {
    height: 100%;
  }

  .slide-fade-enter-active {
    transition: all .5s ease;
  }

  .slide-fade-leave-active {
    transition: all .5s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateX(200px);
    opacity: 0;
  }
</style>
