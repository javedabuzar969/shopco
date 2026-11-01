export type Product = {
  id: string;
  imgKey: string;
  image?: string;
  sku?: string;
  stock?: number;
  status?: string;
  place: "shop" | "home";
  homeType?: "newarrival" | "topselling" | "onsale";
  style: string;
  style2: string;
  type: string;
  name: string;
  stars: number;
  cost: number;
  discount: number;
  description?: string;
  colors?: string[];
};

export type CartItem = {
  id: string;
  name: string;
  imgKey: string;
  cost: number;
  color: string;
  size: string;
  quantity: number;
};

export const IMG: Record<string, string> = {
  "1":  "photo-1661080561444-a0139edfc4f7",
  "2":  "photo-1637069585336-827b298fe84a",
  "3":  "photo-1626497764746-6dc36546b388",
  "4":  "photo-1621198059871-0d5f9b449233",
  "5":  "photo-1726509319379-dd068f59633d",
  "6":  "photo-1675756235174-18396273b879",
  "7":  "photo-1706565029674-cb233ea977e8",
  "8":  "photo-1708523842501-1619478cea1f",
  "9":  "photo-1662893992324-397132d77dbd",
  "11": "photo-1598529253026-dc278cc737b4",
  "12": "photo-1742740265356-eb2480afad8a",
  "13": "photo-1651002223348-3717f55cf6cd",
  "14": "photo-1670421102344-c19b30c471f0",
  "15": "photo-1603992015724-7c1fc1cc2c76",
};

export function imgUrl(key: string, w = 400, h = 400) {
  if (!key) return `https://images.unsplash.com/${IMG["1"]}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
  if (key.startsWith("http://") || key.startsWith("https://") || key.startsWith("data:")) return key;
  const id = IMG[key] ?? IMG["1"];
  return `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
}

export const COLORS: { key: string; label: string; bg: string }[] = [
  { key: "1",  label: "Brown",        bg: "bg-yellow-900" },
  { key: "2",  label: "Dark Red",     bg: "bg-red-900" },
  { key: "3",  label: "Dark Green",   bg: "bg-green-900" },
  { key: "4",  label: "Dark Blue",    bg: "bg-blue-900" },
  { key: "5",  label: "Yellow",       bg: "bg-yellow-500" },
  { key: "6",  label: "Red",          bg: "bg-red-500" },
  { key: "7",  label: "Green",        bg: "bg-green-500" },
  { key: "8",  label: "Light Blue",   bg: "bg-blue-500" },
  { key: "9",  label: "Black",        bg: "bg-black" },
  { key: "10", label: "White",        bg: "bg-white border border-gray-300" },
  { key: "11", label: "Orange",       bg: "bg-orange-500" },
  { key: "12", label: "Purple",       bg: "bg-purple-600" },
];

export const SIZES = ["Small", "Medium", "Large", "X-Large"];

const DESC = "This timeless piece combines exceptional comfort with effortless style. Crafted from premium materials, it drapes beautifully and moves with you throughout the day — perfect for casual outings or dressed-up occasions.";

