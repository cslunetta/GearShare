using GearShare.Models;
using GearShare.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GearShare.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GearController : ControllerBase
    {
        private readonly IGearRepository _gearRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public GearController(IGearRepository gearRepository, IUserProfileRepository userProfileRepository)
        {
            _gearRepository = gearRepository;
            _userProfileRepository = userProfileRepository;
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
            var currentUserProfile = GetCurrentProfile();
            gear.UserProfileId = currentUserProfile.Id;
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

        private UserProfile GetCurrentProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
