using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models.Login
{
    public class LoginLinkUserModel
    {
        public User User { get; set; }
        public bool IsLoggedIn { get; set; }
        public List<Basket> Baskets { get; set; }
    }
}