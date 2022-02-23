﻿namespace SBC.Web.Areas.Administration.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
    using SBC.Services.Data.Company;
    using SBC.Web.ViewModels.Administration.Company;

    public class CompanyController : AdministrationController
    {
        private readonly ICompanyService companyService;

        public CompanyController(ICompanyService clientService)
        {
            this.companyService = clientService;
        }

        [HttpPost]
        public async Task<ActionResult> Add(CreateCompanyInputModel model)
            => this.GenericResponse(await this.companyService.AddAsync(model));
    }
}
