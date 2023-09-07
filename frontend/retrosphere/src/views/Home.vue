<template>
  <div class="home">
    <div class="row">
      <div class="col">

      </div>
      <div class="col">
        <div class="forum">
          <p id="title">
            title
          </p>
          <p id="user">
            username
          </p>
          <p id="date">
            dateposted
          </p>
          <p id="reply">
            replies
          </p>

        </div>
      </div>
      <div class="col">

      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import store from '../store';
export default {
  data() {
    return {
      store
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      if (localStorage.getItem("token") == null) {
        console.log("Unauthorized!")
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
    }
  }
}
</script>


<style lang="scss" scoped>
.home {
  margin: 30px;
  padding: 30px;
}

.forum {
  display: flex;
  padding: 10px;
  background-color: chartreuse;
}

#title {
  margin-right: 30px;
}

#user {
  margin-right: 30px;

}

#date {
  margin-right: 30px;
}

#reply {
  margin-right: 30px;
}
</style>