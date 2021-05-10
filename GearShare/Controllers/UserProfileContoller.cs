using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using GearShare.Models;
using GearShare.Repositories;
using System.Security.Claims;

namespace GearShare.Controllers
{
    [Authorize]
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
        public IActionResult GetByFirebaseUserId(string firebaseUserId)
        {
            var profile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (profile == null)
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
                nameof(GetByFirebaseUserId),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        [HttpGet("currentUserProfile")]
        public IActionResult GetCurrentUserProfile()
        {
            var currentUser = GetCurrentProfile();
            var profile = _userProfileRepository.GetUserProfileById(currentUser.Id);
            return Ok(profile);
        }

        [HttpPut]
        public IActionResult Put(UserProfile userProfile)
        {
            var currentUserProfile = GetCurrentProfile();
            currentUserProfile.DisplayName = userProfile.DisplayName;
            currentUserProfile.FirstName = userProfile.FirstName;
            currentUserProfile.LastName = userProfile.LastName;
            currentUserProfile.ImageLocation = userProfile.ImageLocation;
            currentUserProfile.Email = userProfile.Email;

            _userProfileRepository.UpdateUser(currentUserProfile);
            return NoContent();
        }

        private UserProfile GetCurrentProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
