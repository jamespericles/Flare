-- how to handle foreign keys for groups and contacts

INSERT INTO `users` (
    id, first_name, last_name, email, address1, address2, city, state, zip, mobile, password, last_login, createdAt, updatedAt
) 
VALUES
(1, "James", "Pericles", "james.pericles@aol.com", "2681 Noblewood Circle", "Apt 2518", "Raleigh", "NC", "27604", "4436165489", "1234asdf", 2000-01-01 00:00:00, 2000-01-01 00:00:00),
(2, "Colin", "Shleton", "colin.shelton@aol.com", "2681 Noblewood Circle", "Apt 2519", "Raleigh", "NC", "27604", "1234asdf", 2000-01-01 00:00:00, 2000-01-01 00:00:00),
(3, "Sean", "McGinnis", "sean.mcginnis@aol.com", "2681 Noblewood Circle", "Apt 2520", "Raleigh", "NC", "27604", "1234asdf", 2000-01-01 00:00:00, 2000-01-01 00:00:00);

INSERT INTO `contacts` (
    id, firstname, lastname, nickname, relationship, email, mobile, users, createdAt, updatedAt
)
VALUES
(1, "Colin", "Shelton", "Colin", "Friend", "colin.shelton@aol.com", "1234567890", 1, 2000-01-01 00:00:00),
(2, "Sean", "McGinnis", "Sean", "Friend", "sean.mcginnis@aol.com", "1234567890", 1, 2000-01-01 00:00:00),
(3, "James", "Pericles", "James", "Friend", "james.pericles@aol.com", "1234567890", 1, 2000-01-01 00:00:00),
(4, "Zach", "Rickards", "Zach", "Teacher", "zach.rickards@aol.com", "1234567890", 1, 2000-01-01 00:00:00),
(5, "Carl", "Vega", "Carl", "Teacher", "carl.vega@aol.com", "1234567890", 1, 2000-01-01 00:00:00),
(6, "Tim", "Nagorsky", "Tim", "Teacher", "tim.nagorsky.com", "1234567890", 1, 2000-01-01 00:00:00),
(7, "Jim", "Pericles", "Jim", "Dad", "jim.pericles@aol.com", "1234567890", 2, 2000-01-01 00:00:00),
(8, "Joann", "Pericles", "Jo", "Mom", "joann.pericles@aol.com", "1234567890", 2, 2000-01-01 00:00:00),
(9, "Carl", "Keightley", "Carl", "Brother", "carl.keightley@aol.com", "1234567890", 2, 2000-01-01 00:00:00),
(10, "Anna", "Keightley", "Anna", "Sister", "anna.keightley@aol.com", "1234567890", 2, 2000-01-01 00:00:00),
(11, "Rasheda", "Assopardi", "Gran", "Gradma", "ra.ass@aol.com", "1234567890", 2, 2000-01-01 00:00:00),
(12, "Carl", "Assopardi", "Grandad", "Grandad", "carl.ass@aol.com", "1234567890", 2, 2000-01-01 00:00:00),
(13, "Odin", "Pericles", "Odin", "Best Friend", "odin.pericles@aol.com", "1234567890", 3, 2000-01-01 00:00:00),
(14, "Olive", "Pericles", "Olive", "Annoying", "olive.pericles@aol.com", "1234567890", 3, 2000-01-01 00:00:00),
(15, "Conner", "Redmond", "Conner", "Friend", "conner.redmond@aol.com", "1234567890", 3, 2000-01-01 00:00:00),
(16, "Steve", "Jobs", "Steve", "Colleague", "steve.jobs@aol.com", "1234567890", 3, 2000-01-01 00:00:00),
(17, "Bill", "Gates", "Bill", "Colleague", "bill.gates@aol.com", "1234567890", 3, 2000-01-01 00:00:00),
(18, "Amanda", "Hartman", "Amanda", "Friend", "amanada.hartman@aol.com", "1234567890", 3, 2000-01-01 00:00:00);

