import img1 from "../../../assets/img/products/IMG-20241024-WA0038.jpg";
import img2 from "../../../assets/img/products/IMG-20241024-WA0039.jpg";
import img3 from "../../../assets/img/products/IMG-20241024-WA0040.jpg";
import imgcat6 from "../../../assets/img/building.webp"
import imgcat4 from "../../../assets/img/fertilizers.webp"
import imgcat7 from "../../../assets/img/hardware.png"
import imgcat2 from "../../../assets/img/kharif-crops.png"
import imgcat1 from "../../../assets/img/Rabi-crops.png"
import imgcat5 from "../../../assets/img/pesticides.png"
import imgcat3 from "../../../assets/img/vegetable.png"
import imgcat8 from "../../../assets/img/pumps.png"
import imgcat9 from "../../../assets/img/pipes.png"
export const listingcategories = [
  {
    id: 1,
    categoryitem: "Kharif Crops",
    imgcat: imgcat1,
    catproducts1: [
      {
        id: 1,
        title: "Smartphone",
        name: "Kharif Crops",
        pdescription: "Latest model with advanced features.",
        vendorname: "abc",
        orgprice: "$699",
        disprice: "$699",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage:
          "/src/assets/products/WhatsApp Image 2024-09-22 at 23.22.46.jpeg",
      },
      {
        id: 2,
        title: "Laptop",
        name: "Computers",
        pdescription: "Lightweight laptop with long battery life.",
        vendorname: "abc",
        orgprice: "$999",
        disprice: "$999",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage:
          "/src/assets/products/WhatsApp Image 2024-09-22 at 23.23.14.jpeg",
      },
      {
        id: 3,
        title: "Smartwatch",
        name: "Computers",
        pdescription: "Track your fitness and notifications.",
        vendorname: "abc",
        orgprice: "$199",
        disprice: "$199",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage:
          "/src/assets/products/WhatsApp Image 2024-09-22 at 23.23.15.jpeg",
      },
      {
        id: 4,
        title: "Camera",
        name: "Computers",
        pdescription: "Capture high-quality photos and videos.",
        vendorname: "abc",
        orgprice: "$499",
        disprice: "$499",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage:
          "/src/assets/products/WhatsApp Image 2024-09-22 at 23.23.24.jpeg",
      },
      {
        id: 5,
        title: "Headphones",
        name: "Computers",
        pdescription: "Noise-cancelling over-ear headphones.",
        vendorname: "abc",
        orgprice: "$299",
        disprice: "$299",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage:
          "/src/assets/products/WhatsApp Image 2024-09-22 at 23.23.28.jpeg",
      },
      {
        id: 6,
        title: "Headphones",
        name: "Computers",
        pdescription: "Noise-cancelling over-ear headphones.",
        vendorname: "abc",
        orgprice: "$299",
        disprice: "$299",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage:
          "/src/assets/products/WhatsApp Image 2024-09-22 at 23.24.03.jpeg",
      },
      // Add 3 more products here...
    ],
  },
  {
    id: 2,
    categoryitem: "Rabi Crops",
    imgcat: imgcat2,
    catproducts1: [
      {
        id: 1,
        title: "T-shirt",
        name: "Clothing",
        pdescription: "Cotton t-shirt available in various sizes.",
        vendorname: "abc",
        orgprice: "$19",
        disprice: "$19",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage:
          "/src/assets/products/WhatsApp Image 2024-09-22 at 23.24.03.jpeg",
      },
      {
        id: 2,
        title: "Jeans",
        name: "Computers",
        pdescription: "Comfortable jeans for everyday wear.",
        vendorname: "abc",
        orgprice: "$49",
        disprice: "$49",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage:
          "/src/assets/products/WhatsApp Image 2024-09-22 at 23.23.28.jpeg",
      },
      // Add 3 more products here...
    ],
  },
  {
    id: 3,
    categoryitem: "Vegetable & Fruit Seeds",
    imgcat: imgcat3,
    catproducts1: [
      {
        id: 1,
        title: "T-shirt",
        name: "Furniture",
        pdescription: "Cotton t-shirt available in various sizes.",
        vendorname: "abc",
        orgprice: "$19",
        disprice: "$19",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage:
          "/src/assets/products/WhatsApp Image 2024-09-22 at 23.23.24.jpeg",
      },
      {
        id: 2,
        title: "Jeans",
        name: "Computers",
        pdescription: "Comfortable jeans for everyday wear.",
        vendorname: "abc",
        orgprice: "$49",
        disprice: "$49",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage:
          "/src/assets/products/WhatsApp Image 2024-09-22 at 23.23.14.jpeg",
      },
      // Add 3 more products here...
    ],
  },
  {
    id: 4,
    categoryitem: "Pesticides",
    imgcat: imgcat4,
    catproducts1: [
      {
        id: 1,
        title: "T-shirt",
        name: "Mobile",
        pdescription: "Cotton t-shirt available in various sizes.",
        vendorname: "abc",
        orgprice: "$19",
        disprice: "$19",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: "https://example.com/tshirt.jpg",
      },
      {
        id: 2,
        title: "Jeans",
        name: "Computers",
        pdescription: "Comfortable jeans for everyday wear.",
        vendorname: "abc",
        orgprice: "$49",
        disprice: "$49",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: "https://example.com/jeans.jpg",
      },
      // Add 3 more products here...
    ],
  },
  {
    id: 5,
    categoryitem: "Insecticides",
    imgcat: imgcat5,
    catproducts1: [
      {
        id: 1,
        title: "T-shirt",
        name: "Mobile Accessories",
        pdescription: "Cotton t-shirt available in various sizes.",
        vendorname: "abc",
        orgprice: "$19",
        disprice: "$19",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: "https://example.com/tshirt.jpg",
      },
      {
        id: 2,
        title: "Jeans",
        name: "Computers",
        pdescription: "Comfortable jeans for everyday wear.",
        vendorname: "abc",
        orgprice: "$49",
        disprice: "$49",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: "https://example.com/jeans.jpg",
      },
      // Add 3 more products here...
    ],
  },
  {
    id: 6,
    categoryitem: "Building Materials",
    imgcat: imgcat6,
    catproducts1: [
      {
        id: 1,
        title: "T-shirt",
        name: "Electroller",
        pdescription: "Cotton t-shirt available in various sizes.",
        vendorname: "abc",
        orgprice: "$19",
        disprice: "$19",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: "https://example.com/tshirt.jpg",
      },
      {
        id: 2,
        title: "Jeans",
        name: "Computers",
        pdescription: "Comfortable jeans for everyday wear.",
        vendorname: "abc",
        orgprice: "$49",
        disprice: "$49",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: "https://example.com/jeans.jpg",
      },
      // Add 3 more products here...
    ],
  },
  {
    id: 7,
    categoryitem: "Hardware Products",
    imgcat: imgcat7,
    catproducts1: [
      {
        id: 1,
        title: "T-shirt",
        name: "Office",
        pdescription: "Cotton t-shirt available in various sizes.",
        vendorname: "abc",
        orgprice: "$19",
        disprice: "$19",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: "https://example.com/tshirt.jpg",
      },
      {
        id: 2,
        title: "Jeans",
        name: "Computers",
        pdescription: "Comfortable jeans for everyday wear.",
        vendorname: "abc",
        orgprice: "$49",
        disprice: "$49",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: "https://example.com/jeans.jpg",
      },
      // Add 3 more products here...
    ],
  },
  {
    id: 8,
    categoryitem: "Pumps & Machineries",
    imgcat: imgcat8,
    catproducts1: [
      {
        id: 1,
        title: "T-shirt",
        name: "Study",
        pdescription: "Cotton t-shirt available in various sizes.",
        vendorname: "abc",
        orgprice: "$19",
        disprice: "$19",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: "https://example.com/tshirt.jpg",
      },
      {
        id: 2,
        title: "Jeans",
        name: "Computers",
        pdescription: "Comfortable jeans for everyday wear.",
        vendorname: "abc",
        orgprice: "$49",
        disprice: "$49",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: "https://example.com/jeans.jpg",
      },
      // Add 3 more products here...
    ],
  },
  {
    id: 9,
    categoryitem: "Pipes",
    imgcat: imgcat9,
    catproducts1: [
      {
        id: 1,
        title: "T-shirt",
        name: "Kitchen",
        pdescription: "Cotton t-shirt available in various sizes.",
        vendorname: "abc",
        orgprice: "$19",
        disprice: "$19",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: "https://example.com/tshirt.jpg",
      },
      {
        id: 2,
        title: "Jeans",
        name: "Computers",
        pdescription: "Comfortable jeans for everyday wear.",
        vendorname: "abc",
        orgprice: "$49",
        disprice: "$49",
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: "https://example.com/jeans.jpg",
      },
      // Add 3 more products here...
    ],
  },
];
