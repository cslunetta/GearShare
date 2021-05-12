USE [GearShare];
GO

set identity_insert [UserProfile] on
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, ImageLocation, FirebaseUserId) VALUES (1, 'RockStar99', 'Foo', 'Barington', 'foo@bar.com', '2020-04-23', null, 'pH0f4GbWimTfP34fOeDVzEMEBSA3');
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, ImageLocation, FirebaseUserId) VALUES (2, 'DJFrank', 'Jody', 'Maruska', 'jmaruska9@netscape.comx', '2020-02-09', null, '31aiHqSyWiOByndDgOg6sLkHzU03');
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, ImageLocation, FirebaseUserId) VALUES (3, 'SoundEng25', 'Foo', 'Barington', 'a@a.comm', '2020-04-23', null, 'sdfg4654dgsrg54h6st5h4fg54hg');
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, CreateDateTime, ImageLocation, FirebaseUserId) VALUES (4, 'PedalGeak', 'Jody', 'Maruska', 'b@b.comm', '2020-02-09', null, '54fsg48t4h6FG654hfdg4gdfg4gf');
set identity_insert [UserProfile] off
GO

set identity_insert [Category] on
insert into [Category] ([Id], [Name]) VALUES (1, 'Instruments'), (2, 'Live Sound'), (3, 'DJ Gear'), (4, 'Studio Gear');
set identity_insert [Category] off
GO

