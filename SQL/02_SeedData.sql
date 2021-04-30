USE [GearShare];
GO

set identity_insert [UserProfile] on
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, ImageLocation, UserTypeId, FirebaseUserId) VALUES (1, 'Foo', 'Foo', 'Barington', 'foo@bar.com', '2020-04-23', 'https://robohash.org/numquamutut.png?size=150x150&set=set1', 1, 'pH0f4GbWimTfP34fOeDVzEMEBSA3');
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, ImageLocation, UserTypeId, FirebaseUserId) VALUES (10, 'jmaruska9', 'Jody', 'Maruska', 'jmaruska9@netscape.comx', '2020-02-09', 'https://robohash.org/voluptatemexercitationemdignissimos.png?size=150x150&set=set1', 1, '31aiHqSyWiOByndDgOg6sLkHzU03');
set identity_insert [UserProfile] off

--set identity_insert [Gear] on
--insert into Gear (Id, [Name], [Description], ImageLocation, CreateDateTime, PurchaseDate, IsPublic, CategoryId, UserProfileId) VALUES ();
--insert into Gear (Id, [Name], [Description], ImageLocation, CreateDateTime, PurchaseDate, IsPublic, CategoryId, UserProfileId) VALUES ();
--insert into Gear (Id, [Name], [Description], ImageLocation, CreateDateTime, PurchaseDate, IsPublic, CategoryId, UserProfileId) VALUES ();
--insert into Gear (Id, [Name], [Description], ImageLocation, CreateDateTime, PurchaseDate, IsPublic, CategoryId, UserProfileId) VALUES ();
--set identity_insert [Gear] off

set identity_insert [Category] on
insert into [Category] ([Id], [Name]) VALUES (1, 'Instruments'), (2, 'Live Sound'), (3, 'DJ Gear'), (4, 'Studio Gear');
set identity_insert [Category] off

--set identity_insert [Borrow] on
--insert into [Borrow] () VALUES ();
--set identity_insert [Borrow] off

--set identity_insert [Status] on
--insert into [Status] () VALUES ();
--set identity_insert [Status] off