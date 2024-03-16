import history from '../models/orders.model.js'

export async function getHistory(request, response) {
    response.setHeader('Content-Type', 'application/json')
  
    try {
      const { id, checkout_num } = request.data || {}
  
      const data = await history.get(id, checkout_num)
  
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
  