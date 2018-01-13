-- phpMyAdmin SQL Dump
-- version 4.7.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 13, 2018 at 09:24 PM
-- Server version: 5.7.20-0ubuntu0.16.04.1
-- PHP Version: 7.1.13-1+ubuntu16.04.1+deb.sury.org+1

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `globalvision_vr360`
--
CREATE DATABASE IF NOT EXISTS `globalvision_vr360` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `globalvision_vr360`;

-- --------------------------------------------------------

--
-- Table structure for table `hotspots`
--

DROP TABLE IF EXISTS `hotspots`;
CREATE TABLE IF NOT EXISTS `hotspots` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sceneId` int(11) NOT NULL DEFAULT '0',
  `code` varchar(50) NOT NULL DEFAULT '',
  `ath` varchar(50) NOT NULL DEFAULT '',
  `atv` varchar(50) NOT NULL DEFAULT '',
  `style` varchar(255) NOT NULL,
  `type` varchar(10) NOT NULL,
  `params` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `sceneId` (`sceneId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `scenes`
--

DROP TABLE IF EXISTS `scenes`;
CREATE TABLE IF NOT EXISTS `scenes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tourId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `file` varchar(255) NOT NULL,
  `ordering` int(11) NOT NULL DEFAULT '0',
  `default` tinyint(4) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL,
  `params` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `tourId` (`tourId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tours`
--

DROP TABLE IF EXISTS `tours`;
CREATE TABLE IF NOT EXISTS `tours` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `alias` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `keyword` varchar(255) NOT NULL,
  `hits` int(11) DEFAULT '0',
  `ordering` int(11) DEFAULT '0',
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `params` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `alias` (`alias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `email` varchar(125) NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `last_visit` datetime DEFAULT NULL,
  `params` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `password`, `email`, `last_login`, `last_visit`, `params`) VALUES
(1, 'admin', 'Administrator', '21232f297a57a5a743894a0e4a801fc3', 'admin@globalvision.dev', NULL, NULL, ''),
(2, 'develop', 'Developer', 'a19ea622182c63ddc19bb22cde982b82', 'develop@globalvision.dev', NULL, NULL, '');
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
