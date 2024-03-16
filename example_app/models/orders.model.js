import { master, slave } from "../database.js";

function get(query, offset = 0, limit = 50) {
return new Promise((resolve, reject) => {
    if (query) {
    if (/\D+/g.test(query)) {
        console.log('[HISTORY] Invalid Query', query)
        resolve([])
    }

    const id = parseInt(query, 10)
    slave(`SELECT orders.checkout_num, cart_item.customer_id, customer.full_name as customer_name,
    products.seller_id, seller.seller_name, products.name as product_name, products.price, cart_item.qty, cart_item.total_amount, customer.shipping_add as shipping_address,
    orders.date as order_date, orders.time as order_time
    FROM orders
    INNER JOIN cart ON orders.checkout_num = cart.checkout_number
    INNER JOIN cart_item ON cart.cart_item_id = cart_item.id
    INNER JOIN accounts customer ON cart_item.customer_id = customer.id
    INNER JOIN products ON cart_item.product_id = products.id
    INNER JOIN accounts seller ON products.seller_id = seller.id
    WHERE (orders.customer_id = ?) || (products.seller_id = ?)`, id, id)
    } else {
    slave(`SELECT orders.checkout_num, cart_item.customer_id, customer.full_name as customer_name,
    products.seller_id, seller.seller_name, products.name as product_name, products.price, cart_item.qty, cart_item.total_amount, customer.shipping_add as shipping_address,
    orders.date as order_date, orders.time as order_time
    FROM orders
    INNER JOIN cart ON orders.checkout_num = cart.checkout_number
    INNER JOIN cart_item ON cart.cart_item_id = cart_item.id
    INNER JOIN accounts customer ON cart_item.customer_id = customer.id
    INNER JOIN products ON cart_item.product_id = products.id
    INNER JOIN accounts seller ON products.seller_id = seller.id LIMIT ${limit} OFFSET ${offset}`
)}
})
}

export default {
    get,
}