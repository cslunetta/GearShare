using System.Collections.Generic;
using GearShare.Models;

namespace GearShare.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        void DeactivateUserById(int id);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        List<UserProfile> GetDeactivatedUserProfiles();
        UserProfile GetUserProfileById(int id);
        List<UserProfile> GetUserProfiles();
        void ReactivateUserById(int id);
    }
}