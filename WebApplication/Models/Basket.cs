using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class Basket
    {
        public Product Product { get; set; }

        public int Count { get; set; }
    }
}