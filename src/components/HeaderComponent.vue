<template>
    <header class="header">
        <RouterLink to="/converter" class="header__link">Конвертер валют</RouterLink>
        <RouterLink to="/" class="header__link">Курсы валют</RouterLink>
    </header>
</template>

<script>

</script>

<style>
.header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 15px 0;
    border-bottom: 1px solid #3CB371;
    background-color: rgba(0, 100, 0, 0.1);
}

.header__link {
    font-size: 20px;
    font-weight: 400;
    margin: 0 20px 0 0;
    padding: 0;
    text-decoration: none;
    color: #000;
}

.header__link:last-of-type {
    margin: 0;
}

.router-link-active {
    font-weight: 600;
}
</style>