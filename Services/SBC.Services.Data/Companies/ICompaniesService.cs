﻿namespace SBC.Services.Data.Companies
{
    using System.Threading.Tasks;

    using SBC.Common;
    using SBC.Web.ViewModels.Administration.Company;
    using SBC.Web.ViewModels.BusinessOwner.Employees;

    public interface ICompaniesService
    {
        Task<Result> GetEmployees(string managerId, int skip, int take = 3);

        Task<Result> AddEmployee(CreateEmployeeInputModel model);

        Task<Result> RemoveEmployee(string employeeId);

        Task<Result> GetActiveCourses(int companyId);

        Task<Result> SetCourseToActive(int courseId, int companyId);

        Task<Result> RemoveCourse(int courseId, int companyId);

        Task<Result> GetActiveCoaches(int companyId);

        Task<Result> SetCoachToActive(int coachId, int companyId);

        Task<Result> RemoveCoach(int coachId, int companyId);

        Task<Result> AddAsync(CreateCompanyInputModel model);

        Task<int> GetCountAsync();

        Task<bool> ExistsByEmailAsync(string email);

        Task<bool> ExistsOwnerAsync(string name);

        Task<bool> ExistsByNameAsync(string name);

        Task<int> GetIdByNameAsync(string name);
    }
}
