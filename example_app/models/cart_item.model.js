import { master, slave } from "../database.js";

function _sanitize(text) {
    if (typeof text === "number") {
        return text
    }
    return text.replace(/([^a-z-A-Z-0-9 .@_\/'])+/g, '')
}

function get(query, offset = 0, limit = 50) {
    return new Promise((resolve, reject) => {
        if (query) {
        if (/\D+/g.test(query)) {
            console.log('[PRODUCT] Invalid Query', query)
            resolve([])
        }

        const id = parseInt(query, 10)
        slave(`SELECT cart_item.id, products.name as product_name, products.price, cart_item.qty, cart_item.total_amount
        FROM cart_item 
        INNER JOIN products ON cart_item.product_id = products.id
        WHERE customer_id = ?`, id)
        } else {
        slave(`SELECT * FROM cart_item ORDER BY id LIMIT ${limit} OFFSET ${offset}`)
        }
    })
}

function add_to_cart(customer_id, product_id, qty){
    const cleanCustomer = _sanitize(customer_id)
    const cleanProduct = _sanitize(product_id)
    const cleanQty = _sanitize(qty)

    return new Promise((resolve, reject) => {
        master(`INSERT INTO cart_item(customer_id, product_id, qty, total_amount) VALUES(?, ?, ?, ?)`,
                cleanCustomer, cleanProduct, cleanQty, total)
    })
}

function update_item(id, product_id, qty){
    const cleanId = _sanitize(id)
    const cleanProduct = _sanitize(product_id)
    const cleanQty = _sanitize(qty)

    return new Promise((resolve, reject) => {
        master(`UPDATE cart_item SET qty = ?, total_amount = ? WHERE id = ?`,
                cleanQty, total, cleanId)
        
    })
}

function delete_cart_item(id) {

    return new Promise((resolve, reject) => {

    master(`DELETE FROM cart_item WHERE id = ?`,
    id
    )
    })
  }
  
export default {
    get,
    add_to_cart,
    update_item,
    delete_cart_item
}