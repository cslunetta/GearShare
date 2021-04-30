using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using GearShare.Models;
using GearShare.Repositories;

namespace GearShare.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            var profile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (profile.Deactivated == true)
            {
                return NotFound();
            }
            return Ok(profile);
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        [HttpGet]
        public IActionResult Get()
        {
            var profiles = _userProfileRepository.GetUserProfiles();
            return Ok(profiles);
        }

        [HttpPut("DeactivateUserById/{id}")]
        public IActionResult DeactivateUserById(int id)
        {
            _userProfileRepository.DeactivateUserById(id);
            return NoContent();
        }

        [HttpPut("ReactivateUserById/{id}")]
        public IActionResult ReactivateUserById(int id)
        {
            _userProfileRepository.ReactivateUserById(id);
            return NoContent();
        }


        [HttpGet("GetUserProfileById/{id}")]
        public IActionResult GetUserProfileById(int id)
        {
            return Ok(_userProfileRepository.GetUserProfileById(id));
        }

        [HttpGet("GetDeactivatedUserProfiles")]
        public IActionResult GetDeactivatedUserProfiles()
        {
            var profiles = _userProfileRepository.GetDeactivatedUserProfiles();
            return Ok(profiles);
        }
    }
}
