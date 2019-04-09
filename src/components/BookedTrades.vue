<script>
  import axios from 'axios'

  export default {
    name: 'BookedTrades',
    data() {
      return {
        errors: [],
        bookedTrades: [],
        headers: [
          {text: 'Sell CCY', value: 'sell_currency'},
          {text: 'Sell Amount', value: 'sell_amount'},
          {text: 'Buy CCY', value: 'buy_currency'},
          {text: 'Buy Amount', value: 'buy_amount'},
          {text: 'Rate', value: 'rate'},
          {text: 'Date Booked', value: 'date_booked'}
        ]
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
  <div>
    <h1>Booked Trades</h1>

    <v-layout row wrap justify-end>
      <v-btn :to="{name: 'newTrade'}" color="info" right="right">New Trade</v-btn>
    </v-layout>

    <v-data-table
            :headers="headers"
            :items="bookedTrades"
            class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.sell_currency }}</td>
        <td>{{ props.item.sell_amount|formatAmount }}</td>
        <td>{{ props.item.buy_currency }}</td>
        <td>{{ props.item.buy_amount|formatAmount }}</td>
        <td>{{ props.item.rate|formatRate }}</td>
        <td>{{ props.item.date_booked|formatDate }}</td>
      </template>
    </v-data-table>
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
