import '../css/index.css'
import numeral from 'numeral'

const amount = numeral(1000).format('$0,0.00')
console.log(`${amount} is a lot of money!`)