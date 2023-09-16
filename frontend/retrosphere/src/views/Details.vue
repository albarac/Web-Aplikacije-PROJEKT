<template>
    <div class="details">
        <div id="row1" class="row">
            <div class="col">
                <h3>"{{ post.Title }}"</h3>
                <p id="postedby">
                    Posted by {{ post.PostedBy }} on {{ formatDate(post.Date) }}
                </p>
                <input :value="post.Content" id="content" type="text" class="form-control" />
            </div>
            <div class="col"></div>
            <div class="col"></div>
        </div>

        <div id="row2" class="row">
            <h3>Comments</h3>
            <div class="col">
                <input :key="comm.id" v-for="comm in this.comments" id="comment" :value="comm.comment" type="text"
                    class="form-control" />
            </div>
            <div class="col"></div>
            <div class="col">
                <input v-model="comment" id="postComment" placeholder="New comment" type="text" class="form-control" />
                <button @click="newComment()" id="postbtn" type="button" class="btn btn-success">
                    Comment
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";
import store from "../store";
export default {
    props: ["id"],
    data() {
        return {
            store,
            post: {},
            comment: "",
            comments: []
        };
    },
    methods: {
        async getComments() {
            axios.get(`http://localhost:9000/GetComments/${this.id}`).then((res) => {
                this.comments = res.data;
                console.log("Komentari sa backenda: ", this.comments);
            });
        },
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
        newComment() {
            let comment = {
                username: store.username,
                userId: store.id,
                postId: this.id,
                comment: this.comment,
            };
            axios.post("http://localhost:9000/newComment", comment).then((res) => { });
            this.comment = "";
        },
        formatDate(date) {
            const parsedDate = new Date(date);
            const day = String(parsedDate.getDate()).padStart(2, "0");
            const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
            const year = parsedDate.getFullYear();
            return "${day}/${month}/${year}";
        },
        getPostData() {
            axios.get(`http://localhost:9000/getPost/${this.id}`).then((res) => {
                console.log("Response:", res);
                this.post = res.data;
            });
            console.log("Post:", this.post);
        },
    },
    mounted() {
        this.getData()
        this.getPostData();
        this.getComments();
    },
};
</script>
  
<style scoped>
#postbtn {
    margin-top: 20px;
}

#postComment {
    margin-top: 20px;
}

#comment {
    margin-top: 20px;
}

#postedby {
    text-decoration: underline;
}

.details {
    padding: 40px;
}

#row1 {
    margin-top: 20px;
}

#row2 {
    margin-top: 80px;
}

#content {
    margin-top: 20px;
}
</style>