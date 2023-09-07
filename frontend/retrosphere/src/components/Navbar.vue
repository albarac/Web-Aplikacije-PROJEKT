<template>
    <nav id="navbar" class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <router-link v-if="$route.path !== '/login' && $route.path !== '/register'" id="router-link" to="/">
                <h6>Home</h6>
            </router-link>
            <router-link v-if="$route.path !== '/login' && $route.path !== '/register'" id="router-link" to="/post">
                <h6>Post</h6>
            </router-link>
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <router-link v-if="$route.path !== '/login' && $route.path !== '/register'" id="router-link" to="/login">
                <h6>Logout</h6>
            </router-link>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
#navbar {
    background-color: rgb(107, 95, 90);
}

#router-link {
    color: black;
    font-size: 20px;
    text-decoration: none;
}
</style>