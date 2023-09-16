<template>
    <div @click="goDetails()" class="forum">
        <p id="title">"{{ info.Title }}"</p>
        <p id="user">{{ info.PostedBy }}</p>
        <p id="date">{{ formatDate(info.Date) }}</p>
        <img src="../assets/user.png" id="img">
    </div>
</template>
  
<script>
export default {
    props: ["info"],
    methods: {
        goDetails() {
            this.$router.push({ path: `details/${this.info._id}` })
        },
        formatDate(date) {
            const parsedDate = new Date(date);
            const day = String(parsedDate.getDate()).padStart(2, "0");
            const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
            const year = parsedDate.getFullYear();
            return "${day}/${month}/${year}";
        },
    },
};
</script>
  
<style scoped>
.forum {
    display: flex;
    padding: 20px;
    background-color: rgb(41, 40, 40);
    color: whitesmoke;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 10px;
    transition: 0.1s;
}

.forum:hover {
    transform: translateX(10px);
    cursor: pointer;
}

#title {
    margin-right: 30px;
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    font-size: 20px;
    margin-right: 40px;
    transform: translateY(7px);
}

#user {
    margin-right: 30px;
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    font-size: 20px;
    margin-right: 40px;
    transform: translateY(7px);
    text-decoration: underline;
    text-decoration-color: whitesmoke;
}

#date {
    margin-right: 30px;
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    font-size: 20px;
    margin-right: 40px;
    transform: translateY(7px);
}

#reply {
    margin-right: 30px;
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    font-size: 20px;
    margin-right: 40px;
    transform: translateY(7px);
}

#img {
    width: 30px;
    height: 30px;
}
</style>