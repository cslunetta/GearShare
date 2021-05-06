USE [GearShare];
GO

set identity_insert [UserProfile] on
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, ImageLocation, FirebaseUserId) VALUES (1, 'Foo', 'Foo', 'Barington', 'foo@bar.com', '2020-04-23', 'https://robohash.org/numquamutut.png?size=150x150&set=set1', 'pH0f4GbWimTfP34fOeDVzEMEBSA3');
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, ImageLocation, FirebaseUserId) VALUES (2, 'jmaruska9', 'Jody', 'Maruska', 'jmaruska9@netscape.comx', '2020-02-09', 'https://robohash.org/voluptatemexercitationemdignissimos.png?size=150x150&set=set1', '31aiHqSyWiOByndDgOg6sLkHzU03');
set identity_insert [UserProfile] off
GO

set identity_insert [Category] on
insert into [Category] ([Id], [Name]) VALUES (1, 'Instruments'), (2, 'Live Sound'), (3, 'DJ Gear'), (4, 'Studio Gear');
set identity_insert [Category] off
GO

set identity_insert [Gear] on
insert into Gear (Id, [Name], [Description], ImageLocation, PurchaseDate, IsPublic, CategoryId, UserProfileId) VALUES (1, 'Fender Strat 60s', 'test1', null, '3/25/1999', 1, 1, 1);
insert into Gear (Id, [Name], [Description], ImageLocation, PurchaseDate, IsPublic, CategoryId, UserProfileId) VALUES (2, 'Epiphone E200', 'Test2', null, '3/25/1999', 0, 1, 1);
insert into Gear (Id, [Name], [Description], ImageLocation, PurchaseDate, IsPublic, CategoryId, UserProfileId) VALUES (3, 'Yamaha Powered Speakers', 'test3', null, '3/25/1999', 1, 2, 2);
insert into Gear (Id, [Name], [Description], ImageLocation, PurchaseDate, IsPublic, CategoryId, UserProfileId) VALUES (4, 'Fuzz Pedal', 'Test4', null, '3/25/1999', 0, 1, 2);
set identity_insert [Gear] off
GO

set identity_insert [Status] on
insert into [Status] (Id, [Name]) VALUES (1, 'Approved'), (2, 'Denied'), (3, 'Cancelled');
set identity_insert [Status] off

--set identity_insert [Borrow] on
--insert into [Borrow] () VALUES ();
--set identity_insert [Borrow] off
