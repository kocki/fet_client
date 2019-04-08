<script>
  import axios from 'axios'

  export default {
    name: 'BookedTrades',
    data() {
      return {
        errors: [],
        bookedTrades: []
      }
    },
    mounted() {
      axios.get('fet/')
        .then(response => {
          this.bookedTrades = response.data.results
        })
        .catch((err) => {
          this.errors.push(err)
        })
    }
  }
</script>

<template>
  <div class="table trades">
    <h1>Booked Trades</h1>
      <router-link tag="button" :to="{name: 'newTrade'}">New Trade</router-link>

    <table border="1">
      <tr>
        <th>Sell CCY</th>
        <th>Sell Amount</th>
        <th>Buy CCY</th>
        <th>Buy Amount</th>
        <th>RateView</th>
        <th>Date Booked</th>
      </tr>
      <tr v-for="trade in bookedTrades" :key="trade.transaction_id">
        <td>{{ trade.sell_currency }}</td>
        <td>{{ trade.sell_amount|formatAmount }}</td>
        <td>{{ trade.buy_currency }}</td>
        <td>{{ trade.buy_amount|formatAmount }}</td>
        <td>{{ trade.rate|formatRate }}</td>
        <td>{{ trade.date_booked|formatDate }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
  table {
    border-collapse: collapse;
  }

  td, th {
    padding: .3rem;
  }
</style>
