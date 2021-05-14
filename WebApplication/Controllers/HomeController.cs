using DataAccess.Entities;
using Services;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using System.Web.Security;
using System.Windows;
using WebApplication.Models.Login;
using WebApplication.Models;
using System.IO;
using WebApplication.Utils;

namespace WebApplication.Controllers
{
    public class HomeController : Controller
    {

        //private DefaultService _context = null;
        public static User _user { get; set; }
        public static List<Basket> _basket;

        public HomeController()
        {
            //_context = new DefaultService();
            Singleton.getInstance().GetUsersAsync();
            Singleton.getInstance().GetProductsAsync();
            if (_basket == null)
                _basket = new List<Basket>();
        }

        [HttpGet]
        public ActionResult LoginLink()
        {
            var cookie = Request.Cookies[FormsAuthentication.FormsCookieName];

            if (cookie != null)
            {
                var userName = Thread.CurrentPrincipal.Identity.Name;

                _user = Singleton.getInstance().GetUser(x => x.Email == userName);

                return PartialView("_LoginLink", new LoginLinkUserModel { IsLoggedIn = true, User = _user, Baskets = _basket });
            }

            _user = null;

            return PartialView("_LoginLink", new LoginLinkUserModel { IsLoggedIn = false, Baskets = _basket });
        }

        public ActionResult Reroute(string url = "")
        {
            return Redirect("/" + Thread.CurrentThread.CurrentCulture.ToString().Substring(0, 2) + "/" + url.ToLower());
        }

        public ActionResult Index()
        {
            if (this.Request.RawUrl.Length < 2 || this.Request.RawUrl.Substring(1, 2).ToLower() != Thread.CurrentThread.CurrentCulture.ToString().Substring(0, 2).ToLower())
                return Reroute();


            return View(new DataShopModel { Products = Singleton.getInstance().GetProducts().ToList(), User = _user, Baskets = _basket });
        }

        public ActionResult About()
        {
            if (this.Request.RawUrl.Length < 2 || this.Request.RawUrl.Substring(1, 2).ToLower() != Thread.CurrentThread.CurrentCulture.ToString().Substring(0, 2).ToLower())
                return Reroute("home/about/");

            ViewBag.Message = "Your about page.";

            return View(new DataShopModel { User = _user, Baskets = _basket });
        }

        public ActionResult Cart()
        {
            if (this.Request.RawUrl.Length < 2 || this.Request.RawUrl.Substring(1, 2).ToLower() != Thread.CurrentThread.CurrentCulture.ToString().Substring(0, 2).ToLower())
                return Reroute("home/cart/");

            ViewBag.Message = "Your about page.";

            return View(new DataShopModel { User = _user, Baskets = _basket });
        }

        public ActionResult Contact()
        {
            if (this.Request.RawUrl.Length < 2 || this.Request.RawUrl.Substring(1, 2).ToLower() != Thread.CurrentThread.CurrentCulture.ToString().Substring(0, 2).ToLower())
                return Reroute("home/contact/");

            ViewBag.Message = "Your contact page.";

            return View(new DataShopModel { User = _user, Baskets = _basket });
        }

        public ActionResult Shop()
        {
            if (this.Request.RawUrl.Length < 2 || this.Request.RawUrl.Substring(1, 2).ToLower() != Thread.CurrentThread.CurrentCulture.ToString().Substring(0, 2).ToLower())
                return Reroute("home/shop/");

            return View(new DataShopModel { Products = Singleton.getInstance().GetProducts().ToList(), User = _user, Baskets = _basket });
        }

