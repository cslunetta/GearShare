﻿using GearShare.Models;
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
    public class BorrowController : ControllerBase
    {
        private readonly IBorrowRepository _borrowRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public BorrowController(IBorrowRepository borrowRepository, IUserProfileRepository userProfileRepository)
        {
            _borrowRepository = borrowRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("GetAllBorrowedByGearUserId")]
        public IActionResult GetAllBorrowedByGearUserId()
        {
            var currentUserProfile = GetCurrentProfile();
            var borrow = _borrowRepository.GetAllBorrowedByGearUserId(currentUserProfile.Id);

            return Ok(borrow);
        }
        
        [HttpGet("GetCurrentUsersBorrowed")]
        public IActionResult GetCurrentUsersBorrowed()
        {
            var currentUserProfile = GetCurrentProfile();
            var borrow = _borrowRepository.GetCurrentUsersBorrowed(currentUserProfile.Id);

            return Ok(borrow);
        }

        [HttpGet("{id}")]
        public IActionResult GetBorrowById(int id)
        {
            var borrow = _borrowRepository.GetBorrowById(id);

            return Ok(borrow);
        }

        [HttpPost]
        public IActionResult Post(Borrow borrow)
        {
            var currentUserProfile = GetCurrentProfile();
            borrow.UserProfileId = currentUserProfile.Id;
            borrow.StartDate = DateTime.Now;
            borrow.StatusId = 0;
            _borrowRepository.AddBorrow(borrow);
            return CreatedAtAction("Get", new { id = borrow.Id }, borrow);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Borrow borrow)
        {
            var currentUserProfile = GetCurrentProfile();
            var currentBorrow = _borrowRepository.GetBorrowById(id);
            if (id != borrow.Id)
            {
                return BadRequest();
            }
            if (currentUserProfile.Id != currentBorrow.UserProfileId)
            {
                return Unauthorized();
            }
            _borrowRepository.UpdateBorrowed(borrow);
            return NoContent();
        }

        private UserProfile GetCurrentProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
