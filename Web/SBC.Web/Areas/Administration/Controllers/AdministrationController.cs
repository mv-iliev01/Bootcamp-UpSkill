﻿namespace SBC.Web.Areas.Administration.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using SBC.Web.Controllers;

    using static SBC.Common.SBC.Common.GlobalConstants.RolesNamesConstants;

    [Authorize(Roles = AdministratorRoleName)]
    [Area("Administration")]
    public class AdministrationController : ApiController
    {
    }
}