        [HttpPost]
        public JsonResult isAuthorization(string Email, string Pass)
        {

            List<User> list = Singleton.getInstance().GetUsers(x => x.Email == Email && x.Password == Pass).ToList();

            if (list.Count == 0)
                return Json(new { isAuthorization = false }, JsonRequestBehavior.AllowGet);

            _user = list[0];

            return Json(new { isAuthorization = true }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Registration(string Name, string Surname, string Email, string Pass)
        {
            string dateTime = DateTime.Now.ToString();
            string createddate = Convert.ToDateTime(dateTime).ToString("yyyy-MM-dd");
            DateTime dt = DateTime.ParseExact(createddate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

            _user = new User {
                Name = Name,
                Surname = Surname,
                Email = Email,
                Password = Pass,
                Role = "user",
                Date = dt,
                IsActivated = false,
                Bonus = 0,
                Spent = 0,
                Code = null
            }; 

            List<User> list = Singleton.getInstance().GetUsers(x => x.Email == Email).ToList();
            if(list.Count != 0)
            {
                return Json(new { Registration = "#code3" }, JsonRequestBehavior.AllowGet); // Такой email существует
            }

            if (Singleton.getInstance().AddUser(_user))
            {
                return Json(new { Registration = "#code1" }, JsonRequestBehavior.AllowGet); // Успешно
            }
            else
            {
                return Json(new { Registration = "#code2" }, JsonRequestBehavior.AllowGet); // Не удалось записать в бд (коннект)
            }
            
        }

        [HttpPost]
        public JsonResult AddPoductInBasket(string IdProduct, string CountProd)
        {
            Product Prod = Singleton.getInstance().GetProduct(x => x.Id == Convert.ToInt32(IdProduct));
            if (Prod != null)
            {
                _basket.Add(new Basket { Product = Prod, Count = Convert.ToInt32(CountProd) });
                return Json(new { CreateProduct = "#code1" }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { CreateProduct = "#code2" }, JsonRequestBehavior.AllowGet);
        }
        //EditPoductInBasket

        [HttpPost]
        public JsonResult EditPoductInBasket(string IdProduct, string CountProd)
        {
            foreach(var x in _basket)
            {
                if (x.Product.Id == Convert.ToInt32(IdProduct))
                {
                    x.Count = Convert.ToInt32(CountProd);
                }
            }
            return Json(new { CreateProduct = "#code1" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DelPoductInBasket(string IdProduct)
        {
            if (_basket.Count > 0)
            {
                _basket = _basket.Where(x => x.Product.Id != Convert.ToInt32(IdProduct)).ToList();
                return Json(new { CreateProduct = "#code1" }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { CreateProduct = "#code2" }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Login()
        {
            ViewBag.Message = "Your contact page.";

            return PartialView("About");
        }

        public ActionResult ChangeCulture(string lang, string returnUrl)
        {
            Session["Culture"] = new CultureInfo(lang);
            return Redirect("/" + lang + returnUrl.Substring(3, returnUrl.Length-3));
        }

        [HttpPost]
        public JsonResult BuyProduct()
        {
            _basket.Clear();
            return Json(new { CreateProduct = "#code1" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult BuyProductMail(string Message)
        {
            Mail.Send(_user.Email, Message.Replace("|", "<br>"), false);
            _basket.Clear();
            return Json(new { CreateProduct = "#code1" }, JsonRequestBehavior.AllowGet);
        }

        //SendMessage
        [HttpPost]
        public JsonResult SendMessage(string Message)
        {
            Message = "Пользователь " + _user.Email + " оставил отзыв:<br>" + Message;
            Mail.Send("bitmarket.info@gmail.com", Message, true);
            return Json(new { CreateProduct = "#code1" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CreateProduct()
        {
            int id = Convert.ToInt32(Request.Form.Get("id"));
            var upload = Request.Files.Get("file");
            string Name = Request.Form.Get("name");
            var Price = Convert.ToDouble(Request.Form.Get("price"));
            var Count = Convert.ToInt32(Request.Form.Get("count"));
            string Desc = Request.Form.Get("desc");
            var CategoryId = Convert.ToInt32(Request.Form.Get("cat"));

            if(id != 0)
            {
                Product product = Singleton.getInstance().GetProducts(x => x.Id == id).First();
                if(product.Name != Name)
                { //proverka name
                    List<Product> list = Singleton.getInstance().GetProducts(x => x.Name == Name).ToList();
                    if (list.Count != 0)
                    {
                        return Json(new { CreateProduct = "#code2" }, JsonRequestBehavior.AllowGet); // img
                    }
                }
                if (upload != null)
                { // check url and create new file

                    string fileName = System.IO.Path.GetFileName(upload.FileName);
                    List<Product> list = Singleton.getInstance().GetProducts(x => x.Url == fileName).ToList();
                    if (list.Count != 0)
                    {
                        product.Url = fileName;
                    }
                    else
                    {
                        FileInfo del = new FileInfo(Server.MapPath("~/images/load/" + product.Url));
                        del.Delete();
                        upload.SaveAs(Server.MapPath("~/images/load/" + fileName));
                        product.Url = fileName;
                    }
                }

                product.Name = Name;
                product.Price = Price;
                product.Count = Count;
                product.Description = Desc;
                product.CategoryId = CategoryId;
                product.Category = Singleton.getInstance().GetCategories(x => x.Id == CategoryId).First();

                if(Singleton.getInstance().Save())
                {
                    return Json(new { CreateProduct = "#code5" }, JsonRequestBehavior.AllowGet); //success change
                }
                else
                {
                    return Json(new { CreateProduct = "#code4" }, JsonRequestBehavior.AllowGet); //bd err
                }

            }
            else //create
            {

                string fileName = "";

                if (upload != null)
                {
                    fileName = System.IO.Path.GetFileName(upload.FileName);
                }

                List<Product> list = Singleton.getInstance().GetProducts(x => x.Name == Name || x.Url == fileName).ToList();
                if (list.Count != 0)
                {
                    bool isName = false;

                    foreach (var temp in list)
                    {
                        if (temp.Name == Name)
                        {
                            isName = true;
                            break;
                        }
                    }
                    if (isName)
                    {
                        return Json(new { CreateProduct = "#code2" }, JsonRequestBehavior.AllowGet); /// name
                    }
                }

                if (upload != null)
                {
                    upload.SaveAs(Server.MapPath("~/images/load/" + fileName));
                }
                else
                {
                    fileName = "0.png";
                }

                Product product = new Product
                {
                    Name = Name,
                    Price = Price,
                    Count = Count,
                    Description = Desc,
                    Trend = false,
                    CategoryId = CategoryId,
                    Category = Singleton.getInstance().GetCategories(x => x.Id == CategoryId).First(),
                    Url = fileName
                };

                if (Singleton.getInstance().AddProduct(product))
                {
                    return Json(new { CreateProduct = "#code1" }, JsonRequestBehavior.AllowGet); //success
                }
                else
                {
                    return Json(new { CreateProduct = "#code4" }, JsonRequestBehavior.AllowGet); //bd err
                }



            }


        }
    }
}