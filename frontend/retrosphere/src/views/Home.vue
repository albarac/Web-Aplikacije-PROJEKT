<template>
  <div class="home">
    <div class="row">
      <div class="col"></div>
      <div class="col-md-8">

        <Card :key="card.id" v-bind:info="card" v-for="card in store.posts" />

      </div>
      <div class="col"></div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import store from "../store";
import Card from "../components/Card.vue"
export default {
  components: {
    Card,
  },
  data() {
    return {
      store,
    };
  },
  mounted() {
    this.getData();
    this.getPosts();
  },
  methods: {
    getData() {
      if (localStorage.getItem("token") == null) {
        console.log("Unauthorized!");
      } else {
        axios
          .get("http://localhost:9000/user", {
            headers: { token: localStorage.getItem("token") },
          })
          .then((res) => {
            console.log("Response:", res);
            store.username = res.data.user.username;
            store.email = res.data.user.email;
            store.id = res.data.user.id;
          });
      }
      console.log("Store: ", store)
    },
    getPosts() {
      axios.get("http://localhost:9000/getPosts").then((res) => {
        console.log("Response Posts: ", res.data);
        let data = res.data;
        console.log("Data: ", data)
        store.posts = data;
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.home {
  margin: 30px;
  padding: 30px;
}
</style>