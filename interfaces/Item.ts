export interface IAuthor {
    id: string;
    title: string;
    price:number;
    category:string;
    condition:'new' | 'used';
    media:{type:'image' | 'video';url:string}[];
    // seller
  }