set identity_insert [Gear] on
insert into Gear (Id, [Name], [Description], ImageLocation, PurchaseDate, IsPublic, CategoryId, UserProfileId) VALUES (1,	'Fender Strat 60s', 'Piano rhythm and blues diatonic major harmony jazz harmonic crescendo. Pitch pitch repeat cadence flag beat rhythm, dyamic phrase major triplets. Fine artist bar quarter accent natural stage diatonic allegro, rhythm and blues pianissimo slur scale note. Repeat triad scale step pentatonic diatonic theme. Harmony fortississimo octave, blues forzando legato keys major sharp bar sharp fugue bar.', null, '3/25/1999', 1, 1, 1);
insert into Gear (Id, [Name], [Description], ImageLocation, PurchaseDate, IsPublic, CategoryId, UserProfileId) VALUES (2,	'Epiphone E200', 'Slur forzando guitar keyboard keys, natural decrescendo octave bass harmonic keys circle of fifths. Phrase bass jam, clef pitch decrescendo fugue rockin triplets flat rest rock and roll. Harmonic fugue stem rock and roll tempo, triad octave flag keys concert rockin melody scale. Jam meter major encore key tempo pianissimo, sonata decrescendo poco a poco poco a poco. Rest step theme encore triplets, play rock repeat meter phrase scale beat.', null, '3/25/1999', 0, 1, 1);
insert into Gear (Id, [Name], [Description], ImageLocation, PurchaseDate, IsPublic, CategoryId, UserProfileId) VALUES (5,	'Hofner B-Bass Hi-Series', 'Slur concert pianissimo pitch notes accent beats. Keys solo drums rhythm beats major allegro. Theme rest allegro major diatonic slur, pitch forzando clef breath mark. Note key diatonic triad harmonic, third beat diatonic melody sharp theme phrase. Slur flat triplets bar cadence repeat rock, forte coda espressivo harmonic rock and roll slur.', null, '3/25/1999', 0, 1, 1);
insert into Gear (Id, [Name], [Description], ImageLocation, PurchaseDate, IsPublic, CategoryId, UserProfileId) VALUES (6,	'Epiphone SG', 'Crescendo third repeat furioso fourth, stem song third pitch cadence forte forte theme pentatonic. Song note stage percussive tritone note harmonic fortississimo. Pitch beats cadence octave, forzando furioso harmonic harmonic tritone repeat guitar tempo diatonic quarter. Chord tritone forte flat play fine meter. Interval tritone phrase song stave, slur pentatonic encore song decrescendo flat forte.', null, '3/25/1999', 1, 1, 1);
insert into Gear (Id, [Name], [Description], ImageLocation, PurchaseDate, IsPublic, CategoryId, UserProfileId) VALUES (3,	'SM57 Dynamic Mic', 'Octave flag decrescendo harmonic flag fortississimo rest presto. Keys rock cadence stave step, pentatonic theme fugue coda sonata sharp repeat diatonic allegro. Slur forte keys rock and roll concert scale forte breath mark flat. Cadence third pianissimo key percussive play pentatonic jam, scale coda sharp keyboard pentatonic. Furioso concert pentatonic rhythm piano, fortississimo scale beats interval cadence decrescendo.', null, '3/25/1999', 1, 2, 1);
insert into Gear (Id, [Name], [Description], ImageLocation, PurchaseDate, IsPublic, CategoryId, UserProfileId) VALUES (8,	'Pioneer DDJ-SB DJ Controller', 'Flat encore fortississimo harmony pitch scale presto meter accent, fine rock fugue espressivo. Allegro meter phrase fortississimo quarter tempo pitch key play. Scale diatonic fine encore harmony, repeat song pianissimo rock pentatonic tempo.', 'https://upload.wikimedia.org/wikipedia/commons/1/16/Pioneer_DDJ-SB_DJ_Controller_-_a_chance_for_me_to_monkey_with_Serato_-_Eva_Egolf%27s_EDM_workshop_%28by_Ethan_Hein%29.jpg', '3/25/1999', 1, 3, 2);
insert into Gear (Id, [Name], [Description], ImageLocation, PurchaseDate, IsPublic, CategoryId, UserProfileId) VALUES (9,	'JBL TR225 LoudSpeakers', 'Artist beat breath mark major, jazz melody jazz quarter chord chord harmonic triplets. Forzando rest fugue concert band sharp dyamic. Blues triad pitch, cadence major fourth triplets slur phrase rock and roll drums harmonic keys octave.', null, '3/25/1999', 1, 3, 2);
insert into Gear (Id, [Name], [Description], ImageLocation, PurchaseDate, IsPublic, CategoryId, UserProfileId) VALUES (11,	'Blue Bluebird Condenser Mic', 'Sharp flag meter melody band beats harmonic, notes scale blues theme keyboard diatonic accent. Keyboard allegro repeat presto dyamic beats furioso. Stem furioso rock and roll rest furioso fourth third syncopate cadence.', null, '3/25/1999', 1, 4, 3);
insert into Gear (Id, [Name], [Description], ImageLocation, PurchaseDate, IsPublic, CategoryId, UserProfileId) VALUES (12,	'KRK ROKIT 5 Speakers', 'Circle of fifths dyamic stage step jazz tempo percussive syncopate. Cadence poco a poco fine band furioso quarter bass. Repeat presto keys, slur jazz encore fine guitar stem legato note keyboard stem third.', null, '3/25/1999', 1, 4, 3);
insert into Gear (Id, [Name], [Description], ImageLocation, PurchaseDate, IsPublic, CategoryId, UserProfileId) VALUES (10,	'ibanez weeping demon wah pedal', 'Syncopate harmonic pentatonic cadence quarter third tempo, harmonic tempo flat guitar sharp legato major. Rockin jam pentatonic fugue, notes dyamic forte concert fine harmonic fortississimo beat. Play concert melody fine beat clef band.', null, '3/25/1999', 1, 1, 4);
insert into Gear (Id, [Name], [Description], ImageLocation, PurchaseDate, IsPublic, CategoryId, UserProfileId) VALUES (4,	'Fuzz Pedal', 'Bass step flag triplets, melody legato drums crescendo triplets rock rest. Pentatonic presto tempo, flat bar phrase triplets accent guitar concert drums meter. Forzando presto crescendo presto sharp rhythm beats play.', 'https://upload.wikimedia.org/wikipedia/commons/7/79/Boss_FZ-5_Fuzz.jpg', '3/25/1999', 1, 1, 4);
insert into Gear (Id, [Name], [Description], ImageLocation, PurchaseDate, IsPublic, CategoryId, UserProfileId) VALUES (7,	'Flanger BF-2', 'Sharp octave melody slur forte accent triad drums encore. Allegro forzando flag interval step, dyamic third bass keys allegro jazz allegro. Guitar clef dyamic rhythm, phrase rock third coda piano espressivo quarter.', 'https://cdn.pixabay.com/photo/2017/09/21/03/15/guitar-pedal-2770470_960_720.jpg', '3/25/1999', 1, 1, 4);
set identity_insert [Gear] off
GO

set identity_insert [Status] on
insert into [Status] (Id, [Name]) VALUES (1, 'Approved'), (2, 'Denied'), (3, 'Cancelled');
set identity_insert [Status] off

set identity_insert [Borrow] on
insert into [Borrow] (Id, StatusId, UserProfileId, GearId, StartDate, EndDate) VALUES (1, null, 2, 7, GETDATE(), null);
insert into [Borrow] (Id, StatusId, UserProfileId, GearId, StartDate, EndDate) VALUES (2, null, 1, 7, GETDATE(), null);
insert into [Borrow] (Id, StatusId, UserProfileId, GearId, StartDate, EndDate) VALUES (3, null, 3, 1, GETDATE(), null);
set identity_insert [Borrow] off