INSERT INTO `groups` (
    id, groupname, users, contacts, plans, createdAt, updatedAt
)
VALUES
(1, "Primary", 1, 1, 1, 2000-01-01 00:00:00),
(2, "Secondary", 1, 1, 1, 2000-01-01 00:00:00),
(3, "Tertiary", 2, 1, 1, 2000-01-01 00:00:00),
(4, "Quarternary", 2, 1, 1, 2000-01-01 00:00:00),
(5, "Quinary", 3, 1, 1, 2000-01-01 00:00:00),
(6, "Senary", 3, 1, 1, 2000-01-01 00:00:00);

INSERT INTO `plans` (
    id, planname, isActive, isHome, durationBeforeExecution, activatestart, activateend, executeplan, users, contacts, groups, createdAt, updatedAt
)
VALUES
(1, "Primary", TRUE, FALSE, 100, 2000-01-01 00:00:00, 2000-01-01 00:00:00, TRUE, 1, 1, 1, 2000-01-01 00:00:00, 2000-01-01 00:00:00),
(2, "Secondary", TRUE, FALSE, 100, 2000-01-01 00:00:00, 2000-01-01 00:00:00, TRUE, 1, 1, 1, 2000-01-01 00:00:00, 2000-01-01 00:00:00),
(3, "Tertiary", TRUE, FALSE, 100, 2000-01-01 00:00:00, 2000-01-01 00:00:00, TRUE, 1, 1, 1, 2000-01-01 00:00:00, 2000-01-01 00:00:00),
(4, "Quarternary", TRUE, FALSE, 100, 2000-01-01 00:00:00, 2000-01-01 00:00:00, TRUE, 1, 1, 1, 2000-01-01 00:00:00, 2000-01-01 00:00:00),
(5, "Quinary", TRUE, FALSE, 100, 2000-01-01 00:00:00, 2000-01-01 00:00:00, TRUE, 1, 1, 1, 2000-01-01 00:00:00, 2000-01-01 00:00:00),
(6, "Senary", TRUE, FALSE, 100, 2000-01-01 00:00:00, 2000-01-01 00:00:00, TRUE, 1, 1, 1, 2000-01-01 00:00:00, 2000-01-01 00:00:00);

INSERT INTO `templates` (
    id, nickname, val, users, contacts, groups, plans, createdAt, updatedAt
)
VALUES
(1, "Primary", 1, 1, 1, 1, 2000-01-01 00:00:00, 2000-01-01 00:00:00),
(2, "Secondary", 1, 1, 1, 1, 2000-01-01 00:00:00, 2000-01-01 00:00:00),
(3, "Tertiary", 1, 1, 1, 1, 2000-01-01 00:00:00, 2000-01-01 00:00:00),
(4, "Quarternary", 1, 1, 1, 1, 2000-01-01 00:00:00, 2000-01-01 00:00:00),
(5, "Quinary", 1, 1, 1, 1, 2000-01-01 00:00:00, 2000-01-01 00:00:00),
(6, "Senary", 1, 1, 1, 1, 2000-01-01 00:00:00, 2000-01-01 00:00:00),
(7, "Septenary", 1, 1, 1, 1, 2000-01-01 00:00:00, 2000-01-01 00:00:00),
(8, "Octonary", 1, 1, 1, 1, 2000-01-01 00:00:00, 2000-01-01 00:00:00),
(9, "Nonary", 1, 1, 1, 1, 2000-01-01 00:00:00, 2000-01-01 00:00:00),
(10, "Denary", 1, 1, 1, 1, 2000-01-01 00:00:00, 2000-01-01 00:00:00),
(11, "Eleven", 1, 1, 1, 1, 2000-01-01 00:00:00, 2000-01-01 00:00:00),
(12, "Duodenary", 1, 1, 1, 1, 2000-01-01 00:00:00, 2000-01-01 00:00:00);


