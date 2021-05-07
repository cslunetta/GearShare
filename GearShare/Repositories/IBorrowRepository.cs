using GearShare.Models;
using System.Collections.Generic;

namespace GearShare.Repositories
{
    public interface IBorrowRepository
    {
        int AddBorrow(Borrow borrow);
        List<Borrow> GetCurrentUsersBorrowed(int UserProfileId);
        List<Borrow> GetAllBorrowedByGearUserId(int UserProfileId);
        void UpdateBorrowed(Borrow borrow);
        Borrow GetBorrowById(int id);
        Borrow GetBorrowByGearId(int id, int UserProfileId);
    }
}