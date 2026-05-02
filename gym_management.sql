-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2026 at 01:43 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

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
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','manager') DEFAULT 'manager',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'Admin User', 'admin@gmail.com', '$2a$12$6TLbnCvHjdmUFN.Daj4s9e2RhgyhfZQ5TEbQCcsvTEzjIsQM46f/u', 'admin', '2026-04-30 04:20:22'),
(2, 'Manager User', 'manager@gmail.com', '$2a$12$6TLbnCvHjdmUFN.Daj4s9e2RhgyhfZQ5TEbQCcsvTEzjIsQM46f/u', 'manager', '2026-04-30 04:20:22');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendancelogs`
--

INSERT INTO `attendancelogs` (`id`, `employee_id`, `location_id`, `check_in_time`, `check_out_time`, `duration`, `date`, `createdAt`, `updatedAt`) VALUES
(1, 'EMP001', NULL, '2026-04-30 19:02:40', NULL, NULL, '2026-05-01', '2026-04-30 19:02:40', '2026-04-30 19:02:40'),
(2, 'EMP011', NULL, '2026-04-30 20:05:50', NULL, NULL, '2026-05-01', '2026-04-30 20:05:50', '2026-04-30 20:05:50'),
(3, 'EMP001', NULL, '2026-04-30 21:13:06', NULL, NULL, '2026-05-01', '2026-04-30 21:13:06', '2026-04-30 21:13:06'),
(4, 'EMP010', NULL, '2026-04-30 21:13:24', '2026-04-30 21:26:30', 13, '2026-05-01', '2026-04-30 21:13:25', '2026-04-30 21:26:30'),
(5, 'EMP010', NULL, '2026-04-30 21:14:05', NULL, NULL, '2026-05-01', '2026-04-30 21:14:05', '2026-04-30 21:14:05'),
(6, 'EMP010', NULL, '2026-04-30 21:15:54', NULL, NULL, '2026-05-01', '2026-04-30 21:15:54', '2026-04-30 21:15:54'),
(7, 'EMP010', 1, '2026-04-30 21:16:28', NULL, NULL, '2026-05-01', '2026-04-30 21:16:28', '2026-04-30 21:16:28'),
(8, 'EMP001', 1, '2026-04-30 22:22:14', NULL, NULL, '2026-05-01', '2026-04-30 22:22:14', '2026-04-30 22:22:14'),
(9, 'EMP003', 1, '2026-05-01 14:45:03', '2026-05-01 14:46:48', 1, '2026-05-01', '2026-05-01 14:45:03', '2026-05-01 14:46:48');

-- --------------------------------------------------------

--
-- Table structure for table `attendance_logs`
--

CREATE TABLE `attendance_logs` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `location_id` int(11) NOT NULL,
  `check_in_time` datetime NOT NULL,
  `check_out_time` datetime DEFAULT NULL,
  `duration_minutes` int(11) DEFAULT NULL,
  `status` enum('Active','Completed','Exceeded','No Checkout') DEFAULT 'Active',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `id` int(11) NOT NULL,
  `action` varchar(100) DEFAULT NULL,
  `employee_id` varchar(50) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `employee_id`, `name`, `department`, `status`, `created_at`) VALUES
(1, 'EMP001', 'Amit Sharma', 'IT', 'Active', '2026-04-30 23:59:31'),
(2, 'EMP002', 'Rahul Verma', 'HR', 'Active', '2026-04-30 23:59:31'),
(3, 'EMP003', 'Pooja Singh', 'Finance', 'Active', '2026-04-30 23:59:31'),
(4, 'EMP004', 'Karan Patel', 'IT', 'Inactive', '2026-04-30 23:59:31'),
(5, 'EMP005', 'Neha Joshi', 'Admin', 'Active', '2026-04-30 23:59:31'),
(6, 'EMP006', 'Arjun Mehta', 'IT', 'Active', '2026-04-30 23:59:31'),
(7, 'EMP007', 'Sneha Kulkarni', 'HR', 'Active', '2026-04-30 23:59:31'),
(8, 'EMP008', 'Rohit Gupta', 'Finance', 'Inactive', '2026-04-30 23:59:31'),
(9, 'EMP009', 'Priya Desai', 'Admin', 'Active', '2026-04-30 23:59:31'),
(10, 'EMP010', 'Vikas Yadav', 'IT', 'Active', '2026-04-30 23:59:31'),
(11, 'EMP011', 'Anjali Nair', 'HR', 'Active', '2026-04-30 23:59:31'),
(12, 'EMP012', 'Sachin Patil', 'Finance', 'Active', '2026-04-30 23:59:31'),
(13, 'EMP013', 'Kavita Reddy', 'Admin', 'Inactive', '2026-04-30 23:59:31'),
(14, 'EMP014', 'Deepak Kumar', 'IT', 'Active', '2026-04-30 23:59:31'),
(15, 'EMP015', 'Meena Shah', 'HR', 'Active', '2026-04-30 23:59:31'),
(16, 'EMP016', 'Ajay Singh', 'Finance', 'Active', '2026-04-30 23:59:31'),
(17, 'EMP017', 'Ritu Jain', 'Admin', 'Active', '2026-04-30 23:59:31'),
(18, 'EMP018', 'Manish Gupta', 'IT', 'Inactive', '2026-04-30 23:59:31'),
(19, 'EMP019', 'Swati Joshi', 'HR', 'Active', '2026-04-30 23:59:31'),
(20, 'EMP020', 'Nitin Agarwal', 'Finance', 'Active', '2026-04-30 23:59:31'),
(21, 'EMP021', 'Komal Patel', 'Admin', 'Active', '2026-04-30 23:59:31'),
(22, 'EMP022', 'Sandeep Verma', 'IT', 'Active', '2026-04-30 23:59:31'),
(23, 'EMP023', 'Rekha Sharma', 'HR', 'Inactive', '2026-04-30 23:59:31'),
(24, 'EMP024', 'Ashish Mehta', 'Finance', 'Active', '2026-04-30 23:59:31'),
(25, 'EMP025', 'Preeti Singh', 'Admin', 'Active', '2026-04-30 23:59:31'),
(26, 'EMP026', 'Gaurav Yadav', 'IT', 'Active', '2026-04-30 23:59:31'),
(27, 'EMP027', 'Sonali Kulkarni', 'HR', 'Active', '2026-04-30 23:59:31'),
(28, 'EMP028', 'Ramesh Gupta', 'Finance', 'Inactive', '2026-04-30 23:59:31'),
(29, 'EMP029', 'Pallavi Desai', 'Admin', 'Active', '2026-04-30 23:59:31'),
(30, 'EMP030', 'Varun Nair', 'IT', 'Active', '2026-04-30 23:59:31'),
(31, 'EMP031', 'Asha Patil', 'HR', 'Active', '2026-04-30 23:59:31'),
(32, 'EMP032', 'Kiran Shah', 'Finance', 'Active', '2026-04-30 23:59:31'),
(33, 'EMP033', 'Sunil Reddy', 'Admin', 'Inactive', '2026-04-30 23:59:31'),
(34, 'EMP034', 'Ankit Kumar', 'IT', 'Active', '2026-04-30 23:59:31'),
(35, 'EMP035', 'Seema Jain', 'HR', 'Active', '2026-04-30 23:59:31'),
(36, 'EMP036', 'Prakash Singh', 'Finance', 'Active', '2026-04-30 23:59:31'),
(37, 'EMP037', 'Divya Gupta', 'Admin', 'Active', '2026-04-30 23:59:31'),
(38, 'EMP038', 'Harsh Patel', 'IT', 'Inactive', '2026-04-30 23:59:31'),
(39, 'EMP039', 'Neeraj Joshi', 'HR', 'Active', '2026-04-30 23:59:31'),
(40, 'EMP040', 'Rajesh Mehta', 'Finance', 'Active', '2026-04-30 23:59:31'),
(41, 'EMP041', 'Tina Shah', 'Admin', 'Active', '2026-04-30 23:59:31'),
(42, 'EMP042', 'Vinay Verma', 'IT', 'Active', '2026-04-30 23:59:31'),
(43, 'EMP043', 'Sonia Singh', 'HR', 'Inactive', '2026-04-30 23:59:31'),
(44, 'EMP044', 'Amit Agarwal', 'Finance', 'Active', '2026-04-30 23:59:31'),
(45, 'EMP045', 'Ruchi Desai', 'Admin', 'Active', '2026-04-30 23:59:31'),
(46, 'EMP046', 'Kunal Yadav', 'IT', 'Active', '2026-04-30 23:59:31'),
(47, 'EMP047', 'Poonam Nair', 'HR', 'Active', '2026-04-30 23:59:31'),
(48, 'EMP048', 'Ajit Patil', 'Finance', 'Inactive', '2026-04-30 23:59:31'),
(49, 'EMP049', 'Reena Gupta', 'Admin', 'Active', '2026-04-30 23:59:31'),
(50, 'EMP050', 'Mohit Sharma', 'IT', 'Active', '2026-04-30 23:59:31'),
(51, 'EMP051', 'Geeta Joshi', 'HR', 'Active', '2026-04-30 23:59:31'),
(52, 'EMP052', 'Suresh Mehta', 'Finance', 'Active', '2026-04-30 23:59:31'),
(53, 'EMP053', 'Kiran Singh', 'Admin', 'Inactive', '2026-04-30 23:59:31'),
(54, 'EMP054', 'Alok Verma', 'IT', 'Active', '2026-04-30 23:59:31'),
(55, 'EMP055', 'Nisha Reddy', 'HR', 'Active', '2026-04-30 23:59:31'),
(56, 'EMP056', 'Rajiv Kumar', 'Finance', 'Active', '2026-04-30 23:59:31'),
(57, 'EMP057', 'Payal Shah', 'Admin', 'Active', '2026-04-30 23:59:31'),
(58, 'EMP058', 'Abhishek Gupta', 'IT', 'Inactive', '2026-04-30 23:59:31'),
(59, 'EMP059', 'Sapna Jain', 'HR', 'Active', '2026-04-30 23:59:31'),
(60, 'EMP060', 'Anil Yadav', 'Finance', 'Active', '2026-04-30 23:59:31'),
(61, 'EMP061', 'Shweta Desai', 'Admin', 'Active', '2026-04-30 23:59:31'),
(62, 'EMP062', 'Manoj Patil', 'IT', 'Active', '2026-04-30 23:59:31'),
(63, 'EMP063', 'Sejal Nair', 'HR', 'Inactive', '2026-04-30 23:59:31'),
(64, 'EMP064', 'Pravin Sharma', 'Finance', 'Active', '2026-04-30 23:59:31'),
(65, 'EMP065', 'Rohini Singh', 'Admin', 'Active', '2026-04-30 23:59:31'),
(66, 'EMP066', 'Vijay Mehta', 'IT', 'Active', '2026-04-30 23:59:31'),
(67, 'EMP067', 'Anu Gupta', 'HR', 'Active', '2026-04-30 23:59:31'),
(68, 'EMP068', 'Dev Patel', 'Finance', 'Inactive', '2026-04-30 23:59:31'),
(69, 'EMP069', 'Mehul Shah', 'Admin', 'Active', '2026-04-30 23:59:31'),
(70, 'EMP070', 'Rakesh Verma', 'IT', 'Active', '2026-04-30 23:59:31');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `name`) VALUES
(1, 'Kalyani Nagar'),
(2, 'Kharadi'),
(3, 'Magarpatta');

-- --------------------------------------------------------

--
-- Table structure for table `uploads`
--

CREATE TABLE `uploads` (
  `id` int(11) NOT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `upload_date` date DEFAULT NULL,
  `total_records` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `attendancelogs`
--
ALTER TABLE `attendancelogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attendance_logs`
--
ALTER TABLE `attendance_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employee_id` (`employee_id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `uploads`
--
ALTER TABLE `uploads`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `attendancelogs`
--
ALTER TABLE `attendancelogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `attendance_logs`
--
ALTER TABLE `attendance_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT for table `uploads`
--
ALTER TABLE `uploads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance_logs`
--
ALTER TABLE `attendance_logs`
  ADD CONSTRAINT `attendance_logs_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`);

--
-- Constraints for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD CONSTRAINT `audit_logs_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
