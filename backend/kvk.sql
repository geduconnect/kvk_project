-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2025 at 08:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kvk`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT 1,
  `image` varchar(255) DEFAULT NULL,
  `addedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `image`, `created_at`) VALUES
(1, 'Kharif Crops', '/uploads/1762183817801_kharif-crops.png', '2025-11-03 21:00:17'),
(2, 'Rabi Crops', '/uploads/1762183833894_Rabi-crops.png', '2025-11-03 21:00:33'),
(3, 'Vegetable Seeds', '/uploads/1762183853067_vegetable.png', '2025-11-03 21:00:53'),
(4, 'Fertilizers', '/uploads/1762183871889_2.png', '2025-11-03 21:01:11'),
(5, 'Pesticides', '/uploads/1762183888846_pesticides.png', '2025-11-03 21:01:28'),
(6, 'Sprayers', '/uploads/1762183911154_IMG-20241024-WA0025.jpg', '2025-11-03 21:01:51'),
(7, 'Pipes', '/uploads/1762183959457_pipes.png', '2025-11-03 21:02:39'),
(8, 'Pumps and Machineries', '/uploads/1762183977053_pumps.jpeg', '2025-11-03 21:02:57'),
(9, 'Hardware Products', '/uploads/1762184019713_hardware.png', '2025-11-03 21:03:39');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `customerName` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `pincode` varchar(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `orderDate` datetime DEFAULT current_timestamp(),
  `totalCost` decimal(10,2) NOT NULL,
  `status` enum('Pending','Processing','Shipped','Delivered','Cancelled') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customerId`, `orderDate`, `totalCost`, `status`) VALUES
(2, 2, '2025-11-01 10:30:00', 2999.99, 'Pending'),
(3, 2, '2025-10-25 15:10:00', 1599.50, 'Delivered'),
(4, 2, '2025-10-20 12:45:00', 899.00, 'Shipped'),
(5, 2, '2025-09-28 09:15:00', 2499.00, 'Cancelled'),
(6, 2, '2025-11-02 08:30:00', 499.00, 'Processing'),
(7, 2, '2025-11-01 11:00:00', 199.99, 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `orderId`, `description`, `amount`) VALUES
(15, 2, 'Smart Watch', 1599.50),
(16, 3, 'Wireless Mouse', 899.00),
(17, 4, 'Gaming Keyboard', 2499.00),
(18, 5, 'Phone Case', 499.00),
(19, 6, 'USB Cable', 199.99);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `oldPrice` decimal(10,2) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock` int(11) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `size` varchar(50) DEFAULT NULL,
  `weight` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `mfg` varchar(100) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `life` varchar(50) DEFAULT NULL,
  `is_daily_deal` tinyint(1) DEFAULT 0,
  `daily_deal_price` decimal(10,2) DEFAULT NULL,
  `daily_deal_end` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `is_popular` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `brand`, `description`, `category_id`, `oldPrice`, `price`, `stock`, `status`, `images`, `size`, `weight`, `type`, `mfg`, `tags`, `life`, `is_daily_deal`, `daily_deal_price`, `daily_deal_end`, `createdAt`, `is_popular`) VALUES
(1, 'Pumps 0.5 HP', 'LUBI', 'Lubi pump 0.5 HP', 8, 7500.00, 6500.00, 50, '', '[\"/uploads/1762184072085_pumps.png\"]', NULL, NULL, NULL, NULL, NULL, NULL, 1, 6550.00, NULL, '2025-11-03 21:04:32', 0),
(2, 'DAP', 'INDO RAMA', 'Dap 45 kg indo rama', 4, 1500.00, 1600.00, 500, '', '[\"/uploads/1762184119188_dap.jpeg\"]', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1550.00, NULL, '2025-11-03 21:05:19', 0),
(3, 'Urea', 'Bharat urea', 'Bharat Urea 45 kg slim', 4, 450.00, 420.00, 500, '', '[\"/uploads/1762184176728_images.jpeg\"]', NULL, NULL, NULL, NULL, NULL, NULL, 1, 400.00, NULL, '2025-11-03 21:06:16', 0),
(4, 'Pesticide', 'UPL', 'UPL Insecticides', 5, 150.00, 120.00, 50, '', '[\"/uploads/1762184214056_pesticides.png\"]', NULL, NULL, NULL, NULL, NULL, NULL, 1, 100.00, NULL, '2025-11-03 21:06:54', 0),
(5, 'Rabi Crops', 'JK Seeds', 'JK Wheat 20 kg HYbrid Wheat', 2, 2000.00, 2500.00, 50, '', '[\"/uploads/1762184276735_Rabi-crops.png\"]', NULL, NULL, NULL, NULL, NULL, NULL, 1, 2550.00, NULL, '2025-11-03 21:07:56', 0),
(6, 'Kharif Crops', 'Bayer Seeds', 'Bayer 6444 Gold 1 kg', 1, 350.00, 340.00, 1000, '', '[\"/uploads/1762184328518_kharif-crops.png\"]', NULL, NULL, NULL, NULL, NULL, NULL, 1, 300.00, NULL, '2025-11-03 21:08:48', 1),
(7, 'Tomato seeds', 'Nuziveedu Seeds', 'Tomato 10 g Nuziveedu Hybrid', 3, 400.00, 450.00, 800, '', '[\"/uploads/1762184372095_vegetable.png\"]', NULL, NULL, NULL, NULL, NULL, NULL, 1, 430.00, NULL, '2025-11-03 21:09:32', 1),
(8, 'Sprayers', 'UNknown', 'Sprayers 7.5 litre', 6, 800.00, 780.00, 50, '', '[\"/uploads/1762184445219_IMG-20241024-WA0029.jpg\"]', NULL, NULL, NULL, NULL, NULL, NULL, 1, 749.00, NULL, '2025-11-03 21:10:45', 1),
(9, 'Pipes', 'Balaji Pipes', 'Blaji Pipes white 6 kg 100 ft 2\" ', 7, 1000.00, 1200.00, 500, '', '[\"/uploads/1762184497006_IMG-20241024-WA0052.jpg\"]', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1050.00, NULL, '2025-11-03 21:11:37', 1),
(10, '15 19 rinch ', 'Unknown', '15 - 19 rinch for all', 9, 70.00, 50.00, 50, '', '[\"/uploads/1762184555585_hardware.png\"]', NULL, NULL, NULL, NULL, NULL, NULL, 1, 80.00, NULL, '2025-11-03 21:12:35', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `role` enum('admin','vendor','customer') DEFAULT 'customer',
  `state` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `mobile`, `role`, `state`, `city`, `address`, `pincode`, `createdAt`) VALUES
(1, 'Super Admin', 'admin@kvk.com', '$2a$10$lTmcrTF63fm21yn3Pd.af.nBjTuP8S.soT3zx8YItJUhD2NOp.IDe', NULL, 'admin', NULL, NULL, NULL, NULL, '2025-11-03 20:58:17'),
(2, 'MD FARHAN', 'farhan@kvk.com', '$2a$10$IW2choDhRNkR4lh6lb9GDu5pJT1xInNfEOR16JgK/zYZNGDYilItW', '07488210403', 'customer', 'Jharkhand', 'Latehar', 'Tilaiyatand Near Jama Masjid', '829203', '2025-11-03 21:49:59');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_customer_product` (`customerId`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customerId` (`customerId`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderId` (`orderId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
