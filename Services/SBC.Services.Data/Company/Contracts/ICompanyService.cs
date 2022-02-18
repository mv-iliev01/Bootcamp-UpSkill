﻿namespace SBC.Services.Data.Company.Contracts
{
    using System.Threading.Tasks;

    using SBC.Common;

    public interface ICompanyService
    {
        Task<Result> Add(string name, string email, string logoUrl);

        Task<Result> GetCountAsync();

        Task<bool> ExistsOwnerAsync(string name);

        Task<bool> ExistsByNameAsync(string name);

        Task<int> GetIdByNameAsync(string name);
    }
}
