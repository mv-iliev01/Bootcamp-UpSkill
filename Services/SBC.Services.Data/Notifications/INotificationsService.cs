﻿namespace SBC.Services.Data.Notifications
{
    using System.Threading.Tasks;

    using SBC.Common;
    using SBC.Web.ViewModels.Notification;

    public interface INotificationsService
    {
        Task<Result> GetAllByEmailAsyc(string email);

        Task<Result> AddAsync(string uniqueGroupKey, string email, string message);

        Task<Result> DeleteAsync(int id);

        Task<Result> DeleteAsync(string uniqueGroupKey, string email);
    }
}
