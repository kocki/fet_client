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
        return this.trade.sellAmount * this.rate
      },
      rate() {
        return this.trade.rate
      },
    },
    watch: {
      'trade.sellCurrency'(newValue, oldValue) {
        if (newValue != oldValue) {
          this.trade.rate = this.getRate()
        }
      },
      'trade.buyCurrency'(newValue, oldValue) {
        if (newValue != oldValue) {
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
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },
    methods: {
      getRate() {
        if (this.trade.sellCurrency.length & this.trade.buyCurrency.length) {
          axios.get('rate/', {params: {sell: this.trade.sellCurrency, buy: this.trade.buyCurrency}})
            .then(response => {
              this.trade.rate = response.data.rate
            })
            .catch((err) => {
              // eslint-disable-next-line no-console
              console.log(err)
            })
        }
        this.trade.rate = null
      },
      checkTrade(e) {
        const payload = {
          sell_amount: this.trade.sellAmount,
          sell_currency: this.trade.sellCurrency,
          buy_currency: this.trade.buyCurrency,
          rate: this.trade.rate
        }
        axios.post('fet/', payload)
          .then(() => {
            this.$router.push({name: 'bookedTrades'})
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            this.errors.push(err)
          })
        e.preventDefault(e)
      }
    }
  }
</script>

<template>
  <v-form>
    <v-container fluid grid-list-xl>
      <h1>Create Trade</h1>
      <p class="caption">Free fixer.io account services only EUR sell currency.</p>
      <v-layout wrap align-center justify-center column>
        <v-layout wrap align-center justify-center row>
          <v-flex xs4 sm2 d-flex>
            <v-autocomplete
                    v-bind:items="symbols"
                    v-model="trade.sellCurrency"
                    item-text="1"
                    item-value="0"
                    label="Sell Currency"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs4 sm2 d-flex>
            <v-text-field
                    v-model="rate"
                    label="Rate"
                    disabled
            ></v-text-field>
          </v-flex>
          <v-flex xs4 sm2 d-flex>
            <v-autocomplete
                    v-bind:items="symbols"
                    v-model="trade.buyCurrency"
                    item-text="1"
                    item-value="0"
                    label="Buy Currency"
            ></v-autocomplete>
          </v-flex>
        </v-layout>
        <v-layout wrap align-center justify-center row>
          <v-flex xs4 sm3 d-flex>
            <v-text-field
                    v-model="trade.sellAmount"
                    label="Sell Amount"
            ></v-text-field>
          </v-flex>
          <v-flex xs4 sm3 d-flex></v-flex>
          <v-flex xs4 sm3 d-flex>
            <v-text-field
                    v-model="buyAmount"
                    label="Buy Amount"
                    disabled
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-center justify-center row>
          <v-btn @click="checkTrade" color="info">Create</v-btn>
          <v-btn :to="{name: 'bookedTrades'}">Cancel</v-btn>
        </v-layout>
      </v-layout>
    </v-container>
  </v-form>
</template>

<style scoped>
</style>