export const homeProducts: Product[] = [
  { id:"h1",  imgKey:"1",  place:"home", homeType:"newarrival",  style:"Casual", style2:"Party",  type:"T-shirts", name:"T-shirt with Tape Details",        stars:4.5, cost:120, discount:0,  description:DESC },
  { id:"h2",  imgKey:"2",  place:"home", homeType:"newarrival",  style:"Formal", style2:"Casual", type:"Jeans",    name:"Skinny Fit Jeans",                 stars:3.5, cost:240, discount:20, description:DESC },
  { id:"h3",  imgKey:"3",  place:"home", homeType:"newarrival",  style:"Formal", style2:"Party",  type:"Shirts",   name:"Checkered Shirt",                  stars:4.5, cost:180, discount:0,  description:DESC },
  { id:"h4",  imgKey:"4",  place:"home", homeType:"newarrival",  style:"Casual", style2:"Party",  type:"T-shirts", name:"Sleeve Striped T-shirt",           stars:4.5, cost:130, discount:30, description:DESC },
  { id:"h5",  imgKey:"5",  place:"home", homeType:"topselling",  style:"Formal", style2:"",       type:"Shirts",   name:"Vertical Striped Shirt",           stars:5,   cost:212, discount:20, description:DESC },
  { id:"h6",  imgKey:"3",  place:"home", homeType:"topselling",  style:"Formal", style2:"Party",  type:"Shirts",   name:"Checkered Shirt",                  stars:4.5, cost:180, discount:0,  description:DESC },
  { id:"h7",  imgKey:"6",  place:"home", homeType:"topselling",  style:"Casual", style2:"Party",  type:"T-shirts", name:"Courage Graphic T-shirt",          stars:4,   cost:145, discount:0,  description:DESC },
  { id:"h8",  imgKey:"7",  place:"home", homeType:"topselling",  style:"Party",  style2:"",       type:"Shorts",   name:"Loose Fit Bermuda Shorts",         stars:4.5, cost:240, discount:20, description:DESC },
  { id:"h9",  imgKey:"15", place:"home", homeType:"topselling",  style:"Party",  style2:"",       type:"Shorts",   name:"Relaxed Fit Twill Utility Shorts", stars:5,   cost:260, discount:10, description:DESC },
  { id:"h10", imgKey:"8",  place:"home", homeType:"topselling",  style:"Formal", style2:"",       type:"Jeans",    name:"Faded Skinny Jeans",               stars:4.5, cost:210, discount:0,  description:DESC },
  { id:"h11", imgKey:"9",  place:"home", homeType:"onsale",      style:"Casual", style2:"Party",  type:"T-shirts", name:"One Life Graphic T-shirt",         stars:4.5, cost:260, discount:40, description:DESC },
  { id:"h12", imgKey:"11", place:"home", homeType:"onsale",      style:"Casual", style2:"",       type:"T-shirts", name:"Polo with Contrast Trims",         stars:4,   cost:212, discount:20, description:DESC },
  { id:"h13", imgKey:"2",  place:"home", homeType:"onsale",      style:"Formal", style2:"Casual", type:"Jeans",    name:"Skinny Fit Jeans",                 stars:3.5, cost:240, discount:20, description:DESC },
  { id:"h14", imgKey:"5",  place:"home", homeType:"onsale",      style:"Formal", style2:"",       type:"Shirts",   name:"Vertical Striped Shirt",           stars:5,   cost:212, discount:20, description:DESC },
  { id:"h15", imgKey:"14", place:"home", homeType:"onsale",      style:"Casual", style2:"",       type:"T-shirts", name:"Black Striped T-shirt",            stars:5,   cost:120, discount:30, description:DESC },
  { id:"h16", imgKey:"4",  place:"home", homeType:"onsale",      style:"Casual", style2:"Party",  type:"T-shirts", name:"Sleeve Striped T-shirt",           stars:4.5, cost:130, discount:30, description:DESC },
  { id:"h17", imgKey:"7",  place:"home", homeType:"onsale",      style:"Party",  style2:"",       type:"Shorts",   name:"Loose Fit Bermuda Shorts",         stars:4.5, cost:240, discount:20, description:DESC },
  { id:"h18", imgKey:"15", place:"home", homeType:"onsale",      style:"Party",  style2:"",       type:"Shorts",   name:"Relaxed Fit Twill Utility Shorts", stars:5,   cost:260, discount:10, description:DESC },
];

