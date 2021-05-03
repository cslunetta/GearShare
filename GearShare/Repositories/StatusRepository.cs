using GearShare.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GearShare.Repositories
{
    public class StatusRepository : BaseRepository, IStatusRepository
    {
        public StatusRepository(IConfiguration configuration) : base(configuration) { }

        public Status GetStatusById(int id)
        {
            throw new NotImplementedException();
        }

        public void UpdateStatus(Status status)
        {
            throw new NotImplementedException();
        }
    }
}
