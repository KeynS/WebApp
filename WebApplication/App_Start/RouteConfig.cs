using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace WebApplication
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.LowercaseUrls = true;
            routes.AppendTrailingSlash = true;

            routes.MapRoute(
                name: "LocalizationChange",
                url: "{cul}/Home/ChangeCulture/{lang}/{*catchall}",
                defaults: new { controller = "Home", action = "ChangeCulture", lang = UrlParameter.Optional },
                constraints: new { cul = @"(^ru$)|(^en$)" }
            );

            routes.MapRoute(
                name: "Default",
                url: "{cul}/{controller}/{action}/{id}",
                defaults: new { cul = "ru", controller = "Home", action = "Index", id = UrlParameter.Optional },
                constraints: new { cul = @"(^ru$)|(^en$)" }
            );

            routes.MapRoute(
                name: "Default2",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
