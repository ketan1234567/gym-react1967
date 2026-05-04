-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 04, 2026 at 02:02 PM
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

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
