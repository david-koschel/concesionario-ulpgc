export interface Vehicle {
    id: number,
    Make: string,
    model:{
        name: string,
        img: string,
    }
    price: number,
    descripcion: string,
    color: {
      name: string;
      color: string;
      img: string;
    }[];
    rims: {
        name: string,
        img: string 
      }[],
    tires: {
      name: string,
      img: string 
      }[],
    Upholsterys: [string],
    extras: {
      name: string,
      img: string 
      }[],      

}