export const shopProducts: Product[] = [
  { id:"s1",  imgKey:"1",  place:"shop", style:"Casual", style2:"Party",  type:"T-shirts", name:"T-shirt with Tape Details",        stars:4.5, cost:120, discount:0,  description:DESC, colors:["10","9","4","6"] },
  { id:"s2",  imgKey:"4",  place:"shop", style:"Casual", style2:"Party",  type:"T-shirts", name:"Sleeve Striped T-shirt",           stars:4.5, cost:130, discount:30, description:DESC, colors:["10","8","7","5"] },
  { id:"s3",  imgKey:"6",  place:"shop", style:"Casual", style2:"Party",  type:"T-shirts", name:"Courage Graphic T-shirt",          stars:4,   cost:145, discount:0,  description:DESC, colors:["9","2","11","12"] },
  { id:"s4",  imgKey:"9",  place:"shop", style:"Casual", style2:"Party",  type:"T-shirts", name:"One Life Graphic T-shirt",         stars:4.5, cost:260, discount:40, description:DESC, colors:["11","9","6","1"] },
  { id:"s5",  imgKey:"11", place:"shop", style:"Casual", style2:"",       type:"T-shirts", name:"Polo with Contrast Trims",         stars:4,   cost:212, discount:20, description:DESC, colors:["10","3","4","9"] },
  { id:"s6",  imgKey:"12", place:"shop", style:"Casual", style2:"",       type:"T-shirts", name:"Gradient Graphic T-shirt",         stars:3.5, cost:145, discount:0,  description:DESC, colors:["12","8","6","11"] },
  { id:"s7",  imgKey:"13", place:"shop", style:"Casual", style2:"",       type:"T-shirts", name:"Polo with Tipping Details",        stars:4.5, cost:180, discount:0,  description:DESC, colors:["10","4","9","7"] },
  { id:"s8",  imgKey:"14", place:"shop", style:"Casual", style2:"",       type:"T-shirts", name:"Black Striped T-shirt",            stars:5,   cost:120, discount:30, description:DESC, colors:["9","10","2","4"] },
  { id:"s9",  imgKey:"3",  place:"shop", style:"Formal", style2:"Party",  type:"Shirts",   name:"Checkered Shirt",                  stars:4.5, cost:180, discount:0,  description:DESC, colors:["10","1","9","3"] },
  { id:"s10", imgKey:"5",  place:"shop", style:"Formal", style2:"",       type:"Shirts",   name:"Vertical Striped Shirt",           stars:5,   cost:212, discount:20, description:DESC, colors:["7","10","8","3"] },
  { id:"s11", imgKey:"2",  place:"shop", style:"Formal", style2:"Casual", type:"Jeans",    name:"Skinny Fit Jeans",                 stars:3.5, cost:240, discount:20, description:DESC, colors:["4","9","3","2"] },
  { id:"s12", imgKey:"8",  place:"shop", style:"Formal", style2:"",       type:"Jeans",    name:"Faded Skinny Jeans",               stars:4.5, cost:210, discount:0,  description:DESC, colors:["4","1","8","9"] },
  { id:"s13", imgKey:"7",  place:"shop", style:"Party",  style2:"",       type:"Shorts",   name:"Loose Fit Bermuda Shorts",         stars:4.5, cost:240, discount:20, description:DESC, colors:["1","3","9","11"] },
  { id:"s14", imgKey:"15", place:"shop", style:"Party",  style2:"",       type:"Shorts",   name:"Relaxed Fit Twill Utility Shorts", stars:5,   cost:260, discount:10, description:DESC, colors:["5","1","7","4"] },
];

export const allProducts = [...homeProducts, ...shopProducts];

export function findProduct(name: string) {
  const slug = name.replace(/[^a-zA-Z]/g, "").toLowerCase();
  return allProducts.find(
    (p) => p.name.replace(/[^a-zA-Z]/g, "").toLowerCase() === slug
  );
}

export const testimonials = [
  { name: "Sarah M.", stars: 5, review: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations." },
  { name: "Alex K.",  stars: 5, review: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions." },
  { name: "James L.", stars: 5, review: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends." },
  { name: "Moeen",    stars: 5, review: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends." },
  { name: "Samantha D.", stars: 5, review: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations." },
];
