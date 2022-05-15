<template>
    <v-card
    class="mx-auto"
    max-width="344"
    outlined
    v-show="sharedState.is_hover&&sharedState.is_authenticated"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">OVERLINE</div>
        <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn text>Button</v-btn>
      <v-btn text>Button</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import store from "../../store.js";
export default {

  name: "ProfileCard",
  data() {
    return {
      sharedState: store.state,
    };
  },
}
</script>
