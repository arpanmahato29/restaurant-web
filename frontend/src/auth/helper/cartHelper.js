export const addItemToCart = (item,next) => {
  let cart = [];
  if(typeof window !== undefined){
    if(localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart'))
      console.log(cart)
      if(cart[0].restaurant._id !== item.restaurant._id){
        cart = [{...item}];
        
      } else {
        cart.push({
          ...item
        })
      }
    } else {
      cart = [{...item}];
    }
    localStorage.setItem('cart',JSON.stringify(cart));
    next();
  }
}

export const loadCart = () => {
  if(window !== undefined){
    if(localStorage.getItem('cart')){
      const cart = JSON.parse(localStorage.getItem('cart'));
      return cart
    } else {
      return 'error'
    }
  }
}