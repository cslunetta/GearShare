using GearShare.Models;
using GearShare.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GearShare.Repositories
{
    public class BorrowRepository : BaseRepository, IBorrowRepository
    {
        public BorrowRepository(IConfiguration configuration) : base(configuration) { }

        public int AddBorrow(Borrow borrow)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Borrow (
                                    StatusId, UserProfileId, GearId, StartDate)
                        OUTPUT INSERTED.ID
                        VALUES (
                                    null, @UserProfileId, @GearId, @StartDate)";

                    //DbUtils.AddParameter(cmd, "@StatusId", borrow.StatusId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", borrow.UserProfileId);
                    DbUtils.AddParameter(cmd, "@GearId", borrow.GearId);
                    DbUtils.AddParameter(cmd, "@StartDate", borrow.StartDate);
                    //DbUtils.AddParameter(cmd, "@EndDate", DbUtils.ValueOrDBNull(borrow.EndDate));

                    return borrow.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<Borrow> GetAllBorrowedByGearUserId(int UserProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  b.Id, b.StatusId, b.UserProfileId AS RequestingUser, b.GearId, b.StartDate, b.EndDate,
                                
                                g.Id AS GearId, g.[Name] AS GearName, g.Description, g.ImageLocation, 
                                g.CreateDateTime AS GearCreateDate, g.PurchaseDate, g.IsPublic, g.CategoryId, g.UserProfileId AS GearOwner,
                                
                                c.[name] AS CategoryName, 
                                
                                u.FirstName, u.LastName, u.DisplayName, u.Email, u.CreateDateTime, u.ImageLocation AS ProfileImage
                         FROM   Borrow b
                                LEFT JOIN Gear g ON b.GearId = g.Id
                                LEFT JOIN Category c ON g.CategoryId = c.Id
                                LEFT JOIN UserProfile u ON g.UserProfileId = u.Id
                        WHERE   g.UserProfileId = @userprofileId";

                    DbUtils.AddParameter(cmd, "@userProfileId", UserProfileId);

                    var reader = cmd.ExecuteReader();
                    var borrow = new List<Borrow>();

                    while (reader.Read())
                    {
                        borrow.Add(NewBorrowFromReader(reader));
                    }

                    reader.Close();
                    return borrow;
                }
            }
        }

        public List<Borrow> GetCurrentUsersBorrowed(int UserProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  b.Id, b.StatusId, b.UserProfileId AS RequestingUser, b.GearId, b.StartDate, b.EndDate,
                                
                                g.Id AS GearId, g.[Name] AS GearName, g.Description, g.ImageLocation, 
                                g.CreateDateTime AS GearCreateDate, g.PurchaseDate, g.IsPublic, g.CategoryId, g.UserProfileId AS GearOwner,
                                
                                c.[name] AS CategoryName, 
                                
                                u.FirstName, u.LastName, u.DisplayName, u.Email, u.CreateDateTime, u.ImageLocation AS ProfileImage
                         FROM   Borrow b
                                LEFT JOIN Gear g ON b.GearId = g.Id
                                LEFT JOIN Category c ON g.CategoryId = c.Id
                                LEFT JOIN UserProfile u ON b.UserProfileId = u.Id
                        WHERE   b.UserProfileId = @userprofileId";

                    DbUtils.AddParameter(cmd, "@userProfileId", UserProfileId);

                    var reader = cmd.ExecuteReader();
                    var borrow = new List<Borrow>();

                    while (reader.Read())
                    {
                        borrow.Add(NewBorrowFromReader(reader));
                    }

                    reader.Close();
                    return borrow;
                }
            }
        }

        public Borrow GetBorrowById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  b.Id, b.StatusId, b.UserProfileId AS RequestingUser, b.GearId, b.StartDate, b.EndDate,
                                
                                g.Id AS GearId, g.[Name] AS GearName, g.Description, g.ImageLocation, 
                                g.CreateDateTime AS GearCreateDate, g.PurchaseDate, g.IsPublic, g.CategoryId, g.UserProfileId AS GearOwner,
                                
                                c.[name] AS CategoryName, 
                                
                                u.FirstName, u.LastName, u.DisplayName, u.Email, u.CreateDateTime, u.ImageLocation AS ProfileImage
                         FROM   Borrow b
                                LEFT JOIN Gear g ON b.GearId = g.Id
                                LEFT JOIN Category c ON g.CategoryId = c.Id
                                LEFT JOIN UserProfile u ON g.UserProfileId = u.Id
                        WHERE   b.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    Borrow borrow = null;

                    if (reader.Read())
                    {
                        borrow = NewBorrowFromReader(reader);
                    }

                    reader.Close();
                    return borrow;
                }
            }
        }

        public Borrow GetBorrowByGearId(int id, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  b.Id, b.StatusId, b.UserProfileId AS RequestingUser, b.GearId, b.StartDate, b.EndDate,
                                
                                g.Id AS GearId, g.[Name] AS GearName, g.Description, g.ImageLocation, 
                                g.CreateDateTime AS GearCreateDate, g.PurchaseDate, g.IsPublic, g.CategoryId, g.UserProfileId AS GearOwner,
                                
                                c.[name] AS CategoryName, 
                                
                                u.FirstName, u.LastName, u.DisplayName, u.Email, u.CreateDateTime, u.ImageLocation AS ProfileImage
                         FROM   Borrow b
                                LEFT JOIN Gear g ON b.GearId = g.Id
                                LEFT JOIN Category c ON g.CategoryId = c.Id
                                LEFT JOIN UserProfile u ON g.UserProfileId = u.Id
                        WHERE   g.Id = @id AND b.UserProfileId = @UserProfileId;";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    DbUtils.AddParameter(cmd, "@UserProfileId", userProfileId);

                    var reader = cmd.ExecuteReader();
                    Borrow borrow = null;

                    if (reader.Read())
                    {
                        borrow = NewBorrowFromReader(reader);
                    }

                    reader.Close();
                    return borrow;
                }
            }
        }

        public void UpdateBorrowed(Borrow borrow)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE  Borrow
                           SET  StatusId = @StatusId,
                                UserProfileId = @UserProfileId,
                                GearId = @GearId,
                                StartDate = @StartDate,
                                EndDate = @EndDate
                         WHERE  Id = @Id";

                    DbUtils.AddParameter(cmd, "@StatusId", borrow.StatusId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", borrow.UserProfileId);
                    DbUtils.AddParameter(cmd, "@GearId", borrow.GearId);
                    DbUtils.AddParameter(cmd, "@StartDate", borrow.StartDate);
                    DbUtils.AddParameter(cmd, "@EndDate", borrow.EndDate);
                    
                    DbUtils.AddParameter(cmd, "@Id", borrow.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Borrow NewBorrowFromReader(SqlDataReader reader)
        {
            return new Borrow()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                StatusId = DbUtils.GetNullableInt(reader, "StatusId"),
                UserProfileId = DbUtils.GetInt(reader, "RequestingUser"),
                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "RequestingUser"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                    Email = DbUtils.GetString(reader, "Email"),
                    CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                    ImageLocation = DbUtils.GetString(reader, "ProfileImage")
                },
                GearId = DbUtils.GetInt(reader, "GearId"),
                StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                EndDate = DbUtils.GetNullableDateTime(reader, "EndDate"),
            };
        }
    }
}
