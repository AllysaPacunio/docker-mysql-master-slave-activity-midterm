import customer from '../models/cart_item.model.js';

export async function getCartItem(request, response) {
    response.setHeader('Content-Type', 'application/json')

    try {

        const { customer_id } = request.data || {}

        const data = await customer.get(customer_id)

        response.write(JSON.stringify({
            'success': true,
            'data': data
        }, undefined, 4))
    } catch (err) {
        response.write(JSON.stringify({
            'success': false,
            'message': err.message,
        }))
    }

    return response.end()
}

export async function addCartItem(request, response) {
    response.setHeader('Content-Type', 'application/json')

    try {
        const {
            customer_id,
            product_id,
            qty
        } = request.data || {}

        if (!customer_id || !product_id || !qty) {
            response.write(JSON.stringify({
                'success': false,
                'message': 'Invalid data. Expecting `customer_id`, `product_id`, `qty`.',
            }))
            return response.end()
        }

        const product = await customer.add_to_cart(customer_id, product_id, qty)

        response.write(JSON.stringify({
            'success': true,
            'data': product
        }))
    } catch (err) {
        response.write(JSON.stringify({
            'success': false,
            'message': err.message,
        }))
    }

    return response.end()
}

export async function updateCartItem(request, response) {
    response.setHeader('Content-Type', 'application/json')

    try {
        const {
            id,
            product_id,
            qty
        } = request.data || {}

        if (!id || !product_id || !qty) {
            response.write(JSON.stringify({
                'success': false,
                'message': 'Invalid data. Expecting `id`, `product_id`, `qty`.',
            }))
            return response.end()
        }

        const product = await customer.update_item(id, product_id, qty)

        response.write(JSON.stringify({
            'success': true,
            'data': product
        }))
    } catch (err) {
        response.write(JSON.stringify({
            'success': false,
            'message': err.message,
        }))
    }

    return response.end()
}

export async function deleteCartItem(request, response) {
    response.setHeader('Content-Type', 'application/json')
  
    try {
      const {
        id,
      } = request.data || {}
  
      const res = await customer.delete_cart_item(id)
  
      response.write(JSON.stringify({
        'success': true,
        'data': res
      }))
    } catch (err) {
      response.write(JSON.stringify({
        'success': false,
        'message': err.message,
      }))
    }
  
    return response.end()
  }