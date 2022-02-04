﻿namespace SBC.Services.Data.Courses
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using SBC.Common;
    using SBC.Data.Common.Repositories;
    using SBC.Data.Models;
    using SBC.Services.Data.Course.Contracts;
    using SBC.Services.Data.Course.Models;
    using SBC.Services.Mapping;

    public class CourseService : ICourseService
    {
        private readonly IDeletableEntityRepository<Course> courses;

        public CourseService(IDeletableEntityRepository<Course> courses)
        {
            this.courses = courses;
        }

        public async Task<Result> CreateAsync(CreateCourseServiceModel courseModel)
        {
            var course = await this.courses
                .All()
                .FirstOrDefaultAsync(c => c.Title == courseModel.Title);

            if (course != null)
            {
                return new ErrorModel(HttpStatusCode.BadRequest, "Course already exist!");
            }

            var newCourse = new Course()
            {
                Title = courseModel.Title,
                Description = courseModel.Description,
                PricePerPerson = courseModel.PricePerPerson,
                VideoUrl = courseModel.VideoUrl,
                CategoryId = courseModel.CategoryId,
                LanguageId = courseModel.LanguageId,
                CoachId = courseModel.CoachId,
            };

            await this.courses.AddAsync(newCourse);
            await this.courses.SaveChangesAsync();

            return true;
        }

        public async Task<Result> DeleteByIdAsync(int id)
        {
            var course = await this.courses
                .All()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
            {
                return new ErrorModel(HttpStatusCode.NotFound, "Course not found!");
            }

            this.courses.Delete(course);
            await this.courses.SaveChangesAsync();

            return true;
        }

        public async Task<Result> EditAsync(EditCourseServiceModel courseModel)
        {
            var course = await this.courses
                .All()
                .FirstOrDefaultAsync(c => c.Id == courseModel.Id);

            if (course == null)
            {
                return new ErrorModel(HttpStatusCode.NotFound, "Course doesn't exist!");
            }

            course.Title = courseModel.Title;
            course.Description = courseModel.Description;
            course.PricePerPerson = courseModel.PricePerPerson;
            course.VideoUrl = courseModel.VideoUrl;
            course.CoachId = courseModel.CoachId;
            course.CategoryId = courseModel.CategoryId;
            course.LanguageId = courseModel.LanguageId;

            await this.courses.SaveChangesAsync();

            return true;
        }

        public async Task<Result> GetAllAsync()
        {
            var courses = await this.courses
                .AllAsNoTracking()
                .ToListAsync();

            return new ResultModel(courses);
        }

        public async Task<Result> GetByIdAsync(int id)
        {
            var course = await this.courses
                .AllAsNoTracking()
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync();

            if (course == null)
            {
                return new ErrorModel(HttpStatusCode.NotFound, "Course not found!");
            }

            return new ResultModel(course);
        }
    }
}
