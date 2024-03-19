export interface Vehicle {
    id: number,
    make: string,
    model:{
        name: string,
        img: string,
    }
    price: number,
    descripcion: string,
    engine: string[],
    color: {
      name: string;
      color: string;
      img: string;
    }[];
    rims: {
        name: string,
        img: string 
      }[],
    Upholsterys: string[],
    extras: {
      name: string,
      img: string 
      }[],      
}
