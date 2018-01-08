-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 08. Sep 2017 um 20:26
-- Server-Version: 10.1.19-MariaDB
-- PHP-Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `luxus`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `light`
--

CREATE TABLE `light` (
  `lid` int(10) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `rid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Daten für Tabelle `light`
--

INSERT INTO `light` (`lid`, `name`, `status`, `rid`) VALUES
(1, 'couch light', 1, 1),
(2, 'sink lights', 1, 2),
(3, 'night light', 1, 5),
(4, 'mirror light', 1, 6),
(5, 'ceiling light', 0, 6),
(6, 'laptop light', 1, 4),
(7, 'table light', 0, 4),
(8, 'table light', 1, 3),
(9, 'reading light', 0, 1),
(10, 'main kitchen light', 1, 2),
(11, 'dinner light', 1, 1),
(12, 'cupboard light', 0, 2),
(13, 'night light', 1, 3),
(14, 'little lamp', 1, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `room`
--

CREATE TABLE `room` (
  `rid` int(10) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Daten für Tabelle `room`
--

INSERT INTO `room` (`rid`, `name`, `tid`) VALUES
(1, 'ninas livingroom', 1),
(2, 'mamas kitchen', 2),
(3, 'susis bedroom', 3),
(4, 'pauls office', 6),
(5, 'babys chamber', 4),
(6, 'judiths bathroom', 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `roomtype`
--

CREATE TABLE `roomtype` (
  `tid` int(10) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Daten für Tabelle `roomtype`
--

INSERT INTO `roomtype` (`tid`, `name`) VALUES
(1, 'livingroom'),
(2, 'kitchen'),
(3, 'bedroom'),
(4, 'childrens-room'),
(5, 'bathroom'),
(6, 'office');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `room_user`
--

CREATE TABLE `room_user` (
  `rid` int(10) NOT NULL,
  `uid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Daten für Tabelle `room_user`
--

INSERT INTO `room_user` (`rid`, `uid`) VALUES
(1, 2),
(1, 3),
(2, 2),
(2, 5),
(2, 6),
(3, 2),
(3, 5),
(3, 6),
(4, 2),
(4, 5),
(6, 3),
(6, 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `uid` int(10) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pass` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `identifier` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timeout` int(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`uid`, `name`, `pass`, `isAdmin`, `identifier`, `token`, `timeout`) VALUES
(1, 'qwe', '$2y$10$b2jYI1gtyqzNvnDAuxlUqubfrdKSukQeXFbPDaSblqzub2wKCXRXy', 1, '23456d87a97e5635b65f5e920039429d', 'ed0c3feb4e299a080e3dd13f3463bbb7', 1504898400),
(2, 'tommy', '$2y$10$cw.mhkGDYLRMmc8X5z5GlOl1gYxq3SESwBYpFwnVQZ22JajxfKPem', 0, 'f4866ec8f8b752d57958f472934ba0d8', NULL, NULL),
(3, 'judith', '$2y$10$viig/MoqYT56IqmdtWlG5O.kO0HtQrBC6JgQG9O5/66gQKNtRSJJu', 0, '94affa2141300c73196df4cdab8a2699', 'f24979c4e622a2ba47e7075b57511b8c', 1504898301),
(4, 'susi', '$2y$10$Hfjh5Hho0F39QheKBNS9VOuVqFNCSl.Saib6wcpE6iglpCznbBlna', 1, '3f3505c646a142b7034e5c9d58fa9849', NULL, NULL),
(5, 'simon', '$2y$10$l5PePBjjlS.1s99mhh2GAOAliu9hu2Euv6qfF..PrhccZJfFFE0bO', 0, 'c49fa921c102e3b8f9ce06f04380049d', NULL, NULL),
(6, 'nina', '$2y$10$2ru7fhdroUhQ0.mlBnb4IuuGw8YYbLN3Dm.YgQ1F4Z6Q.k9f.9ex6', 0, '542bd75b3ce81320e1ab32dce9aa25a7', NULL, NULL),
(7, 'paul', '$2y$10$ZJYFEO2Or2f4fTiFWj8Zz.lDComcx240b3LgH6vu351au4TzW61Z2', 1, '6d2eee4a0e61f4854a01b988da231ec2', NULL, NULL);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `light`
--
ALTER TABLE `light`
  ADD PRIMARY KEY (`lid`),
  ADD KEY `rid` (`rid`);

--
-- Indizes für die Tabelle `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`rid`),
  ADD KEY `tid` (`tid`);

--
-- Indizes für die Tabelle `roomtype`
--
ALTER TABLE `roomtype`
  ADD PRIMARY KEY (`tid`);

--
-- Indizes für die Tabelle `room_user`
--
ALTER TABLE `room_user`
  ADD PRIMARY KEY (`rid`,`uid`),
  ADD KEY `rid` (`rid`),
  ADD KEY `uid` (`uid`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `light`
--
ALTER TABLE `light`
  MODIFY `lid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT für Tabelle `room`
--
ALTER TABLE `room`
  MODIFY `rid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT für Tabelle `roomtype`
--
ALTER TABLE `roomtype`
  MODIFY `tid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `light`
--
ALTER TABLE `light`
  ADD CONSTRAINT `fk__light__room` FOREIGN KEY (`rid`) REFERENCES `room` (`rid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `room_user`
--
ALTER TABLE `room_user`
  ADD CONSTRAINT `fk__room_user__room` FOREIGN KEY (`rid`) REFERENCES `room` (`rid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk__room_user__user` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
