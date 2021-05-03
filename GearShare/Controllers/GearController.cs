using GearShare.Models;
using GearShare.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GearShare.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GearController : ControllerBase
    {
        private readonly IGearRepository _gearRepository;
        public GearController(IGearRepository gearRepository)
        {
            _gearRepository = gearRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var gear = _gearRepository.GetAllPublicGear();

            return Ok(gear);
        }
        
        [HttpGet("GetGearByUserId")]
        public IActionResult GetGearByUserId(int id)
        {
            var gear = _gearRepository.GetCurrentUsersGear(id);

            return Ok(gear);
        }
        
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var gear = _gearRepository.GetGearById(id);

            return Ok(gear);
        }

        [HttpPost]
        public IActionResult Post(Gear gear)
        {
            gear.CreateDateTime = DateTime.Now;
            _gearRepository.AddGear(gear);
            return CreatedAtAction("Get", new { id = gear.Id }, gear);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Gear gear)
        {
            _gearRepository.UpdateGear(gear);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _gearRepository.DeleteGear(id);
            return NoContent();
        }

    }
}
