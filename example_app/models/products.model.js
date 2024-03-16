import { master, slave } from "../database.js";

function _sanitize(text) {
    if (typeof text === "number") {
        return text
    }
    return text.replace(/([^a-z-A-Z-0-9 .@_'])+/g, '')
}

function get(query, offset = 0, limit = 50) {
return new Promise((resolve, reject) => {

    if (query) {
    if (/\D+/g.test(query)) {
        console.log('[PRODUCT] Invalid Query', query)
        resolve([])
    }

    // console.log(query)
    slave(`SELECT name, price, stocks, seller_name, seller_id 
    FROM products 
    INNER JOIN accounts ON products.seller_id = accounts.id 
    WHERE products.product_name = ?`, query)
    } else {
     slave(`SELECT products.id, name, price, stocks, seller_name, seller_id 
    FROM products 
    INNER JOIN accounts ON products.seller_id = accounts.id LIMIT ${limit} OFFSET ${offset}`)
    }
})}


function add_product(name, price, stocks, seller_id){
    const cleanName = _sanitize(name)
    const cleanPrice = _sanitize(price)
    const cleanStocks = _sanitize(stocks)
    const cleanSeller = _sanitize(seller_id)

    return new Promise((resolve, reject) => {
        master(`INSERT INTO products(name, price, stocks, seller_id) VALUES(?, ?, ?, ?)`,
                cleanName, cleanPrice, cleanStocks, cleanSeller)
    })
}

function update_product(id, price, stocks){
    const cleanid = _sanitize(id)
    const cleanPrice = _sanitize(price)
    const cleanStocks = _sanitize(stocks)
    
    return new Promise((resolve, reject) => {
        master(`UPDATE products SET price = ?, stocks = ? WHERE id = ?`,
        cleanPrice, cleanStocks, cleanid
        )
    }
    )
}

function delete_product(id) {

    return new Promise((resolve, reject) => {
        master(`DELETE FROM products WHERE id = ?`,
        id
        )
      })
}
  

export default {
    get,
    add_product,
    update_product,
    delete_product,
}