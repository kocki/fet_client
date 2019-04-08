<script>
  import axios from 'axios'

  export default {
    name: 'NewTrade',
    data() {
      return {
        trade: {
          sellCurrency: '',
          sellAmount: 0.00,
          buyCurrency: '',
          rate: null
        },
        symbols: [],
        errors: [],
      }
    },
    computed: {
      buyAmount() {
        // eslint-disable-next-line no-console
        console.log(this.trade.rate)
        return this.trade.sellAmount * this.rate
      },
      rate() {
        // eslint-disable-next-line no-console
        console.log('rate')
        return this.trade.rate
      },
    },
    watch: {
      'trade.sellCurrency'(newValue, oldValue) {
        if (newValue != oldValue) {
          // eslint-disable-next-line no-console
          console.log('sell')
          this.trade.rate = this.getRate()
        }
      },
      'trade.buyCurrency'(newValue, oldValue) {
        if (newValue != oldValue) {
          // eslint-disable-next-line no-console
          console.log('buy')
          this.trade.rate = this.getRate()
        }
      }
    },
    mounted() {
      axios.get('symbols')
        .then(response => {
          this.symbols = response.data.symbols
        })
        .catch((err) => {
          this.errors.push(err)
        })
    },
    methods: {
      getRate() {
        if (this.trade.sellCurrency.length & this.trade.buyCurrency.length) {
          axios.get('rate/', {params: {sell: this.trade.sellCurrency, buy: this.trade.buyCurrency}})
            .then(response => {
              // eslint-disable-next-line no-console
              console.log(response.data.rate)
              this.trade.rate = response.data.rate
            })
            .catch((err) => {
              this.errors.push(err)
            })
        }
        this.trade.rate = null
      },
      checkTrade(e) {
        // eslint-disable-next-line no-console
        console.log(this.trade)
        const payload = {
          sell_amount: this.trade.sellAmount,
          sell_currency: this.trade.sellCurrency,
          buy_currency: this.trade.buyCurrency,
          rate: this.trade.rate
        }
        axios.post('fet/', payload)
          .then(response => {
            // eslint-disable-next-line no-console
            console.log(response)
            this.$router.push({name: 'bookedTrades'})
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err)
          })
        e.preventDefault(e)
      }
    }
  }
</script>

<template>
  <div class="form trade">
    <form v-on:submit="checkTrade" method="post">
      <select v-model="trade.sellCurrency">
        <option disabled value=""></option>
        <option v-for="option in symbols" :value="option[0]" :key="option[0]">
          {{ option[1] }}
        </option>
      </select>
      <span>{{ rate|formatRate }}</span>
      <select v-model="trade.buyCurrency">
        <option disabled value=""></option>
        <option v-for="option in symbols" :value="option[0]" :key="option[0]">
          {{ option[1] }}
        </option>
      </select>
      <br>
      <input v-model="trade.sellAmount" placeholder="#0.00">
      <input v-model="buyAmount" placeholder="#0.00" disabled>
      <div>
        <button type="submit">Create</button>
        <router-link tag="button" :to="{name: 'bookedTrades'}">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
</style>
