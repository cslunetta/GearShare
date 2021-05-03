using GearShare.Models;
using GearShare.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace GearShare.Repositories
{
    public class GearRepository : BaseRepository, IGearRepository
    {
        public GearRepository(IConfiguration configuration) : base(configuration) { }

        
        /// <summary>
        /// Add Gear to the database
        /// </summary>
        /// <param name="gear">The Gear object being added.</param>
        /// <returns>The Id of the created Gear</returns>
        public int AddGear(Gear gear)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Gear (
                            [Name], Description, ImageLocation, CreateDateTime, PurchaseDate, IsPublic, CategoryId, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES(
                            @Name, @Description, @ImageLocation, @CreateDateTime, @PurchaseDate, @IsPublic, @CategoryId, @UserProfileId )";

                    DbUtils.AddParameter(cmd, "@Name", gear.Name);
                    DbUtils.AddParameter(cmd, "@Description", gear.Description);
                    DbUtils.AddParameter(cmd, "@ImageLocation", DbUtils.ValueOrDBNull(gear.ImageLocation));
                    DbUtils.AddParameter(cmd, "@CreateDateTime", gear.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@PurchaseDate", DbUtils.ValueOrDBNull(gear.PurchaseDate));
                    DbUtils.AddParameter(cmd, "@IsPublic", gear.IsPublic);
                    DbUtils.AddParameter(cmd, "@CategoryId", gear.CategoryId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", gear.UserProfileId);

                    return gear.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        /// <summary>
        /// Deletes gear and any information stored on the Borrow table associated to that gear.
        /// </summary>
        /// <param name="id">The Id of the gear being deleted</param>
        public void DeleteGear(int id)
        {
            using (var conn = Connection)
            { 
                conn.Open();
                
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE  FROM Borrow
                        WHERE   GearId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
                
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE  FROM Gear
                        WHERE   Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        /// <summary>
        /// Lists all Gear that is public ordered by most recently created.
        /// </summary>
        /// <returns>List of gear objects</returns>
        public List<Gear> GetAllPublicGear()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT    g.Id, g.[Name] AS GearName, g.Description, g.ImageLocation, g.CreateDateTime AS GearCreateDate, g.PurchaseDate, g.IsPublic, g.CategoryId, g.UserProfileId,
                                    c.[name] AS CategoryName, 
                                    u.FirstName, u.LastName, u.DisplayName, u.Email, u.CreateDateTime, u.ImageLocation AS ProfileImage 
                            FROM    Gear g
                                    LEFT JOIN Category c ON g.CategoryId = c.Id
                                    LEFT JOIN UserProfile u ON g.UserProfileId = u.Id
                           WHERE    IsPublic = 'true' AND g.CreateDateTime < SYSDATETIME()
                        ORDER BY    CreateDateTime DESC";

                    var reader = cmd.ExecuteReader();
                    var gear = new List<Gear>();

                    while (reader.Read())
                    {
                        gear.Add(NewGearFromReader(reader));
                    }

                    reader.Close();

                    return gear;
                }
            }
        }

        /// <summary>
        /// Gets the current users Gear
        /// </summary>
        /// <param name="userProfileId">The Id of the Current User</param>
        /// <returns>List of gear</returns>
        public List<Gear> GetCurrentUsersGear(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT    g.Id, g.[Name] AS GearName, g.Description, g.ImageLocation, g.CreateDateTime AS GearCreateDate, g.PurchaseDate, g.IsPublic, g.CategoryId, g.UserProfileId,
                                    c.[name] AS CategoryName, 
                                    u.FirstName, u.LastName, u.DisplayName, u.Email, u.CreateDateTime, u.ImageLocation AS ProfileImage 
                            FROM    Gear g
                                    LEFT JOIN Category c ON g.CategoryId = c.Id
                                    LEFT JOIN UserProfile u ON g.UserProfileId = u.Id 
                           WHERE    g.UserProfileId = @userProfileId
                        ORDER BY    g.CreateDateTime DESC";

                    DbUtils.AddParameter(cmd, "@userProfileId", userProfileId);
                    
                    var reader = cmd.ExecuteReader();
                    var gear = new List<Gear>();

                    while (reader.Read())
                    {
                        gear.Add(NewGearFromReader(reader));
                    }

                    reader.Close();
                    return gear;
                }
            }
        }

        /// <summary>
        /// Gets a selected gear by the Id
        /// </summary>
        /// <param name="id">Id for the gear selected</param>
        /// <returns>The single piece of gear</returns>
        public Gear GetGearById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT    g.Id, g.[Name] AS GearName, g.Description, g.ImageLocation, g.CreateDateTime AS GearCreateDate, g.PurchaseDate, g.IsPublic, g.CategoryId, g.UserProfileId,
                                    c.[name] AS CategoryName, 
                                    u.FirstName, u.LastName, u.DisplayName, u.Email, u.CreateDateTime, u.ImageLocation AS ProfileImage 
                            FROM    Gear g
                                    LEFT JOIN Category c ON g.CategoryId = c.Id
                                    LEFT JOIN UserProfile u ON g.UserProfileId = u.Id 
                           WHERE    g.Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    Gear gear = null;

                    if (reader.Read())
                    {
                        gear = NewGearFromReader(reader);
                    }

                    reader.Close();
                    
                    return gear;
                }
            }
        }

        /// <summary>
        /// Updates a piece of Gear
        /// </summary>
        /// <param name="gear">The updated Gear Object</param>
        public void UpdateGear(Gear gear)
        {
            using ( var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Gear
                          SET   [Name] = @Name,
                                Description = @Description,
                                ImageLocation = @ImageLocation,
                                CreateDateTime = @CreateDateTime,
                                PurchaseDate = @PurchaseDate,
                                IsPublic = @IsPublic,
                                CategoryId = @CategoryId,
                                UserProfileId = @UserProfileId
                        WHERE   Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", gear.Name);
                    DbUtils.AddParameter(cmd, "@Description", gear.Description);
                    DbUtils.AddParameter(cmd, "@ImageLocation", gear.ImageLocation);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", gear.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@PurchaseDate", gear.PurchaseDate);
                    DbUtils.AddParameter(cmd, "@IsPublic", gear.IsPublic);
                    DbUtils.AddParameter(cmd, "@CategoryId", gear.CategoryId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", gear.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Id", gear.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        /// <summary>
        /// creates a Gear Object
        /// </summary>
        /// <param name="reader">SQL Data Reader</param>
        /// <returns>Gear object to method</returns>
        private Gear NewGearFromReader(SqlDataReader reader)
        {
            return new Gear()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "GearName"),
                Description = DbUtils.GetString(reader, "Description"),
                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                CreateDateTime = DbUtils.GetDateTime(reader, "GearCreateDate"),
                PurchaseDate = DbUtils.GetNullableDateTime(reader, "PurchaseDate"),
                IsPublic = DbUtils.GetBoolean(reader, "IsPublic"),
                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                Category = new Category()
                {
                    Id = DbUtils.GetInt(reader, "CategoryId"),
                    Name = DbUtils.GetString(reader, "CategoryName")
                },
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    Email = DbUtils.GetString(reader, "Email"),
                    CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                    ImageLocation = DbUtils.GetString(reader, "ProfileImage")
                },
            };
        }
    }
}
