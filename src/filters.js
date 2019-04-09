import Vue from 'vue'
import moment from 'moment/moment'
import numeral from 'numeral'


numeral.register('locale', 'pl', {
  delimiters: {
    thousands: ' ',
    decimal: '.'
  },
  abbreviations: {
    thousand: 'tys.',
    million: 'm',
    billion: 'b',
    trillion: 't'
  },
  currency: {
    symbol: 'zł'
  }
})

numeral.locale('en')

Vue.filter('formatRate', function (value) {
  return numeral(value).format('0,0.000000')
})

Vue.filter('formatAmount', function (value) {
  return numeral(value).format('0,0.00')
})

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY HH:mm')
  }
})
