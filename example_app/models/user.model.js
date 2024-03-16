import { master, slave } from '../database.js'

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
        console.log('[ACCOUNT] Invalid Query', query)
        resolve([])
      }

      const id = parseInt(query, 10)
      slave("SELECT * FROM accounts WHERE `id` = ?", id) 
    } else {
      slave(`SELECT * FROM accounts ORDER BY id LIMIT ${limit} OFFSET ${offset}`)
    }
  })
}
        

        
function add_account(full_name, email, username, phone, password, shipping_add, billing_add) {

  const cleanFull_name = _sanitize(full_name)
  const cleanEmail = _sanitize(email)
  const cleanPhone = _sanitize(phone)
  const hashed_pass = password

  return new Promise((resolve, reject) => {
    master("INSERT INTO accounts(full_name, email, username, phone, password, shipping_add, billing_add) VALUES (?, ?, ?, ?, ?, ?, ?)", cleanFull_name, cleanEmail, username, cleanPhone, hashed_pass, shipping_add, billing_add)
  })
}


function update_account(id, full_name, email, username, phone, password, shipping_add, billing_add) {

  const cleanID = _sanitize(id)
  const cleanFull_name = _sanitize(full_name)
  const cleanEmail = _sanitize(email)
  const cleanPhone = _sanitize(phone)
  const hashed_pass = password

  return new Promise((resolve, reject) => {
    master("UPDATE accounts SET full_name = ?, email = ?, username = ?, phone = ?, password = ?, shipping_add = ?, billing_add = ? WHERE id = ?", cleanFull_name, cleanEmail, username, cleanPhone, hashed_pass, shipping_add, billing_add, cleanID)
  })
}

function delete_account(id) {

  return new Promise((resolve, reject) => {

    master(`DELETE FROM accounts WHERE id = ?`,
      id)
    })
}

export default {
  get,
  add_account,
  update_account,
  delete_account,
}