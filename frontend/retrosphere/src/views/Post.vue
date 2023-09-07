<template>
    <div class="newpost">
        <div class="row">
            <div class="col"></div>
            <div class="col"><label for="Title" class="form-label">Title</label>
                <input type="Title" class="form-control" id="Title" placeholder="Title">
                <label for="Content" class="form-label">Content</label>
                <textarea class="form-control" id="Content" rows="3"></textarea>
            </div>

            <div class="col"></div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import store from '../store';
export default {
    data() {
        return {
            title: "",
            content: "",
        }
    },
    methods: {
        newPost() {

        }
    }
}

</script>


<style></style>