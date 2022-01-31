﻿namespace SBC.Web.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using SBC.Services.Data.User.Contracts;
    using SBC.Services.Data.User.Models;
    using SBC.Web.Models.Identity;

    public class IdentityController : ApiController
    {
        private readonly IUserService userService;
        private readonly AppSettings appSettings;

        public IdentityController(IOptions<AppSettings> appSettings, IUserService userService)
        {
            this.appSettings = appSettings.Value;
            this.userService = userService;
        }

        [HttpPost]
        [Route(nameof(Register))]
        public async Task<ActionResult> Register(RegisterRequestModel model)
        {
            var serviceModel = new RegisterServiceModel()
            {
                FullName = model.FullName,
                CompanyName = model.CompanyName,
                Email = model.Email,
                Password = model.Password,
            };

            var result = await this.userService.Register(serviceModel);

            return this.GenericResponse(result);
        }

        [HttpPost]
        [Route(nameof(Login))]
        public async Task<ActionResult> Login(LoginRequestModel model)
        {
            var serviceModel = new LoginServiceModel
            {
                Email = model.Email,
                Password = model.Password,
            };

            var result = await this.userService.Login(serviceModel, this.appSettings.Secret);

            return this.GenericResponse(result);
        }
    }
}
