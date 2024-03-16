import { master, slave } from '../database.js'

function _sanitize(text) {
  if (typeof text === "number") {
    return text
  }
  return text.replace(/([^a-z-A-Z-0-9 .@_'])+/g, '')
}

function checkout(customer_id, cart_item_id, checkout_num) {

    const cleancustomer_id = _sanitize(customer_id)
    const cleancart_id = _sanitize(cart_item_id)
    const cleancheck_num = _sanitize(checkout_num)
  
    return new Promise((resolve, reject) => {

        const now = new Date()
        const time = now.toLocaleTimeString()
        const date = now.toLocaleDateString()

        master(`INSERT INTO cart(cart_item_id, checkout_number) VALUES(?, ?)`,
            cleancart_id, cleancheck_num)

        master(`INSERT INTO orders(time, date, customer_id, checkout_num) VALUES(?, ?, ?, ?)`,
            time, date, cleancustomer_id, cleancheck_num)

        master(`INSERT INTO transac_history(transac_cat, checkout_number) VALUES(?, ?)`,
            1, cleancheck_num)

        master(`INSERT INTO transac_history(transac_cat, checkout_number) VALUES(?, ?)`,
            2, cleancheck_num)
        
    })
}

export default {
    checkout
}