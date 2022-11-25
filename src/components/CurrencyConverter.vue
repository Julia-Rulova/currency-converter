<template>
    <section class="converter">
        <h1 class="converter__title">Выберите вылюты</h1>
        <div class="converter__inputs">
            <div class="input__container">
                <input class="input" type="number" min="0" v-model="fromAmount" @change="setFromAmount" />
                <select class="input__select" @change="changeFrom">
                    <option selected="selected">{{ from }}</option>
                    <option v-for="currency in currenciesFrom" :key="currency[1].numericCode">{{
                            currency[1].code
                    }}</option>
                </select>
            </div>
            <div class="input__container">
                <input class="input" type="number" min="0" v-model="toAmount" @change="setToAmount" />
                <select class="input__select" @change="changeTo">
                    <option selected="selected">{{ to }}</option>
                    <option v-for="currency in currenciesTo" :key="currency[1].numericCode">{{
                            currency[1].code
                    }}</option>
                </select>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    data() {
        return {
            currenciesFrom: [],
            currenciesTo: [],
            from: 'RUB',
            to: 'USD',
            fromAmount: 0,
            toAmount: 0
        }
    },
    methods: {
        setFromAmount(n) {
            const fromObj = this.currenciesTo.find((el) => el[0] == this.from.toLowerCase());
            this.toAmount = (n.target.value / fromObj[1].rate).toFixed(2);

        },
        setToAmount(n) {
            const toObj = this.currenciesFrom.find((el) => el[0] == this.to.toLowerCase());
            this.fromAmount = (n.target.value / toObj[1].rate).toFixed(2);
        },
        changeFrom(evt) {
            const val = evt.target.value;

            if (val === this.to) {
                this.to = this.from;
            }

            this.from = val;
            this.fetchCurrenciesFrom();
            this.fetchCurrenciesTo();
        },
        changeTo(evt) {
            const val = evt.target.value;

            if (val === this.from) {
                this.from = this.to;
            }


            this.to = val;
            this.fetchCurrenciesFrom();
            this.fetchCurrenciesTo();
        },
        fetchCurrenciesFrom() {
            try {
                fetch(`https://www.floatrates.com/daily/${this.from.toLowerCase()}.json`)
                    .then(response => response.json())
                    .then(result => {
                        this.currenciesFrom = Object.entries(result).sort();
                    });

            } catch (err) {
                console.log(`Ошибка ${err}`);
            }
        },
        fetchCurrenciesTo() {
            try {
                fetch(`https://www.floatrates.com/daily/${this.to.toLowerCase()}.json`)
                    .then(response => response.json())
                    .then(result => {
                        this.currenciesTo = Object.entries(result).sort();
                    });

            } catch (err) {
                console.log(`Ошибка ${err}`);
            }
        },
    },
    mounted() {
        this.fetchCurrenciesFrom();
        this.fetchCurrenciesTo();
    }
}
</script>

<style>
.converter {
    max-width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
}

.converter__title {
    margin: 40px 0;
    padding: 0;
    font-size: 30px;
}

.converter__inputs {
    max-width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.input__container {
    max-width: 450px;
    height: 40px;
    display: flex;
    flex-direction: row;
    margin-right: 30px;
    box-shadow: 0px 5px 10px 2px rgba(0, 100, 0, 0.2);
}

.input__container:last-of-type {
    margin: 0;
}

.input {
    width: 75%;
    outline: none;
    border: 2px solid #006400;
    border-right: none;
    padding: 5px 7px;
}

.input__select {
    width: 25%;
    border: 2px solid #006400;
}

.input__select:focus-visible {
    outline: none;
}
</style>