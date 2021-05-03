using GearShare.Models;
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
            throw new NotImplementedException();
        }

        public List<Borrow> GetAllBorrowedByGearUserId(int UserProfileId)
        {
            throw new NotImplementedException();
        }

        public List<Borrow> GetCurrentUsersBorrowed(int UserPrfileId)
        {
            throw new NotImplementedException();
        }

        public void UpdateBorrowed(Borrow borrow)
        {
            throw new NotImplementedException();
        }
    }
}
