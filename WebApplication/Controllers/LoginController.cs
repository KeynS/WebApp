using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace WebApplication.Controllers
{
    public class LoginController : Controller
    {
        [HttpPost]
        public void Login(string Email)
        {
            FormsAuthentication.SetAuthCookie(Email, true);
        }

        [HttpGet]
        public void Logout()
        {
            FormsAuthentication.SignOut();
            HomeController._user = null;
        }
    }
}