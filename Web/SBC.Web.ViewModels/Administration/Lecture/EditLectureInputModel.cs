﻿namespace SBC.Web.ViewModels.Administration.Lecture
{
    using System.ComponentModel.DataAnnotations;

    public class EditLectureInputModel
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
