-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 04, 2026 at 02:03 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gym_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `role`, `location`, `location_id`) VALUES
(1, 'Admin User', 'admin@gmail.com', '$2a$12$6TLbnCvHjdmUFN.Daj4s9e2RhgyhfZQ5TEbQCcsvTEzjIsQM46f/u', 'admin', NULL, NULL),
(2, 'Manager User', 'manager@gmail.com', '$2a$12$6TLbnCvHjdmUFN.Daj4s9e2RhgyhfZQ5TEbQCcsvTEzjIsQM46f/u', 'manager', 'Kharadi', NULL),
(3, 'Manager2', 'manager2@gmail.com', '$2a$12$fomxPzblCVmyRX7J9cQp8OqC4jQXNF5rRngJzVO/hM2MiElN6fYL2', 'manager', 'Kalyani Nagar', NULL),
(4, 'Manager3', 'manager3@gmail.com', '$2a$12$fomxPzblCVmyRX7J9cQp8OqC4jQXNF5rRngJzVO/hM2MiElN6fYL2', 'manager', 'Magarpatta', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `attendancelogs`
--

CREATE TABLE `attendancelogs` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(255) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `check_in_time` datetime DEFAULT NULL,
  `check_out_time` datetime DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendancelogs`
--

INSERT INTO `attendancelogs` (`id`, `employee_id`, `location_id`, `check_in_time`, `check_out_time`, `duration`, `date`, `createdAt`, `updatedAt`) VALUES
(1, 'EMP001', NULL, '2026-04-30 19:02:40', '2026-05-04 00:32:01', 4649, '2026-05-01', '2026-04-30 19:02:40', '2026-05-04 00:32:01'),
(10, 'EMP003', 3, '2026-05-03 00:48:57', '2026-05-03 02:19:02', 90, '2026-05-03', '2026-05-03 00:48:57', '2026-05-03 02:19:02'),
(11, 'EMP005', 3, '2026-05-03 02:31:38', '2026-05-03 02:53:01', 21, '2026-05-03', '2026-05-03 02:31:38', '2026-05-03 02:53:01'),
(12, 'EMP001', 3, '2026-05-03 03:11:00', NULL, NULL, '2026-05-03', '2026-05-03 03:11:00', '2026-05-03 03:11:00'),
(14, 'EMP009', 4, '2026-05-03 22:46:43', '2026-05-03 22:50:03', 3, '2026-05-04', '2026-05-03 22:46:43', '2026-05-03 22:50:03'),
(15, 'EMP008', 4, '2026-05-03 22:52:14', '2026-05-03 23:03:10', 10, '2026-05-04', '2026-05-03 22:52:14', '2026-05-03 23:03:10'),
(16, 'EMP010', 4, '2026-05-04 00:32:58', '2026-05-04 00:52:44', 19, '2026-05-04', '2026-05-04 00:32:58', '2026-05-04 00:52:44'),
(17, 'EMP003', 4, '2026-05-04 00:56:10', '2026-05-04 01:12:28', 16, '2026-05-04', '2026-05-04 00:56:10', '2026-05-04 01:12:28'),
(18, 'EMP002', 4, '2026-05-04 01:01:04', '2026-05-04 11:00:34', 599, '2026-05-04', '2026-05-04 01:01:04', '2026-05-04 11:00:34');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `employee_id`, `name`, `department`, `status`) VALUES
(1, 'EMP001', 'Amit Sharma', 'IT', 'Active'),
(2, 'EMP002', 'Rahul Verma', 'HR', 'Active'),
(3, 'EMP003', 'Pooja Singh', 'Finance', 'Active'),
(4, 'EMP004', 'Karan Patel', 'IT', 'Inactive'),
(5, 'EMP005', 'Neha Joshi', 'Admin', 'Active'),
(6, 'EMP006', 'Arjun Mehta', 'IT', 'Active'),
(7, 'EMP007', 'Sneha Kulkarni', 'HR', 'Active'),
(8, 'EMP008', 'Rohit Gupta', 'Finance', 'Inactive'),
(9, 'EMP009', 'Priya Desai', 'Admin', 'Active'),
(10, 'EMP010', 'Vikas Yadav', 'IT', 'Active'),
(11, 'EMP011', 'Anjali Nair', 'HR', 'Active'),
(12, 'EMP012', 'Sachin Patil', 'Finance', 'Active'),
(13, 'EMP013', 'Kavita Reddy', 'Admin', 'Inactive'),
(14, 'EMP014', 'Deepak Kumar', 'IT', 'Active'),
(15, 'EMP015', 'Meena Shah', 'HR', 'Active'),
(16, 'EMP016', 'Ajay Singh', 'Finance', 'Active'),
(17, 'EMP017', 'Ritu Jain', 'Admin', 'Active'),
(18, 'EMP018', 'Manish Gupta', 'IT', 'Inactive'),
(19, 'EMP019', 'Swati Joshi', 'HR', 'Active'),
(20, 'EMP020', 'Nitin Agarwal', 'Finance', 'Active'),
(21, 'EMP021', 'Komal Patel', 'Admin', 'Active'),
(22, 'EMP022', 'Sandeep Verma', 'IT', 'Active'),
(23, 'EMP023', 'Rekha Sharma', 'HR', 'Inactive'),
(24, 'EMP024', 'Ashish Mehta', 'Finance', 'Active'),
(25, 'EMP025', 'Preeti Singh', 'Admin', 'Active'),
(26, 'EMP026', 'Gaurav Yadav', 'IT', 'Active'),
(27, 'EMP027', 'Sonali Kulkarni', 'HR', 'Active'),
(28, 'EMP028', 'Ramesh Gupta', 'Finance', 'Inactive'),
(29, 'EMP029', 'Pallavi Desai', 'Admin', 'Active'),
(30, 'EMP030', 'Varun Nair', 'IT', 'Active'),
(31, 'EMP031', 'Asha Patil', 'HR', 'Active'),
(32, 'EMP032', 'Kiran Shah', 'Finance', 'Active'),
(33, 'EMP033', 'Sunil Reddy', 'Admin', 'Inactive'),
(34, 'EMP034', 'Ankit Kumar', 'IT', 'Active'),
(35, 'EMP035', 'Seema Jain', 'HR', 'Active'),
(36, 'EMP036', 'Prakash Singh', 'Finance', 'Active'),
(37, 'EMP037', 'Divya Gupta', 'Admin', 'Active'),
(38, 'EMP038', 'Harsh Patel', 'IT', 'Inactive'),
(39, 'EMP039', 'Neeraj Joshi', 'HR', 'Active'),
(40, 'EMP040', 'Rajesh Mehta', 'Finance', 'Active'),
(41, 'EMP041', 'Tina Shah', 'Admin', 'Active'),
(42, 'EMP042', 'Vinay Verma', 'IT', 'Active'),
(43, 'EMP043', 'Sonia Singh', 'HR', 'Inactive'),
(44, 'EMP044', 'Amit Agarwal', 'Finance', 'Active'),
(45, 'EMP045', 'Ruchi Desai', 'Admin', 'Active'),
(46, 'EMP046', 'Kunal Yadav', 'IT', 'Active'),
(47, 'EMP047', 'Poonam Nair', 'HR', 'Active'),
(48, 'EMP048', 'Ajit Patil', 'Finance', 'Inactive'),
(49, 'EMP049', 'Reena Gupta', 'Admin', 'Active'),
(50, 'EMP050', 'Mohit Sharma', 'IT', 'Active'),
(51, 'EMP051', 'Geeta Joshi', 'HR', 'Active'),
(52, 'EMP052', 'Suresh Mehta', 'Finance', 'Active'),
(53, 'EMP053', 'Kiran Singh', 'Admin', 'Inactive'),
(54, 'EMP054', 'Alok Verma', 'IT', 'Active'),
(55, 'EMP055', 'Nisha Reddy', 'HR', 'Active'),
(56, 'EMP056', 'Rajiv Kumar', 'Finance', 'Active'),
(57, 'EMP057', 'Payal Shah', 'Admin', 'Active'),
(58, 'EMP058', 'Abhishek Gupta', 'IT', 'Inactive'),
(59, 'EMP059', 'Sapna Jain', 'HR', 'Active'),
(60, 'EMP060', 'Anil Yadav', 'Finance', 'Active'),
(61, 'EMP061', 'Shweta Desai', 'Admin', 'Active'),
(62, 'EMP062', 'Manoj Patil', 'IT', 'Active'),
(63, 'EMP063', 'Sejal Nair', 'HR', 'Inactive'),
(64, 'EMP064', 'Pravin Sharma', 'Finance', 'Active'),
(65, 'EMP065', 'Rohini Singh', 'Admin', 'Active'),
(66, 'EMP066', 'Vijay Mehta', 'IT', 'Active'),
(67, 'EMP067', 'Anu Gupta', 'HR', 'Active'),
(68, 'EMP068', 'Dev Patel', 'Finance', 'Inactive'),
(69, 'EMP069', 'Mehul Shah', 'Admin', 'Active'),
(70, 'EMP070', 'Rakesh Verma', 'IT', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `name`) VALUES
(1, 'Kalyani Nagar'),
(2, 'Kharadi'),
(3, 'Magarpatta');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `email_32` (`email`),
  ADD UNIQUE KEY `email_33` (`email`),
  ADD UNIQUE KEY `email_34` (`email`),
  ADD UNIQUE KEY `email_35` (`email`),
  ADD UNIQUE KEY `email_36` (`email`),
  ADD UNIQUE KEY `email_37` (`email`),
  ADD UNIQUE KEY `email_38` (`email`),
  ADD UNIQUE KEY `email_39` (`email`),
  ADD UNIQUE KEY `email_40` (`email`),
  ADD UNIQUE KEY `email_41` (`email`),
  ADD UNIQUE KEY `email_42` (`email`),
  ADD UNIQUE KEY `email_43` (`email`),
  ADD UNIQUE KEY `email_44` (`email`),
  ADD UNIQUE KEY `email_45` (`email`),
  ADD UNIQUE KEY `email_46` (`email`),
  ADD UNIQUE KEY `email_47` (`email`),
  ADD UNIQUE KEY `email_48` (`email`),
  ADD UNIQUE KEY `email_49` (`email`),
  ADD UNIQUE KEY `email_50` (`email`),
  ADD UNIQUE KEY `email_51` (`email`),
  ADD UNIQUE KEY `email_52` (`email`),
  ADD UNIQUE KEY `email_53` (`email`),
  ADD UNIQUE KEY `email_54` (`email`),
  ADD UNIQUE KEY `email_55` (`email`),
  ADD UNIQUE KEY `email_56` (`email`),
  ADD UNIQUE KEY `email_57` (`email`),
  ADD UNIQUE KEY `email_58` (`email`),
  ADD UNIQUE KEY `email_59` (`email`),
  ADD UNIQUE KEY `email_60` (`email`),
  ADD UNIQUE KEY `email_61` (`email`),
  ADD UNIQUE KEY `email_62` (`email`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `attendancelogs`
--
ALTER TABLE `attendancelogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employee_id` (`employee_id`),
  ADD UNIQUE KEY `employee_id_2` (`employee_id`),
  ADD UNIQUE KEY `employee_id_3` (`employee_id`),
  ADD UNIQUE KEY `employee_id_4` (`employee_id`),
  ADD UNIQUE KEY `employee_id_5` (`employee_id`),
  ADD UNIQUE KEY `employee_id_6` (`employee_id`),
  ADD UNIQUE KEY `employee_id_7` (`employee_id`),
  ADD UNIQUE KEY `employee_id_8` (`employee_id`),
  ADD UNIQUE KEY `employee_id_9` (`employee_id`),
  ADD UNIQUE KEY `employee_id_10` (`employee_id`),
  ADD UNIQUE KEY `employee_id_11` (`employee_id`),
  ADD UNIQUE KEY `employee_id_12` (`employee_id`),
  ADD UNIQUE KEY `employee_id_13` (`employee_id`),
  ADD UNIQUE KEY `employee_id_14` (`employee_id`),
  ADD UNIQUE KEY `employee_id_15` (`employee_id`),
  ADD UNIQUE KEY `employee_id_16` (`employee_id`),
  ADD UNIQUE KEY `employee_id_17` (`employee_id`),
  ADD UNIQUE KEY `employee_id_18` (`employee_id`),
  ADD UNIQUE KEY `employee_id_19` (`employee_id`),
  ADD UNIQUE KEY `employee_id_20` (`employee_id`),
  ADD UNIQUE KEY `employee_id_21` (`employee_id`),
  ADD UNIQUE KEY `employee_id_22` (`employee_id`),
  ADD UNIQUE KEY `employee_id_23` (`employee_id`),
  ADD UNIQUE KEY `employee_id_24` (`employee_id`),
  ADD UNIQUE KEY `employee_id_25` (`employee_id`),
  ADD UNIQUE KEY `employee_id_26` (`employee_id`),
  ADD UNIQUE KEY `employee_id_27` (`employee_id`),
  ADD UNIQUE KEY `employee_id_28` (`employee_id`),
  ADD UNIQUE KEY `employee_id_29` (`employee_id`),
  ADD UNIQUE KEY `employee_id_30` (`employee_id`),
  ADD UNIQUE KEY `employee_id_31` (`employee_id`),
  ADD UNIQUE KEY `employee_id_32` (`employee_id`),
  ADD UNIQUE KEY `employee_id_33` (`employee_id`),
  ADD UNIQUE KEY `employee_id_34` (`employee_id`),
  ADD UNIQUE KEY `employee_id_35` (`employee_id`),
  ADD UNIQUE KEY `employee_id_36` (`employee_id`),
  ADD UNIQUE KEY `employee_id_37` (`employee_id`),
  ADD UNIQUE KEY `employee_id_38` (`employee_id`),
  ADD UNIQUE KEY `employee_id_39` (`employee_id`),
  ADD UNIQUE KEY `employee_id_40` (`employee_id`),
  ADD UNIQUE KEY `employee_id_41` (`employee_id`),
  ADD UNIQUE KEY `employee_id_42` (`employee_id`),
  ADD UNIQUE KEY `employee_id_43` (`employee_id`),
  ADD UNIQUE KEY `employee_id_44` (`employee_id`),
  ADD UNIQUE KEY `employee_id_45` (`employee_id`),
  ADD UNIQUE KEY `employee_id_46` (`employee_id`),
  ADD UNIQUE KEY `employee_id_47` (`employee_id`),
  ADD UNIQUE KEY `employee_id_48` (`employee_id`),
  ADD UNIQUE KEY `employee_id_49` (`employee_id`),
  ADD UNIQUE KEY `employee_id_50` (`employee_id`),
  ADD UNIQUE KEY `employee_id_51` (`employee_id`),
  ADD UNIQUE KEY `employee_id_52` (`employee_id`),
  ADD UNIQUE KEY `employee_id_53` (`employee_id`),
  ADD UNIQUE KEY `employee_id_54` (`employee_id`),
  ADD UNIQUE KEY `employee_id_55` (`employee_id`),
  ADD UNIQUE KEY `employee_id_56` (`employee_id`),
  ADD UNIQUE KEY `employee_id_57` (`employee_id`),
  ADD UNIQUE KEY `employee_id_58` (`employee_id`),
  ADD UNIQUE KEY `employee_id_59` (`employee_id`),
  ADD UNIQUE KEY `employee_id_60` (`employee_id`),
  ADD UNIQUE KEY `employee_id_61` (`employee_id`),
  ADD UNIQUE KEY `employee_id_62` (`employee_id`),
  ADD UNIQUE KEY `employee_id_63` (`employee_id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `attendancelogs`
--
ALTER TABLE `attendancelogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `Admins_location_id_foreign_idx` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_10` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_11` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_12` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_13` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_14` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_15` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_16` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_17` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_18` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_19` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_20` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_21` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_22` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_23` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_24` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_25` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_26` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_27` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_28` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_29` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_3` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_30` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_31` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_32` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_33` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_34` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_35` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_36` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_37` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_38` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_39` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_4` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_40` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_41` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_42` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_43` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_44` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_45` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_46` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_47` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_48` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_49` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_5` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_6` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_7` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_8` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admins_ibfk_9` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `attendancelogs`
--
ALTER TABLE `attendancelogs`
  ADD CONSTRAINT `attendancelogs_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_10` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_11` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_12` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_13` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_14` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_15` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_16` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_17` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_18` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_19` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_20` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_21` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_22` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_23` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_24` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_25` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_26` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_27` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_28` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_29` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_30` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_31` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_32` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_33` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_34` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_35` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_36` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_37` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_38` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_39` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_4` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_40` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_41` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_42` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_43` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_44` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_45` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_46` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_47` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_48` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_49` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_5` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_50` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_51` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_52` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_53` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_54` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_55` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_56` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_57` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_58` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_59` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_6` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_60` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_61` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_62` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_63` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_64` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_65` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_66` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_67` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_68` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_69` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_7` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_70` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_71` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_72` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_73` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_74` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_75` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_76` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_77` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_78` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_79` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_8` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_80` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_81` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_82` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_83` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_84` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_85` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_86` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_87` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_88` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_89` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_9` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_90` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_91` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_92` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_93` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attendancelogs_ibfk_94` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
