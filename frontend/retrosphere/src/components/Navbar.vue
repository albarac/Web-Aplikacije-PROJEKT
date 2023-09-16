<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-3"
        v-if="$route.path !== '/login' && $route.path !== '/register'">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Retrosphere</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <input class="form-control" placeholder="search bar" type="text" id="search" />

                <ul class="navbar-nav ms-auto">
                    <li class="nav-item ">
                        <router-link to="/" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/post" class="nav-link">Posts</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/settings" class="nav-link">Settings</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link">Logout</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
  
  
<style lang="scss" scoped>
#search {
    width: 300px;
    margin-left: 50px;
}
</style>