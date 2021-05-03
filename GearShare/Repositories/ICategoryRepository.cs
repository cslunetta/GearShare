using GearShare.Models;
using System.Collections.Generic;

namespace GearShare.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategories();
        Category GetCategoryById(int id);
    }
}