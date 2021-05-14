using DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Base
{
    public interface IDefaultService
    {
        IEnumerable<User> GetUsers();

        bool AddUser(User User);

        IEnumerable<Product> GetProducts();
        bool AddProduct(Product Product);

        IEnumerable<Log> GetLogs();

        IEnumerable<Category> GetCategories();

        IEnumerable<NumberOfPurchases> GetNumberOfPurchases();
    }
}
