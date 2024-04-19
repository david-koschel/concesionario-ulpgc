export interface Vehicle {
    id: number,
    make: string,
    model:{
        name: string,
        img: string,
    }
    price: number,
    descripcion: string,
    engine: {
      name: string,
      price: number,
    }[],
    color: {
      name: string,
      color: string,
      img: string,
      price: number,
    }[];
    rims: {
        name: string,
        img: string,
        price: number
      }[],
    upholsterys: {
        name: string,
        price: number,
    }[],
    extras: {
      name: string,
      img: string,
      price: number,
      }[],      
}
