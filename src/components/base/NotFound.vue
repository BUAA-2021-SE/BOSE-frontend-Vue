<template>
  <div class="container">
  <v-carousel
    cycle
    height="600"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
        <h1 display="inline-block">{{slide}}</h1>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
  </div>
</template>

<script>
export default {
    name:'NotFound',
    data () {
      return {
        colors: [
          'indigo',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'Sorry',
          '404',
          'Not',
          'Found',
        ],
      }
    },
}
</script>

<style>

</style>