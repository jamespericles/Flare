DROP DATA IF EXISTS flareDB;
CREATE database flareDB;
USE flareDB;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    userUserName VARCHAR(255),
    -- going to need solution for emails that contain numbers
    userEmail VARCHAR(255),
    -- assuming we're using bcrypt to hash
    userPassword CHAR(60),
    userFirst VARCHAR(255),
    userLast VARCHAR(255),
    userFull VARCHAR(255),
    -- going to need to work on how we store address
    streetNumber INT,
    streetName VARCHAR(255),
    userCity VARCHAR(255),
    userState VARCHAR(255),
    userZip INT,
    userPhone INT,
    -- user image
    -- user groups
    -- user contacts
    -- user templates
    -- user safety plans
    -- user create date
    -- user modified data
);

CREATE TABLE contacts (
    id INT NOT NULL AUTO_INCREMENT,
    contactNickname VARCHAR(255),
    contactName VARCHAR(255),
    -- going to need a solution for emails that contain numbers
    contactEmail VARCHAR (255),
    contactPhone INT,
    contactRelationship VARCHAR(255),
    -- contact image
    -- contact groups
    -- contact create date
    -- contact date modified
    FOREIGN KEY(users) REFERENCES users(id),
)

CREATE TABLE group (
    id INT NOT NULL AUTO_INCREMENT,
    groupName VARCHAR(255),
    -- groupMembers
    -- groupCreateDate
    -- groupmModifiedDate
    FOREIGN KEY (users) REFERENCES users(id),
    FOREIGN KEY (contacts) REFERENCES contacts(id),
)

CREATE TABLE safetyPlan (
    id INT NOT NULL AUTO_INCREMENT,
    spNickname VARCHAR(255),
    -- spImage
    spIsActive BOOLEAN,
    -- spActiveType
    spIsHome BOOLEAN,
    spDurationBeforeExecution INT,
    -- spActivateStateTime
    -- spActivateEndTime
    -- spExecutePlan
    -- spGroupsAssigned
    -- spContactMethod
    -- spCreateDate
    -- spModifiedDate
    FOREIGN KEY (users) REFERENCES users(id),
    FOREIGN KEY (contacts) REFERENCES contacts(id)

)