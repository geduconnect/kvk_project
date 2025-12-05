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
import imgcat8 from "../../../assets/img/pumps.jpeg"
export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const productData = [
  {
    id: 1,
    imageurl:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    name: "Colorful sneakers",
    orgprice: "$19.99",
    disprice: "$19.99",
    pdescription: "Some text about the product..",
  },
  {
    name: "Colorful sneakers",
    id: 2,
    imageurl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    orgprice: "$21.99",
    disprice: "$21.99",
    pdescription: "Some text about the product..",
  },
  {
    name: "Sport sneakers",
    id: 3,
    imageurl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    orgprice: "$99.99",
    disprice: "$99.99",
    pdescription: "Some text about the product..",
  },
  {
    name: "iWatch",
    id: 4,
    imageurl:
      "https://images.unsplash.com/photo-1610824352934-c10d87b700cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    orgprice: "$14.99",
    disprice: "$14.99",
    pdescription: "Some text about the product..",
  },
  {
    name: "Water Bottle",
    id: 5,
    imageurl:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    orgprice: "$38.99",
    disprice: "$38.99",
    pdescription: "Some text about the product..",
  },
  {
    name: "Vans sneakers",
    id: 6,
    imageurl:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    orgprice: "$149.99",
    disprice: "$149.99",
    pdescription: "Some text about the product..",
  },
  {
    name: "Coco Noir",
    id: 7,
    imageurl:
      "https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTJ8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    orgprice: "$38.99",
    disprice: "$38.99",
    pdescription: "Some text about the product..",
  },
  {
    id: 8,
    imageurl:
      "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2R1Y3RzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    name: "Dove cream",
    orgprice: "$49.99",
    disprice: "$49.99",
    pdescription: "Some text about the product..",
  },
]
export const featuredcategories = [
  {
    id: 1,
    name: 'Rabi Crops',
    imgcat: imgcat1,
    fcproducts: [
      {
        id: 1,
        title: 'Smartphone',
        name: 'Rabi Crops', pdescription: 'Latest model with advanced features.',
        orgprice: '$699',
        disprice: '$699',
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: "/src/assets/img/products/IMG-20241024-WA0016.jpg",
      },
      {
        id: 2,
        title: 'Laptop',
        name: 'Rabi Crops',
        pdescription: 'Lightweight laptop with long battery life.',
        orgprice: '$999',
        disprice: '$999',
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: '/src/assets/img/products/IMG-20241024-WA0017.jpg',
      }, {
        id: 3,
        title: 'Smartwatch',
        name: 'Rabi Crops',
        pdescription: 'Track your fitness and notifications.',
        orgprice: '$199',
        disprice: '$199',
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: '/src/assets/img/products/IMG-20241024-WA0018.jpg',
      },
      {
        id: 4,
        title: 'Camera',
        name: 'Rabi Crops',
        pdescription: 'Capture high-quality photos and videos.',
        orgprice: '$499',
        disprice: '$499',
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: '/src/assets/img/products/IMG-20241024-WA0019.jpg',
      },
      {
        id: 5,
        title: 'Headphones',
        name: 'Rabi Crops',
        pdescription: 'Noise-cancelling over-ear headphones.',
        orgprice: '$299',
        disprice: '$299',
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: '/src/assets/img/products/IMG-20241024-WA0020.jpg',
      },
      {
        id: 6,
        title: 'Headphones',
        name: 'Rabi Crops',
        pdescription: 'Noise-cancelling over-ear headphones.',
        orgprice: '$299',
        disprice: '$299',
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: '/src/assets/img/products/IMG-20241024-WA0021.jpg',
      },
      // Add 3 more products here...
    ],
  },
  {
    id: 2,
    name: 'Kharif Crops',
    imgcat: imgcat2,
    fcproducts: [
      {
        id: 1,
        title: 'T-shirt',
        name: 'Kharif Crops', pdescription: 'Cotton t-shirt available in various sizes.',
        orgprice: '$19',
        disprice: '$19',
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: '/src/assets/img/products/IMG-20241024-WA0022.jpg',
      },
      {
        id: 2,
        title: 'Jeans',
        name: 'Kharif Crops',
        pdescription: 'Comfortable jeans for everyday wear.',
        orgprice: '$49',
        disprice: '$49',
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: '/src/assets/img/products/IMG-20241024-WA0023.jpg',
      },
      // Add 3 more products here...
    ],
  },
  {
    id: 3,
    name: 'Vegetable Seeds',
    imgcat: imgcat3,
    fcproducts: [
      {
        id: 1,
        title: 'T-shirt',
        name: 'Vegetable Seeds', pdescription: 'Cotton t-shirt available in various sizes.',
        orgprice: '$19',
        disprice: '$19',
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: '/src/assets/img/products/IMG-20241024-WA0024.jpg',
      },
      {
        id: 2,
        title: 'Jeans',
        name: 'Vegetable Seeds',
        pdescription: 'Comfortable jeans for everyday wear.',
        orgprice: '$49',
        disprice: '$49',
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: '/src/assets/img/products/IMG-20241024-WA0025.jpg',
      },
      // Add 3 more products here...
    ],
  },
  {
    id: 4,
    name: 'Building Materials',
    imgcat: imgcat4,
    fcproducts: [
      {
        id: 1,
        title: 'T-shirt',
        name: 'Building Materials', pdescription: 'Cotton t-shirt available in various sizes.',
        orgprice: '$19',
        disprice: '$19',
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: '/src/assets/img/products/IMG-20241024-WA0026.jpg',
      },
      {
        id: 2,
        title: 'Jeans',
        name: 'Building Materials',
        pdescription: 'Comfortable jeans for everyday wear.',
        orgprice: '$49',
        disprice: '$49',
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: '/src/assets/img/products/IMG-20241024-WA0027.jpg',
      },
      // Add 3 more products here...
    ],
  },
  {
    id: 5,
    name: 'Fertilizers',
    imgcat: imgcat5,
    fcproducts: [
      {
        id: 1,
        title: 'T-shirt',
        name: 'Fertilizers', pdescription: 'Cotton t-shirt available in various sizes.',
        orgprice: '$19',
        disprice: '$19',
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: '/src/assets/img/products/IMG-20241024-WA0028.jpg',
      },
      {
        id: 2,
        title: 'Jeans',
        name: 'Fertilizers',
        pdescription: 'Comfortable jeans for everyday wear.',
        orgprice: '$49',
        disprice: '$49',
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: '/src/assets/img/products/IMG-20241024-WA0029.jpg',
      },
      // Add 3 more products here...
    ],
  },
  {
    id: 6,
    name: 'Pesticides',
    imgcat: imgcat6,
    fcproducts: [
      {
        id: 1,
        title: 'T-shirt',
        name: 'Pesticides', pdescription: 'Cotton t-shirt available in various sizes.',
        orgprice: '$19',
        disprice: '$19',
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: '/src/assets/img/products/IMG-20241024-WA0030.jpg',
      },
      {
        id: 2,
        title: 'Jeans',
        name: 'Pesticides',
        pdescription: 'Comfortable jeans for everyday wear.',
        orgprice: '$49',
        disprice: '$49',
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: '/src/assets/img/products/IMG-20241024-WA0031.jpg',
      },
      // Add 3 more products here...
    ],
  },
  {
    id: 7,
    name: 'Pumps & Machineries',
    imgcat: imgcat7,
    fcproducts: [
      {
        id: 1,
        title: 'T-shirt',
        name: 'Pumps & Machineries', pdescription: 'Cotton t-shirt available in various sizes.',
        orgprice: '$19',
        disprice: '$19',
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: '/src/assets/img/products/IMG-20241024-WA0032.jpg',
      },
      {
        id: 2,
        title: 'Jeans',
        name: 'Rabi Crops',
        pdescription: 'Comfortable jeans for everyday wear.',
        orgprice: '$49',
        disprice: '$49',
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: '/src/assets/img/products/IMG-20241024-WA0033.jpg',
      },
      // Add 3 more products here...
    ],
  },
  {
    id: 8,
    name: 'Study',
    imgcat: imgcat8,
    fcproducts: [
      {
        id: 1,
        title: 'T-shirt',
        name: 'Study', pdescription: 'Cotton t-shirt available in various sizes.',
        orgprice: '$19',
        disprice: '$19',
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: '/src/assets/img/products/IMG-20241024-WA0034.jpg',
      },
      {
        id: 2,
        title: 'Jeans',
        name: 'Rabi Crops',
        pdescription: 'Comfortable jeans for everyday wear.',
        orgprice: '$49',
        disprice: '$49',
        images: [
          img1, // Example image paths
          img2,
          img3,
        ],
        pimage: '/src/assets/img/products/IMG-20241024-WA0035.jpg',
      },
      // Add 3 more products here...
    ],
  },

  // Add more categories...
];
