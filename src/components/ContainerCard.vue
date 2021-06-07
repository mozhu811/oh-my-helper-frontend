<template>
  <div>
    <v-card
      color="primary lighten-1"
      dark
      elevation="10"
    >
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title
            class="text-h5"
            v-text="item.username"
          ></v-card-title>

          <v-card-subtitle v-text="'硬币: ' + item.coins + ' 等级: LV' + item.level"></v-card-subtitle>

          <v-card-actions>
            <v-btn
              class="ml-2 mt-5 mb-2"
              outlined
              rounded
              small
            >
              查看日志
            </v-btn>
          </v-card-actions>
        </div>

        <v-badge
          avatar
          bordered
          bottom
          :value="item.vipType"
          offset-x="30"
          offset-y="30"
          class="ma-3"
        >
          <template v-slot:badge>
            <v-avatar>
              <v-img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAMAAADUivDaAAAAh1BMVEUAAAD////////////////////////////////////////////////////////////////////////////////7cpn////8g6b/7vL8p7/+3Ob9sMb8lbL9ytj9uMz9wdL/9/n+ytn7e5/+5ez8jKz7ep/+09/8nrj8nrn7jKz7e6D9p7/9wdNOsRhSAAAAFXRSTlMA3yAQoEDP75CA3r+PYFAwf65w7rAb9/MjAAADDElEQVRYw51X2WKjMAyEBAg5e+xiMJib0KTt/3/flvUhx7KBZt4a5KlmJITsObG9vAdHf0J0DPbh1vslwtgnBqI4XH9++7ojVvjnzSqCTQwEGMHm6QwAr0se+GQR/qwnJz00a4uPdMLAijFbl8gmgqi8+EwekNJeq87GwQAiSpZYMJQgxsrxohjGNHEgLYFjJoeMJTOgGeJADCV4YEU6Sg6z5SVDlSyiEqFHezULiFzmOOkMZxvDtR7HIp3jCA0jkArGvelcHGAHyCiNwJxXSCaCH5G9SkJU06xFIRo1weh4bXcyjYCHMhTXoAegEtKAJEpnunVik6LSgCSkZKyktbaYnoYvksCgDxTDjd40TSUvysQQQhKIAmrN8oZ72xluhEoH2I6FUFY1RKI23IiVDmqjGIkF7PEfRKIeWMd1KNqe2FAbhm69i6Hjo6jatm+IE1Af3l4XL36k7iB2kaIlE969NzLhI5FYpKCG24EXGT1sNaDp24r+4EcjS0CzmDy+4WaFzufVkFhxF83Fw9C7BSjcY9SkAIXNNx0+pdQyWU8BTx66j62mwKDQMPMUyk6ETJWwbutb6rQzEhSDY8Jm6pXs69Q+uY6itShOEn4vZXWp7UX+azS4xDVTSUxK1MqhSIB6752xa3Co1FWhTwJv5FC+7B1KkbuMOJov9LJ7O2zGvUFDvcAzh/KCWAdfmqlgAFONn6PBF4ISYIBY/DMRf8P43XIlFQ6liZWjQR8Bb88fdLyaMKwz1Cu9dAiSeJcfRGiNDKy39HQtJhz0m9i4jpp5uWK4O5aTTJtYJDCWg0lKJ9hzx+JYZFT3Ra19sS4lrdr2myXzKI0VhRcFZtzqhe2g7Y0XwvE1dw636tnTEAPHKgaQAVKeWF0j1wJdd/MEVzmADht0EdjBRJgByzAD5iDlisvEwXUhmSdJ6wYxYD8URno1PChyfLHC2AZEQ17fWDodTgda90TDae72ffbJIg7hwl05WGLYQwpPkMCFe5nEIecPZLCMC2Y5nELvl3i5xMfI/384ejud3QL+AW4LJEWZOPxvAAAAAElFTkSuQmCC"></v-img>
            </v-avatar>
          </template>

          <v-avatar size="125">
            <v-img :src="item.avatar"></v-img>
          </v-avatar>
        </v-badge>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ContainerCard',
  props: {
    item: Object
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
.rounded-card {
  border-radius: 50%;
  min-height: 500px;
  min-width: 500px;
}
</style>
