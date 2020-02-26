<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="400px">
        <v-card-title>
          Приветствую ПУТНИК...
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Ваше имя"
              required
            ></v-text-field>

            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Комната"
              required
            ></v-text-field>

            <v-btn :disabled="!valid" color="primary" @click="submit">
              Войти
            </v-btn>

          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapMutations} from "vuex";
export default {
  layout: "empty",
  sockets: {
    connect: function() {
      console.log("socket connected");
    }
  },
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Введите имя",
      v => (v && v.length <= 16) || "Имя не должно превышать 16 символов"
    ],
    room: "",
    roomRules: [
      v => !!v || "введите комнату"],
  }),
  methods: {
    ...mapMutations(["setUser"]),
    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room
        }

        this.setUser(user);
        this.$router.push("/chat")
      }
    }
  }
};
</script>
