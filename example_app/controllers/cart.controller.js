import buyer from '../models/cart.model.js';

export async function addCheckout(request, response) {
    response.setHeader('Content-Type', 'application/json')

    try {
        const {
            customer_id,
            cart_item_id,
            checkout_num,
        } = request.data || {}

        if (!customer_id || !cart_item_id || !checkout_num) {
            response.write(JSON.stringify({
                'success': false,
                'message': 'Invalid data. Expecting `customer_id`, `cart_id`, `checkout_num`.',
            }))
            return response.end()
        }

        const checkout = await buyer.checkout(customer_id, cart_item_id, checkout_num)

        response.write(JSON.stringify({
            'success': true,
            'data': checkout
        }))
    } catch (err) {
        response.write(JSON.stringify({
            'success': false,
            'message': err.message,
        }))
    }

    return response.end()
}