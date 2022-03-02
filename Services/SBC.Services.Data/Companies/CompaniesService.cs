﻿namespace SBC.Services.Data.Companies
{
    using System;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using SBC.Common;
    using SBC.Data.Common.Repositories;
    using SBC.Data.Models;
    using SBC.Services.Mapping;
    using SBC.Web.ViewModels.BusinessOwner.Employees;
    using SBC.Web.ViewModels.Coaches;
    using SBC.Web.ViewModels.Courses;

    public class CompaniesService : ICompaniesService
    {
        private const int TakeDefaultValue = 3;

        private readonly IDeletableEntityRepository<Company> companiesRepository;
        private readonly IDeletableEntityRepository<Coach> coachesRepository;
        private readonly IDeletableEntityRepository<Course> coursesRepository;
        private readonly IDeletableEntityRepository<CompanyCoach> companyCoachesRepository;
        private readonly IDeletableEntityRepository<CompanyCourse> companyCoursesRepository;
        private readonly IDeletableEntityRepository<ApplicationUser> userRepository;

        public CompaniesService(
            IDeletableEntityRepository<Company> company,
            IDeletableEntityRepository<Coach> coachesRepository,
            IDeletableEntityRepository<Course> coursesRepository,
            IDeletableEntityRepository<CompanyCoach> companyCoachesRepository,
            IDeletableEntityRepository<CompanyCourse> companyCoursesRepository,
            IDeletableEntityRepository<ApplicationUser> userRepository)
        {
            this.companiesRepository = company;
            this.coachesRepository = coachesRepository;
            this.coursesRepository = coursesRepository;
            this.companyCoachesRepository = companyCoachesRepository;
            this.companyCoursesRepository = companyCoursesRepository;
            this.userRepository = userRepository;
        }

        public async Task<bool> ExistsByNameAsync(string name)
            => await this.companiesRepository
                .AllAsNoTracking()
                .AnyAsync(c => c.Name.ToLower() == name.ToLower());

        public async Task<int> NoTrackGetCompanyByNameAsync(string name)
            => await this.companiesRepository
                .AllAsNoTracking()
                .Where(c => c.Name.ToLower() == name.ToLower())
                .Select(c => c.Id)
                .FirstOrDefaultAsync();

        public async Task<Result> GetEmployees(string managerId, int skip = default, int take = TakeDefaultValue)
        {
            var employeesCount = await this.userRepository
                .AllAsNoTracking()
                .Where(m => m.ManagerId == managerId)
                .CountAsync();

            var isViewMoreAvailable = (employeesCount - skip - take) > 0;

            var portions = await this.userRepository
                .AllAsNoTracking()
                .Where(u => u.ManagerId == managerId)
                .OrderByDescending(u => u.CreatedOn)
                .Skip(skip)
                .Take(take)
                .To<EmployeeViewModel>()
                .ToListAsync();

            var employees = new EmployeesViewModel
            {
                Portions = portions,
                ViewMoreAvailable = isViewMoreAvailable,
            };

            return new ResultModel(employees);
        }

        public async Task<Result> AddEmployee(CreateEmployeeInputModel input)
        {
            var user = await this.userRepository
                .All()
                .Where(x => x.Email == input.Email)
                .FirstOrDefaultAsync();

            if (user != null)
            {
                if (user.FirstName == input.FullName.Split(" ")[0] &&
                    user.LastName == input.FullName.Split(" ")[1] &&
                    user.ManagerId == null &&
                    user.CompanyId == null)
                {
                    user.ManagerId = input.ManagerId;
                    user.CompanyId = input.CompanyId;
                }
                else if (user.FirstName != input.FullName.Split(" ")[0] ||
                    user.LastName != input.FullName.Split(" ")[1])
                {
                    return new ErrorModel(HttpStatusCode.BadRequest, $"User with this {input.FullName} doesn't exist.");
                }
                else if (user.ManagerId != null || user.CompanyId != null)
                {
                    return new ErrorModel(HttpStatusCode.BadRequest, $"This user is already added to a company.");
                }
            }
            else
            {
                return new ErrorModel(HttpStatusCode.BadRequest, $"User with this {input.Email} doesn't exist.");
            }

            await this.userRepository.SaveChangesAsync();

            return new ResultModel(user);
        }

        public async Task<Result> RemoveEmployee(string employeeId)
        {
            var employeeToRemove = this.userRepository
                .All()
                .Where(x => x.Id == employeeId)
                .FirstOrDefault();

            employeeToRemove.ManagerId = null;
            employeeToRemove.CompanyId = null;

            await this.userRepository.SaveChangesAsync();

            return new ResultModel(employeeToRemove);
        }

        public async Task<Result> GetActiveCoaches(int companyId)
        {
            var activeCoaches = await this.coachesRepository
                .AllAsNoTracking()
                .Include(x => x.Company)
                .Include(x => x.Languages)
                .Include(x => x.Categories)
                .Where(c => c.ClientCompanies.Any(x => x.CompanyId == companyId))
                .Select(x => new ActiveCoachViewModel
                {
                    Id = x.Id,
                    FullName = $"{x.FirstName} {x.LastName}",
                    Languages = x.Languages,
                    Categories = x.Categories,
                    PricePerSession = x.PricePerSession,
                    CompanyLogoUrl = x.CompanyId != null ? x.Company.LogoUrl : "Null",
                })
                .ToListAsync();

            return new ResultModel(activeCoaches);
        }

        public async Task<Result> SetCoachToActive(int coachId, int companyId)
        {
            var newActiveCoach = new CompanyCoach
            {
                CompanyId = companyId,
                CoachId = coachId,
                IsDeleted = false,
                HireDate = DateTime.UtcNow,
            };

            await this.companyCoachesRepository.AddAsync(newActiveCoach);
            await this.companyCoachesRepository.SaveChangesAsync();

            return new ResultModel(newActiveCoach);
        }

        public async Task<Result> RemoveCoach(int coachId, int companyId)
        {
            var coach = this.companyCoachesRepository
                .All()
                .Where(x => x.CompanyId == companyId && x.CoachId == coachId)
                .FirstOrDefault();

            this.companyCoachesRepository.Delete(coach);

            await this.companyCoachesRepository.SaveChangesAsync();

            return new ResultModel(coach);
        }

        public async Task<Result> GetActiveCourses(int companyId)
        {
            var activeCourses = await this.coursesRepository
                .AllAsNoTracking()
                .Where(c => c.Companies.Any(x => x.CompanyId == companyId))
                .Include(x => x.Coach)
                .ThenInclude(x => x.Company)
                .Select(x => new ActiveCourseViewModel
                {
                    Id = x.Id,
                    PricePerPerson = x.PricePerPerson,
                    Title = x.Title,
                    CategoryId = x.CategoryId,
                    LanguageId = x.LanguageId,
                    CoachName = $"{x.Coach.FirstName} {x.Coach.LastName}",
                    CompanyLogoUrl = x.Coach.CompanyId != null ? x.Coach.Company.LogoUrl : "Null",
                })
                .ToListAsync();

            return new ResultModel(activeCourses);
        }

        public async Task<Result> SetCourseToActive(int courseId, int companyId)
        {
            var newActiveCourse = new CompanyCourse
            {
                CourseId = courseId,
                CompanyId = companyId,
                IsDeleted = false,
                PurchaseDate = DateTime.UtcNow,
            };

            await this.companyCoursesRepository.AddAsync(newActiveCourse);
            await this.companyCoursesRepository.SaveChangesAsync();

            return new ResultModel(newActiveCourse);
        }

        public async Task<Result> RemoveCourse(int courseId, int companyId)
        {
            var activeCourse = this.companyCoursesRepository
                .All()
                .Where(x => x.CourseId == courseId && x.CompanyId == companyId)
                .FirstOrDefault();

            this.companyCoursesRepository.Delete(activeCourse);

            await this.companyCoursesRepository.SaveChangesAsync();

            return new ResultModel(activeCourse);
        }
    }
}
