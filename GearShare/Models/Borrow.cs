using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GearShare.Models
{
    public class Borrow
    {
        public int Id { get; set; }

        [DisplayName("Status")]
        public int? StatusId { get; set; }
        public Status Status { get; set; }
        
        [Required]
        [DisplayName("Borrower")]
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        
        [Required]
        [DisplayName("Gear")]
        public int GearId { get; set; }
        public Gear Gear { get; set; }

        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime? EndDate { get; set; }
    }
}
