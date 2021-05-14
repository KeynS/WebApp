using System.Web;
using System.Web.Optimization;

namespace WebApplication
{
    public class BundleConfig
    {
        public FilterConfig FilterConfig
        {
            get => default;
            set
            {
            }
        }

        // Дополнительные сведения об объединении см. на странице https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/resources/js/jquery/jquery-3.2.1.min.js",
                        "~/resources/vendor/animsition/js/animsition.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/main").Include(
                       "~/resources/js/jquery/tilt.jquery.min.js",
                       "~/resources/js/map-custom.js",
                       "~/resources/js/main.js"));


            bundles.Add(new ScriptBundle("~/bundles/slick-custom").Include(
                       "~/resources/vendor/slick/slick.min.js",
                       "~/resources/js/slick-custom.js",
                       "~/resources/vendor/isotope/isotope.pkgd.min.js"));

            // Используйте версию Modernizr для разработчиков, чтобы учиться работать. Когда вы будете готовы перейти к работе,
            // готово к выпуску, используйте средство сборки по адресу https://modernizr.com, чтобы выбрать только необходимые тесты.

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/resources/js/bootstrap/popper.min.js",
                      "~/resources/js/bootstrap/bootstrap.min.js"));

            bundles.Add(new StyleBundle("~/css").Include(
                      "~/resources/css/bootstrap/bootstrap.min.css",
                      "~/resources/fonts/iconic/css/material-design-iconic-font.min.css",
                      "~/resources/fonts/font-awesome-4.7.0/css/font-awesome.min.css",
                      "~/resources/fonts/iconic/css/material-design-iconic-font.min.css",
                      "~/resources/fonts/linearicons-v1.0.0/icon-font.min.css",
                      "~/resources/vendor/animate/animate.css",
                      "~/resources/vendor/animsition/css/animsition.css",
                      "~/resources/vendor/slick/slick.css",
                      "~/resources/css/util.css",
                      "~/resources/css/login.css",
                      "~/resources/css/main.css"));

        }
    }
}
