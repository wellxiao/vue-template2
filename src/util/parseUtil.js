const moment = require('moment')

module.exports = {
  amountParser (amount) {
    if (amount !== '' && !isNaN(amount)) {
      const parseAmount = (amount / 100).toFixed(2)
      return parseAmount
    }
    return '--'
  },
  dateTimeParser (timestamp) {
    if (timestamp) {
      const time = new Date(timestamp)
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
    return ''
  },
  dateParser (timestamp) {
    if (timestamp) {
      const time = new Date(timestamp)
      return moment(time).format('YYYY-MM-DD')
    }
    return ''
  },
  timeParser (timestamp) {
    if (timestamp) {
      const time = new Date(timestamp)
      return moment(time).format('HH:mm:ss')
    }
    return ''
  }
}
