USE [Master]

IF db_id('GearShare') IS null
	CREATE DATABASE [GearShare]
GO

USE [GearShare]
GO


DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Gear];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [Borrow];
DROP TABLE IF EXISTS [Status];
GO


CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [DisplayName] nvarchar(50) NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [Email] nvarchar(555) NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [ImageLocation] nvarchar(255),
  [UserTypeId] integer NOT NULL

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)

CREATE TABLE [Gear] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Description] text NOT NULL,
  [ImageLocation] nvarchar(255),
  [CreateDateTime] datetime NOT NULL,
  [PurchaseDate] date,
  [IsPublic] bit NOT NULL,
  [CategoryId] integer NOT NULL,
  [UserProfileId] integer NOT NULL

  CONSTRAINT [FK_Gear_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]),
  CONSTRAINT [FK_Gear_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)

CREATE TABLE [Category] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(50) NOT NULL
)

CREATE TABLE [Borrow] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [StatusId] integer,
  [UserProfileId] integer,
  [GearId] integer,
  [StartDate] datetime,
  [EndDate] datetime
  
  CONSTRAINT [FK_Borrow_Status] FOREIGN KEY ([StatusId]) REFERENCES [Status] ([Id])
  CONSTRAINT [FK_Borrow_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
  CONSTRAINT [FK_Borrow_Gear] FOREIGN KEY ([GearId]) REFERENCES [Gear] ([Id])
)

CREATE TABLE [Status] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(50) NOT NULL
)
GO