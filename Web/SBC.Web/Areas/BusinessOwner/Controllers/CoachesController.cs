﻿namespace SBC.Web.Areas.BusinessOwner.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using SBC.Services.Data.Coaches;
    using SBC.Services.Data.Infrastructures;
    using SBC.Services.Data.Users;

    public class CoachesController : BusinessOwnerController
    {
        private readonly ICoachesService coachesService;
        private readonly IUsersService usersService;

        public CoachesController(ICoachesService coachesService, IUsersService usersService)
        {
            this.coachesService = coachesService;
            this.usersService = usersService;
        }

        [HttpGet]
        public async Task<ActionResult> GetCoachesCatalog()
        {
            var companyId = this.usersService.GetCompanyId(this.User.Id());
            var coachesresult = await this.coachesService.GetAllWithActive(companyId);
            return this.GenericResponse(coachesresult);
        }
    }
}
