using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GearShare.Models
{
    public class BorrowWithGear
    {
        public Borrow Borrow { get; set; }
        public Gear Gear { get; set; }
    }
}
