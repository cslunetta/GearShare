using GearShare.Models;
using System.Collections.Generic;

namespace GearShare.Repositories
{
    public interface IGearRepository
    {
        int AddGear(Gear gear);
        void DeleteGear(int id);
        List<Gear> GetAllPublicGear();
        List<Gear> GetCurrentUsersGear(int userProfileId);
        Gear GetGearById(int id);
        void UpdateGear(Gear gear);
    }
}