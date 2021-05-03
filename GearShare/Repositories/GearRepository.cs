using GearShare.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GearShare.Repositories
{
    public class GearRepository : BaseRepository, IGearRepository
    {
        public GearRepository(IConfiguration configuration) : base(configuration) { }

        public int AddGear(Gear gear)
        {
            throw new NotImplementedException();
        }

        public void DeleteGear(int id)
        {
            throw new NotImplementedException();
        }

        public List<Gear> GetAllPublicGear()
        {
            throw new NotImplementedException();
        }

        public List<Gear> GetCurrentUsersGear(int userProfileId)
        {
            throw new NotImplementedException();
        }

        public Gear GetGearById(int id)
        {
            throw new NotImplementedException();
        }

        public void UpdateGear(Gear gear)
        {
            throw new NotImplementedException();
        }
    }
}
