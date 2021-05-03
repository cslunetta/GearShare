using System.Collections.Generic;
using GearShare.Models;

namespace GearShare.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetUserProfileById(int id);
        List<UserProfile> GetUserProfiles();
    }
}