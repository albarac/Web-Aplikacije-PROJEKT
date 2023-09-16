<template>
    <div class="newpost">
        <div id="row" class="row">
            <div class="col"></div>
            <div class="col">
                <label id="labeltitle" for="Title" class="form-label">Title</label>
                <input maxlength="25" v-model="title" type="Title" class="form-control" id="Title" placeholder="Title" />
                <label id="contenttitle" for="Content" class="form-label">Content</label>
                <textarea v-model="content" placeholder="Content" class="form-control" id="Content" rows="7"></textarea>
                <label id="labeltitle" for="hash" class="form-label">Hashtag</label>
                <input v-model="hashtag" type="Title" class="form-control" id="hash" placeholder="Hashtag" />
                <button id="post" @click="newPost()" type="button" class="btn btn-dark">
                    Post
                </button>
            </div>

            <div class="col"></div>
        </div>
    </div>
</template>
  
  
<script>
import axios from "axios";
import store from "../store";
export default {
    data() {
        return {
            store,
            title: "",
            content: "",
            hashtag: "",
        };
    },
    mounted() {
        this.getData();
        console.log("Store: ", store);
    },
    methods: {
        async getData() {
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
        },
        newPost() {
            let post = {
                Title: this.title,
                Content: this.content,
                Date: new Date(),
                Hashtag: this.hashtag,
                PostedBy: this.store.username,
            };
            axios.post("http://localhost:9000/newPost", post).then((res) => {
                console.log("Response post: ", res.data);
                if (res.data) {
                    this.$router.push({ name: "home" });
                } else {
                    console.log("Error posting data!");
                }
            });
        },
    },
};
</script>
  
  
<style>
#labeltitle {
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    font-size: 20px;
}

#contenttitle {
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    font-size: 20px;
}

#row {
    margin-top: 20px;
}

#Title {
    margin-bottom: 20px;
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    font-size: 20px;
}

#Content {
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    font-size: 20px;
}

#post {
    margin-top: 15px;
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    font-size: 20px;
}

#hash {
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    font-size: 20px;
}
</style>