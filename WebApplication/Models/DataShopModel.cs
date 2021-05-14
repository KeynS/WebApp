using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class DataShopModel
    {
        public User User { get; set; }

        public List<Product> Products { get; set; }

        public List<Basket> Baskets { get; set; }
    }
}