import seller from '../models/products.model.js';

export async function getAction(request, response) {
    response.setHeader('Content-Type', 'application/json')

    try {
        const { prod_name } = request.data || {}

        const data = await seller.get(prod_name)
        
        // console.log(Math.floor((Math.random() * 100000000) + 1))

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

export async function addAction(request, response) {
    response.setHeader('Content-Type', 'application/json')

    try {
        const {
            name,
            price,
            stocks,
            seller_id
        } = request.data || {}

        if (!name || !price || !stocks || !seller_id) {
            response.write(JSON.stringify({
                'success': false,
                'message': 'Invalid data. Expecting `name`, `price`, `stocks`, `seller_id`.',
            }))
            return response.end()
        }

        const product = await seller.add_product(name, price, stocks, seller_id)

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

export async function updateAction(request, response) {
    response.setHeader('Content-Type', 'application/json')

    try {
        const {
            id,
            price,
            stocks,
        } = request.data || {}

        if (!id || !price || !stocks) {
            response.write(JSON.stringify({
                'success': false,
                'message': 'Invalid data. Expecting `id`, `price`, `stocks`.',
            }))
            return response.end()
        }

        const product = await seller.update_product(id, price, stocks)

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

export async function deleteAction(request, response) {
    response.setHeader('Content-Type', 'application/json')
  
    try {
      const {
        id,
      } = request.data || {}
  
      const res = await seller.delete_product(id)
  
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