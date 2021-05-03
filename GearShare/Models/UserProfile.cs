using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GearShare.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(50)]
        public string DisplayName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }

        public DateTime CreateDateTime { get; set; }

        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string ImageLocation { get; set; }

        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }


    }
}
