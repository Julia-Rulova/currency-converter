<template>
    <section class="main">
        <div class="main__select-container">
            <label class="main__label" for="base">Выберите базовую валюту</label>
            <select class="main__select" @change="changeBase">
                <option selected="selected">{{ base }}</option>
                <option v-for="currency in currencies" :key="currency[1].numericCode">{{
                        currency[1].code
                }}</option>
            </select>
        </div>
        <div class="main__list" v-if="!loading">
            <div class="main__item" v-for="currency in currencies" :key="currency[1].numericCode">
                <p class="main__currency"><span class="main__currency_span">{{ currency[1].code }}</span> - {{
                        currency[1].rate.toFixed(2)
                }}
                    {{ base }}
                </p>
            </div>
        </div>
        <h1 v-else class="main__load-text">Идёт загрузка...</h1>
    </section>
</template>

<script>

export default {

    data() {
        return {
            currencies: [],
            loading: false,
            base: 'RUB',
        }
    },
    methods: {
        changeBase(evt) {
            this.base = evt.target.value;
            this.fetchCurrencies();
        },
        async fetchCurrencies() {
            try {
                this.loading = true;

                await fetch(`https://www.floatrates.com/daily/${this.base.toLowerCase()}.json`)
                    .then(response => response.json())
                    .then(result => {
                        this.currencies = Object.entries(result).sort();
                    });

            } catch (err) {
                console.log(`Ошибка ${err}`);
            } finally {
                this.loading = false;
            }
        },
    },
    mounted() {
        this.fetchCurrencies();
    }
}
</script>

<style>
.main {
    width: 100%;
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.main__select-container {
    margin-bottom: 40px;
}

.main__label {
    font-size: 20px;
    margin: 0 20px 0 0;
}

.main__select {
    width: 100px;
    border: 2px solid #006400;
}

.main__select:focus-visible {
    outline: none;
}

.main__list {
    max-width: 90%;
    margin: 0 auto;
    display: grid;
    gap: 25px 40px;
    grid-template-columns: repeat(6, 1fr);
}

.main__load-text {
    font-size: 30px;
    color: black;
}

.main__item {
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #006400;
    box-shadow: 0px 5px 10px 2px rgba(0, 100, 0, 0.2);
}

.main__currency {
    font-size: 15px;
}

.main__currency_span {
    font-size: 20px;
    font-weight: 500;
}
</style>