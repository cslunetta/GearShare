using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GearShare.Models
{
    public class Gear
    {
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [DisplayName("Header Image URL")]
        public string ImageLocation { get; set; }
        
        public DateTime CreateDateTime { get; set; }
        
        [DisplayName("Purchased")]
        [DataType(DataType.Date)]
        public DateTime PurchaseDate { get; set; }
        
        public bool IsPublic { get; set; }
        
        [Required]
        [DisplayName("Category")]
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        [Required]
        [DisplayName("Owner")]
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
