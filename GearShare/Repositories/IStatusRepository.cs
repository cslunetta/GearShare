using GearShare.Models;

namespace GearShare.Repositories
{
    public interface IStatusRepository
    {
        Status GetStatusById(int id);
        void UpdateStatus(Status status);
    }
}