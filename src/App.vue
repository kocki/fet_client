<template>
  <v-app>
    <v-content>
      <v-container>
        <v-layout row wrap align-start justify-center fill-height>
          <v-flex xs12 class="text-xs-center">
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

  export default {
    name: 'App',
    components: {},
    data() {
      return {
        //
      }
    }
  }
</script>
