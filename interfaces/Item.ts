export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  categories: { name: string; id: string }[];
  condition: "new" | "used";
  media: { type: "image" | "video"; url: string }[];
  seller: { username: string; avatar: string };
}
