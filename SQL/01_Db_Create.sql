USE [master]

IF db_id('GearShare') IS NULL
	CREATE DATABASE [GearShare]
GO

USE [GearShare]
GO


DROP TABLE IF EXISTS [Borrow];
DROP TABLE IF EXISTS [Status];
DROP TABLE IF EXISTS [Gear];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [UserProfile];
GO


CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [DisplayName] nvarchar(50) NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [Email] nvarchar(555) NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [ImageLocation] nvarchar(255),

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)

CREATE TABLE [Category] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(50) NOT NULL
)

CREATE TABLE [Gear] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL,
  [Description] text NOT NULL,
  [ImageLocation] nvarchar(255),
  [CreateDateTime] datetime NOT NULL,
  [PurchaseDate] date,
  [IsPublic] bit NOT NULL,
  [CategoryId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,

  CONSTRAINT [FK_Gear_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]),
  CONSTRAINT [FK_Gear_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)

CREATE TABLE [Status] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(50) NOT NULL
)

CREATE TABLE [Borrow] (
  [Id] integer PRIMARY KEY IDENTITY,
  [StatusId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,
  [GearId] integer NOT NULL,
  [StartDate] datetime,
  [EndDate] datetime,
  
  CONSTRAINT [FK_Borrow_Status] FOREIGN KEY ([StatusId]) REFERENCES [Status] ([Id]),
  CONSTRAINT [FK_Borrow_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_Borrow_Gear] FOREIGN KEY ([GearId]) REFERENCES [Gear] ([Id])
)
GO