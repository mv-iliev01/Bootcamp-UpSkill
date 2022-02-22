﻿namespace SBC.Services.Data.Client.Models
{
    using SBC.Data.Models;
    using SBC.Services.Mapping;

    public class GetPortionServiceModel : IMapFrom<ApplicationUser>
    {
        public string Id { get; set; }

        public string Email { get; set; }

        public string NormalizedEmail { get; set; }

        public string CompanyName { get; set; }
    }
}
