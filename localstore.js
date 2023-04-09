export const loadState = () => {
    try {
      let serialState = localStorage.getItem('localcart');
      if (serialState === null) {
        return undefined;
      }else{
        const localcart = JSON.parse(localStorage.getItem('localcart'))
        if(localcart.cart.length == 0){
          return undefined
        }

      }
      return JSON.parse(serialState);
    } catch (err) {
      return undefined;
    }
};


export const saveState = (state) => {
    try {
      const serialState = JSON.stringify(state);
      localStorage.setItem('localcart', serialState);
    } catch(err) {
        console.log(err);
    }
};